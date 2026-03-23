using MQTTnet;
using System.Text;
using System.Text.Json;
using UptimeDaddy.API.Models;
using UptimeDaddy.API.Data;

namespace UptimeDaddy.API.Services
{
    public class MqttService
    {
        private readonly AppDbContext _context;

        public MqttService(AppDbContext context)
        {
            _context = context;
        }

        public async Task StartAsync()
        {
            var factory = new MqttClientFactory();
            var client = factory.CreateMqttClient();

            var options = new MqttClientOptionsBuilder()
                .WithTcpServer("10.133.51.122", 1883)
                .Build();

            client.ApplicationMessageReceivedAsync += async e =>
            {
                var payload = Encoding.UTF8.GetString(e.ApplicationMessage.Payload);

                Console.WriteLine($"MQTT message: {payload}");

                try
                {
                    var measurement = JsonSerializer.Deserialize<Measurement>(payload);

                    if (measurement != null)
                    {
                        _context.Measurements.Add(measurement);
                        await _context.SaveChangesAsync();
                    }
                }
                catch (Exception ex)
                {
                    Console.WriteLine($"Error: {ex.Message}");
                }
            };

            await client.ConnectAsync(options);
            await client.SubscribeAsync("uptime/measurements");

            Console.WriteLine("MQTT connected!");
        }
    }
}