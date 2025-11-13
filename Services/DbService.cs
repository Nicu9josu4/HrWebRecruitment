using HrWebRecruitment.Models;
using HrWebRecruitment.Models.Config;
using Microsoft.Extensions.Options;
using MongoDB.Bson;
using MongoDB.Bson.Serialization;
using MongoDB.Driver;
using Newtonsoft.Json;
using System.Collections;
using System.Dynamic;
using System.Reflection;
using System.Text.Json;
using static System.Runtime.InteropServices.JavaScript.JSType;

namespace HrWebRecruitment.Services
{
    public class DbService(IMongoClient mongoClient, MongoDbConfigModel dbConfig, IConfiguration configuration, ILogger<DbService> logger)
    {
        private IMongoDatabase _database = mongoClient.GetDatabase(dbConfig.DatabaseName);
        private readonly IMongoCollection<Vacancy> _vacancyCollection;
        private readonly IMongoCollection<User> _usersCollection;
        private readonly IMongoCollection<Candidat> _candidatsCollection;
        private readonly IMongoCollection<Hiring> _hiringCollection;
        private readonly IMongoCollection<Dictionary> _dictionariesCollection;
        private readonly IMongoCollection<Employee> _employeesCollection;

        public DbService(IMongoClient mongoClient, IOptions<MongoDbConfigModel> dbConfig, IConfiguration configuration, ILogger<DbService> logger) : this(mongoClient, dbConfig.Value, configuration, logger)
        {
            //Initialize().Wait();
            _vacancyCollection = _database.GetCollection<Vacancy>("Vacancies");
            _usersCollection = _database.GetCollection<User>("Users");
            _candidatsCollection = _database.GetCollection<Candidat>("Candidats");
            _hiringCollection = _database.GetCollection<Hiring>("Hirings");
            _dictionariesCollection = _database.GetCollection<Dictionary>("Dictionaries");
            _employeesCollection = _database.GetCollection<Employee>("Employees");
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

        public async Task<List<Vacancy>> GetVacancies() => await _vacancyCollection.Find(new BsonDocument()).ToListAsync();

        public async Task<User> GetUser(string userName, string password)
        {
            // Create a filter to find a user with the specified userName and password
            var filter = Builders<User>.Filter.Eq(u => u.UserName, userName) &
                         Builders<User>.Filter.Eq(u => u.Password, password);

            // Use FindOneAsync to return the first matching user (or null if no match is found)
            return await _usersCollection.Find(filter).FirstOrDefaultAsync();
        }

        public async Task ApplyAsync(Candidat candidat)
        {
            await _candidatsCollection.InsertOneAsync(candidat);
        }

        public async Task<string> GetHirings()
        {
            try
            {
                var pipeline = new[]
                {
                new BsonDocument("$match", new BsonDocument("Status", new BsonDocument("$ne", 8))), // where Status != 8
                // Lookup Candidats
                new BsonDocument("$lookup", new BsonDocument
                {
                    { "from", "Candidats" },
                    { "localField", "Candidat" },
                    { "foreignField", "_id" },
                    { "as", "CandidatData" }
                }),
                new BsonDocument("$unwind", new BsonDocument
                {
                    { "path", "$CandidatData" },
                    { "preserveNullAndEmptyArrays", true }
                }),
                // Lookup Users
                new BsonDocument("$lookup", new BsonDocument
                {
                    { "from", "Users" },
                    { "localField", "Users" },
                    { "foreignField", "_id" },
                    { "as", "UsersData" }
                }),
                new BsonDocument("$unwind", new BsonDocument
                {
                    { "path", "$UsersData" },
                    { "preserveNullAndEmptyArrays", true }
                }),
                // Lookup Dictionaries (Status)
                new BsonDocument("$lookup", new BsonDocument
                {
                    { "from", "Dictionaries" },
                    { "localField", "Status" },
                    { "foreignField", "_id" },
                    { "as", "StatusData" }
                }),
                new BsonDocument("$unwind", new BsonDocument
                {
                    { "path", "$StatusData" },
                    { "preserveNullAndEmptyArrays", true }
                }),
                // Lookup Vacancies
                new BsonDocument("$lookup", new BsonDocument
                {
                    { "from", "Vacancies" },
                    { "localField", "Vacancy" },
                    { "foreignField", "_id" },
                    { "as", "VacancyData" }
                }),
                new BsonDocument("$unwind", new BsonDocument
                {
                    { "path", "$VacancyData" },
                    { "preserveNullAndEmptyArrays", true }
                }),
                // Project required fields and computed fields
                new BsonDocument("$project", new BsonDocument
                {
                    { "HiringId", "$_id" },
                    { "CandidatID", "$Candidat" },
                    { "Candidat", new BsonDocument("$concat", new BsonArray { "$CandidatData.FirstName", " ", "$CandidatData.LastName" }) },
                    { "User", new BsonDocument("$ifNull", new BsonArray { new BsonDocument("$concat", new BsonArray { "$UsersData.FirstName", " ", "$UsersData.LastName" }), "admin" }) },
                    { "Status", "$StatusData.Name" },
                    { "Vacancy", "$VacancyData.Title" },
                    { "StatusDate", 1 },
                    { "Comm", new BsonDocument("$ifNull", new BsonArray { "$Comm", "required" }) },
                    { "CV", "$CandidatData.Linkcv" }
                }),
                new BsonDocument("$sort", new BsonDocument("HiringId", 1))
            };

                var results = await _hiringCollection.Aggregate<BsonDocument>(pipeline).ToListAsync();
                return results.ToJson();
            }
            catch (Exception ex)
            {
                logger.LogError(ex, "Error while fetching Hiring data. {ErrorMessage}", ex.Message);
                return null;
            }
        }

        public async Task<string> GetUsers()
        {
            try
            {
                var pipeline = new[]
                {
                new BsonDocument
                {
                    { "$lookup", new BsonDocument
                        {
                            { "from", "Dictionaries" },
                            { "localField", "Roleid" },
                            { "foreignField", "_id" },
                            { "as", "RoleData" }
                        }
                    }
                },
                new BsonDocument("$unwind", new BsonDocument
                {
                    { "path", "$RoleData" },
                    { "preserveNullAndEmptyArrays", true }
                }),
                new BsonDocument("$sort", new BsonDocument("_id", 1)),
                new BsonDocument("$project", new BsonDocument
                {
                    { "Id", "$_id" },
                    { "Username", 1 },
                    { "Password", 1 },
                    { "FirstName", 1 },
                    { "LastName", 1 },
                    { "Email", 1 },
                    { "RoleId", "$RoleData.Name" },
                    { "StartDate", 1 },
                    { "EndDate", 1 }
                })
            };

                var results = await _usersCollection.Aggregate<BsonDocument>(pipeline).ToListAsync();

                return results.ToJson();
            }
            catch (Exception ex)
            {
                logger.LogError(ex, "Error retrieving users and roles");
                return null;
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

        public async Task<string> GetEmployees()
        {
            try
            {
                var pipeline = new[]
                {
                // Lookup Position from Dictionaries
                new BsonDocument("$lookup", new BsonDocument
                {
                    { "from", "Dictionaries" },
                    { "localField", "Position" },
                    { "foreignField", "_id" },
                    { "as", "PositionData" }
                }),
                new BsonDocument("$unwind", new BsonDocument
                {
                    { "path", "$PositionData" },
                    { "preserveNullAndEmptyArrays", true }
                }),

                // Lookup Department from Dictionaries
                new BsonDocument("$lookup", new BsonDocument
                {
                    { "from", "Dictionaries" },
                    { "localField", "Department" },
                    { "foreignField", "_id" },
                    { "as", "DepartmentData" }
                }),
                new BsonDocument("$unwind", new BsonDocument
                {
                    { "path", "$DepartmentData" },
                    { "preserveNullAndEmptyArrays", true }
                }),

                // Lookup Hiring
                new BsonDocument("$lookup", new BsonDocument
                {
                    { "from", "Hirings" },
                    { "localField", "Hiring" },
                    { "foreignField", "_id" },
                    { "as", "HiringData" }
                }),
                new BsonDocument("$unwind", new BsonDocument
                {
                    { "path", "$HiringData" },
                    { "preserveNullAndEmptyArrays", true }
                }),

                // Lookup Candidats (from HiringData.Candidat)
                new BsonDocument("$lookup", new BsonDocument
                {
                    { "from", "Candidats" },
                    { "localField", "HiringData.Candidat" },
                    { "foreignField", "_id" },
                    { "as", "CandidatData" }
                }),
                new BsonDocument("$unwind", new BsonDocument
                {
                    { "path", "$CandidatData" },
                    { "preserveNullAndEmptyArrays", true }
                }),

                // Sort by E.Id (_id)
                new BsonDocument("$sort", new BsonDocument("_id", 1)),

                // Project required fields including joined data and concatenation
                new BsonDocument("$project", new BsonDocument
                {
                    { "Id", "$_id" },
                    { "FirstName", 1 },
                    { "LastName", 1 },
                    { "Phone", 1 },
                    { "Email", 1 },
                    { "Department", "$DepartmentData.Name" },
                    { "Position", "$PositionData.Name" },
                    { "Hiring", new BsonDocument("$concat", new BsonArray { "$CandidatData.FirstName", " ", "$CandidatData.LastName" }) },
                    { "StartDate", 1 },
                    { "EndDate", 1 }
                })
            };

                var results = await _employeesCollection.Aggregate<BsonDocument>(pipeline).ToListAsync();
                return results.ToJson();
            }
            catch (Exception ex)
            {
                logger.LogError(ex, "Error retrieving employees data.");
                return null;
            }
        }

        public async Task<List<Dictionary>> GetDictionary() => await _dictionariesCollection.Find(new BsonDocument()).ToListAsync();

        public async Task<string> GetStatuses()
        {
            try
            {
                var dictionariesCollection = _database.GetCollection<BsonDocument>("Dictionaries");

                var filter = Builders<BsonDocument>.Filter.Eq("Type", "Status");
                var dictionaries = await dictionariesCollection.Find(filter).ToListAsync();

                var statuses = new List<string>();
                foreach (var doc in dictionaries)
                {
                    if (doc.TryGetValue("Name", out var name))
                    {
                        statuses.Add(name.AsString);
                    }
                }

                return JsonConvert.SerializeObject(statuses);
            }
            catch (Exception ex)
            {
                logger.LogError(ex, "Error retrieving statuses");
                return null;
            }
        }
    }
}
