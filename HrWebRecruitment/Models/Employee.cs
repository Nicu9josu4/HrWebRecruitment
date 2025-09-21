using MongoDB.Bson.Serialization.Attributes;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;

namespace HrWebRecruitment;

public partial class Employee
{
    [BsonId]
    public decimal Id { get; set; }

    [BsonElement("FirstName")]
    public string FirstName { get; set; } = null!;

    [BsonElement("LastName")]
    public string LastName { get; set; } = null!;

    [BsonElement("PhoneNumber")]
    public string? PhoneNumber { get; set; }

    [BsonElement("Email")]
    public string? Email { get; set; }

    [BsonElement("Department")]
    public decimal Department { get; set; }

    [BsonElement("Position")]
    public decimal Position { get; set; }

    [BsonElement("Hiring")]
    public decimal Hiring { get; set; }

    [BsonElement("StartDate")]
    public DateTime? StartDate { get; set; }

    [BsonElement("EndDate")]
    public DateTime? EndDate { get; set; }

}
