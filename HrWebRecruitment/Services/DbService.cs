using HrWebRecruitment.Models;
using HrWebRecruitment.Models.Config;
using Microsoft.Extensions.Options;
using MongoDB.Bson;
using MongoDB.Bson.Serialization;
using MongoDB.Driver;
using System.Collections;
using System.Dynamic;
using System.Reflection;
using System.Text.Json;
using static System.Runtime.InteropServices.JavaScript.JSType;

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

            var properties = typeof(MongoDbSeedModel).GetProperties(BindingFlags.Public | BindingFlags.Instance)
            .Where(p => p.PropertyType.IsGenericType && p.PropertyType.GetGenericTypeDefinition() == typeof(List<>));// Get all the properties of MongoDbSeedModel dynamically

            //var properties = typeof(MongoDbSeedModel).GetProperties();

            foreach (var property in properties)
            {
                try
                {
                    // Get the collection name from the property name
                    string collectionName = property.Name;

                    // Get the generic type of the list (e.g., Candidat, Employee)
                    Type listItemType = property.PropertyType.GetGenericArguments()[0];

                    // Get the data from appsettings.json for this property
                    var sectionData = seedSection.GetSection(collectionName);
                    if (!sectionData.Exists())
                    {
                        Console.WriteLine($"No data found for collection '{collectionName}' in appsettings.json.");
                        continue;
                    }

                    // Deserialize the JSON data into a List<T>
                    var listType = typeof(List<>).MakeGenericType(listItemType);
                    var data = sectionData.Get(listType);

                    if (data == null || ((IList)data).Count == 0)
                    {
                        Console.WriteLine($"No items to insert for collection '{collectionName}'.");
                        continue;
                    }

                    // Get the MongoDB collection dynamically
                    var collectionMethod = typeof(IMongoDatabase).GetMethod("GetCollection").MakeGenericMethod(listItemType);
                    var collection = collectionMethod.Invoke(_database, new object[] { collectionName, null });

                    // Insert the data using InsertManyAsync
                    var insertMethod = typeof(IMongoCollection<>)
                        .MakeGenericType(listItemType)
                        .GetMethod("InsertManyAsync", new[] { typeof(IEnumerable<>).MakeGenericType(listItemType), typeof(InsertManyOptions), typeof(CancellationToken) });

                    var insertTask = (Task)insertMethod.Invoke(collection, new object[] { data, null, CancellationToken.None });
                    await insertTask;

                    Console.WriteLine($"Inserted {((IList)data).Count} items into collection '{collectionName}'.");
                }
                catch (Exception ex)
                {
                    Console.WriteLine($"Error processing collection '{property.Name}': {ex.Message}");
                }
            }
        }
        private async Task SeedCollectionAsync<T>(T[] collectionData, string collectionName)
        {
            // Get the collection
            var collection = _database.GetCollection<BsonDocument>(collectionName);

            var collectedData = JsonSerializer.Serialize(collectionData);
            //foreach (var data in collectionData)
                await collection.InsertOneAsync(collectedData.ToBsonDocument());
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
