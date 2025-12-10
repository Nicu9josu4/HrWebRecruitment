using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;

namespace HrWebRecruitment;

public partial class User
{
    [BsonId]
    public ObjectId Id { get; set; }

    [BsonElement("UserName")]
    public string? UserName { get; set; }

    [BsonElement("Password")]
    public string? Password { get; set; }

    [BsonElement("FirstName")]
    public string? FirstName { get; set; }

    [BsonElement("LastName")]
    public string? LastName { get; set; }

    [BsonElement("Email")]
    public string? Email { get; set; }

    [BsonElement("RoleId")]
    public decimal? RoleId { get; set; }

    [BsonElement("StartDate")]
    public DateTime? StartDate { get; set; }

    [BsonElement("EndDate")]
    public DateTime? EndDate { get; set; }
}
