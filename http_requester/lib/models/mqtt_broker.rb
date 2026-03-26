class MqttBroker
  def initialize(logger)
    @logger = logger
  end

  def start!
    logger.info("Starting MQTT client...")
    MQTT::Client.connect(
      host: "localhost",
      port: 1883
    ) do |client|
      client.subscribe("test")

      client.get do |topic, message|
        logger.info("Received message on topic '#{topic}': #{message}")
      end
    end
  end
end