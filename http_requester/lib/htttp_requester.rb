class HttpRequester
  
  attr_accessor :home_pages, :curl_responses, :logger, :stop

  def initialize(logger)
    @logger = logger
    @stop = false
  end
  
  def execute 
    start_mqtt_client!
    # load_websites_from_db!

    until @stop
      begin
        update_home_pages!
        run_curl_on_home_pages!
        print_curl_responses!
      rescue => e
        @logger.error("An error occurred: #{e.message}")
      end
      sleep(10)
    end
  end

  def start_mqtt_client!
    Thread.new do
      MqttService.new(@logger).start!
    end
  end
  

  def print_curl_responses!
    curl_responses.each do |curl_response|
      curl_response.pretty_print_data
    end
  end
  
  def update_home_pages!
    @home_pages = [
      "https://www.google.com",
      "https://www.facebook.com"
    ]
  end

  private

    def run_curl_on_home_pages!
    @curl_responses = home_pages.map do |home_page|
      UrlDataModel.new(CurlService.new(home_page).formated_response, home_page)
    end
  end  

end