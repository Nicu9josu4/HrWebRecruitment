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
        public DbService(IMongoClient mongoClient, IOptions<MongoDbConfig> dbConfig, IConfiguration configuration) : this(mongoClient, dbConfig.Value, configuration) => Initialize().Wait();


        public async Task Initialize()
        {
            var seedSection = configuration.GetSection("MongoDbSeed");
            if (!seedSection.Exists())
                return;

            foreach (var collectionSection in seedSection.GetChildren())
            {
                string collectionName = collectionSection.Key;
                var jsonArray = collectionSection.ToString();

                if (string.IsNullOrWhiteSpace(jsonArray))
                    continue;

                // Parse array of objects into BsonDocuments
                using var doc = JsonDocument.Parse(jsonArray);
                var bsonDocs = doc.RootElement.EnumerateArray()
                    .Select(d => BsonDocument.Parse(d.GetRawText()))
                    .ToList();

                if (bsonDocs.Count == 0)
                    continue;

                // Create collection if not exists
                var filter = new BsonDocument("name", collectionName);
                var collections = await _database.ListCollectionsAsync(new ListCollectionsOptions { Filter = filter });
                if (!await collections.AnyAsync())
                {
                    await _database.CreateCollectionAsync(collectionName);
                }

                var collection = _database.GetCollection<BsonDocument>(collectionName);
                var count = await collection.CountDocumentsAsync(FilterDefinition<BsonDocument>.Empty);
                if (count == 0)
                {
                    await collection.InsertManyAsync(bsonDocs);
                }
            }
        }
    }
}
