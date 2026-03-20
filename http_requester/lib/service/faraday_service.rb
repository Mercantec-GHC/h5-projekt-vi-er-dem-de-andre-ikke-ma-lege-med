class FaradayService
  attr_accessor :destanation_path

  def initialize(destanation_path)
    @destanation_path = destanation_path
  end

  def get_response_header_and_status
    response = get_response
    [response.headers, response.status]
  end

  private
  
  def get_response
    faraday_client.get(destanation_path)
  end


  def faraday_client
    @faraday_client ||= begin
      Faraday.new do |faraday|
        faraday.adapter Faraday.default_adapter
      end
    end
  end

end