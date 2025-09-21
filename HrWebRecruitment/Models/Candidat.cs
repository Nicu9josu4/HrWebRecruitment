using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;

namespace HrWebRecruitment;

public class Candidat
{
    [BsonId]
    public ObjectId Id { get; set; }

    [BsonElement("name")]
    public string FirstName { get; set; }

    //[BsonElement("LastName")]
    //public string LastName { get; set; } = null!;

    //[BsonElement("Email")]
    //public string? Email { get; set; }

    //[BsonElement("PhoneNumber")]
    //public string? PhoneNumber { get; set; }

    //[BsonElement("LinkToCv")]
    //public string? LinkToCv { get; set; }
}
