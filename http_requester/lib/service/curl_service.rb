class CurlService

  attr_accessor :target_path

  def initialize(target_path)
    @target_path = target_path
  end
  
  def curl_response_with_ms_lookup
    `curl -s -o /dev/null #{curl_write_ms_response} #{target_path}`
  end

  private

  def curl_write_ms_response
    '-w "status:%{http_code}\ndns:_lookup%{time_namelookup}\nconnect_to_page:%{time_connect}\ntls_hand_shake:%{time_appconnect}\ntime_to_first_byte:%{time_starttransfer}\ntotal_time:%{time_total}\n"'
  end
end