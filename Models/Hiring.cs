using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using static HrWebRecruitment.Services.UtilsService;

namespace HrWebRecruitment;

public partial class Hiring
{
    [BsonId]
    public decimal Id { get; set; }

    [BsonElement("Candidat")]
    public string Candidat { get; set; }

    [BsonElement("Users")]
    public string? Users { get; set; }

    [BsonElement("Status")]
    public decimal Status { get; set; }

    [BsonElement("Vacancy")]
    public string? Vacancy { get; set; }

    [BsonElement("StatusDate")]
    [JsonConverter(typeof(BsonDateTimeConverter))] // Use a custom converter
    public DateTime? StatusDate { get; set; }

    [BsonElement("Comm")]
    public string? Comm { get; set; }
}
