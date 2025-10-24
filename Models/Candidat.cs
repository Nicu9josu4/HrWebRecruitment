using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace HrWebRecruitment;

public class Candidat
{
    [BsonId]
    [BsonRepresentation(BsonType.String)] // Since Id is a string in JSON
    public string Id { get; set; }

    [BsonElement("name")]
    public string FirstName { get; set; }

    [BsonElement("LastName")]
    public string LastName { get; set; } = null!;

    [BsonElement("Email")]
    public string? Email { get; set; }

    [BsonElement("PhoneNumber")]
    public string? PhoneNumber { get; set; }

    [BsonElement("LinkToCv")]
    public string? LinkToCv { get; set; }

}

