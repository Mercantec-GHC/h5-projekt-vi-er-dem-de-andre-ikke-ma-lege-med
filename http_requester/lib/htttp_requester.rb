class HttpRequester
  
  attr_accessor :home_pages, :curl_responses, :logger, :stop, :changes

  def initialize(logger)
    @logger = logger
    @stop = false
    @changes = false

  end
  
  def execute 
    start_mqtt_client!
    load_websites_from_db!

    until @stop
      begin
        update_home_pages! if @changes
        # run_curl_on_home_pages!
        # print_curl_responses!
      rescue => e
        logger.error("An error occurred in event loop: #{e.message} \n #{e.backtrace.join("\n")}")
      end
      sleep(2)
    end
  end

  def print_curl_responses!
    curl_responses.each do |curl_response|
      curl_response.pretty_print_data
    end
  end
  
  private

  def load_websites_from_db!
    file_data = JSON.parse(File.read("pages.json"))
    @users = file_data.fetch("users", []).map do |user_data|
      pages = user_data.fetch("pages", []).map do |page|
        Page.new(page.fetch("id"), page.fetch("path"), page.fetch("interval_time"))
      end
      user = User.new(user_data.fetch("user_id"), pages)
      logger.info("Loaded user #{user.id} with pages: #{user.pages.map(&:path).join(', ')}")
    end
  rescue => e
    logger.error("Failed to load websites from DB: #{e.message}")
  end
  
    def start_mqtt_client!
      Thread.new do
        MqttBroker.new(logger).start!
      end
    end
  
  def update_home_pages!
    
  end

    def run_curl_on_home_pages!
    @curl_responses = home_pages.map do |home_page|
      UrlData.new(CurlService.new(home_page).formated_response, home_page)
    end
  end  

end