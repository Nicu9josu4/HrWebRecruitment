namespace HrWebRecruitment.Models.Config
{
    public class MongoDbConfig
    {
        public string UserName { get; set; }
        public string Password { get; set; }
        public string HostName { get; set; }
        public string Port { get; set; }
        public string DatabaseName { get => $"{UserName}:{Password}@{HostName}:{Port}"; }
        public string ConnectionString { get; set; }

        // mongodb://admin:secret@localhost:27017"
    }
}
