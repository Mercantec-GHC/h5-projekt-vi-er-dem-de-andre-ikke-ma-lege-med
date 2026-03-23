namespace UptimeDaddy.API.DTOs
{
    public class CreateWebsiteDto
    {
        public string Url { get; set; } = string.Empty;
        public int IntervalTime { get; set; }
        public long UserId { get; set; }
    }
}