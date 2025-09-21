using MongoDB.Bson.Serialization.Attributes;

namespace HrWebRecruitment;

public partial class Vacancy
{
    [BsonId]
    public decimal Id { get; set; }

    [BsonElement("Title")]
    public string? Title { get; set; }

    [BsonElement("Description")]
    public string? Description { get; set; }

    [BsonElement("StartDate")]
    public DateTime StartDate { get; set; }

    [BsonElement("EndDate")]
    public DateTime EndDate { get; set; }
}
