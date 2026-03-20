require_relative "lib/boot_loader"

curl_response = CurlService.new("https://www.google.com").curl_response_with_ms_lookup
puts curl_response
