using MongoDB.Bson.Serialization.Attributes;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;

namespace HrWebRecruitment;

public partial class Hiring
{
    [BsonId]
    public decimal Id { get; set; }

    [BsonElement("Candidat")]
    public decimal Candidat { get; set; }

    [BsonElement("Users")]
    public decimal? Users { get; set; }

    [BsonElement("Status")]
    public decimal Status { get; set; }

    [BsonElement("Vacancy")]
    public decimal? Vacancy { get; set; }

    [BsonElement("StatusDate")]
    public DateTime? StatusDate { get; set; }

    [BsonElement("Comm")]
    public string? Comm { get; set; }
}
