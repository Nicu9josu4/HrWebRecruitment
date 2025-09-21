using HrWebRecruitment.Models;
using HrWebRecruitment.Models.Config;
using Microsoft.Extensions.Options;
using MongoDB.Bson;
using MongoDB.Driver;
using System.Text.Json;

namespace HrWebRecruitment.Services
{
    public class DbService(IMongoClient mongoClient, MongoDbConfig dbConfig, IConfiguration configuration)
    {
        private IMongoDatabase _database = mongoClient.GetDatabase(dbConfig.DatabaseName);
        private readonly MongoDbSeedModel _seedConfig;

        public DbService(IMongoClient mongoClient, IOptions<MongoDbConfig> dbConfig, IConfiguration configuration) : this(mongoClient, dbConfig.Value, configuration)
        {
            // Bind MongoDbSeedModel directly from configuration
            _seedConfig = new MongoDbSeedModel();
            configuration.GetSection("MongoDbSeed").Bind(_seedConfig);

            Initialize().Wait();
        }

        public async Task Initialize()
        {
            var seedSection = configuration.GetSection("MongoDbSeed");
            if (!seedSection.Exists())
                return;

            foreach (var collectionSection in seedSection.GetChildren())
                CreateCollectionIfNotExists(collectionSection.Key); //Create collections if not exists
                                                                    // Get all the properties of MongoDbSeedModel dynamically
            var properties = typeof(MongoDbSeedModel).GetProperties();

            foreach (var property in properties)
            {
                // Get the collection data (List<T>) from the property value
                var collectionData = property.GetValue(_seedConfig) as IEnumerable<object>;

                if (collectionData != null && collectionData.Any())
                {
                    // Use the property name as the collection name
                    string collectionName = property.Name;

                    // Seed the collection dynamically
                    await SeedCollectionAsync(collectionData.ToList(), collectionName);
                }
            }
        }
        private async Task SeedCollectionAsync<T>(List<T> collectionData, string collectionName)
        {
            if (collectionData == null || collectionData.Count == 0)
                return;

            // Create collection if it doesn't exist
            var filter = new BsonDocument("name", collectionName);
            var collections = await _database.ListCollectionsAsync(new ListCollectionsOptions { Filter = filter });
            if (!await collections.AnyAsync())
            {
                await _database.CreateCollectionAsync(collectionName);
                Console.WriteLine($"✅ Created collection: {collectionName}");
            }

            // Get the collection
            var collection = _database.GetCollection<T>(collectionName);

            // If the collection is empty, insert the data
            var count = await collection.CountDocumentsAsync(FilterDefinition<T>.Empty);
            if (count == 0)
            {
                foreach (var data in collectionData)
                    await collection.InsertOneAsync(data);
                Console.WriteLine($"✅ Seeded data into collection: {collectionName}");
            }
        }

        private void CreateCollectionIfNotExists(string collectionName)
        {
            var collectionNames = _database.ListCollectionNames().ToList();
            if (!collectionNames.Contains(collectionName))
            {
                _database.CreateCollection(collectionName);
                Console.WriteLine($"✅ Collection '{collectionName}' created.");
            }
        }
    }
}
