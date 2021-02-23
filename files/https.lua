-- ComputerCraft and server code written and hosted by MyNameIsTrez#1585 on Discord. Feel free to contact me!

function get(query_url)
  local full_url = "http://h2896147.stratoserver.net:1337" .. "/https-get?url=" .. query_url
  local response_table = http.get(full_url)
  return response_table
end

function post(query_url, post_data)
  if type(post_data) ~= "string" and type(post_data) ~= "number" then
    error("https.post() expected string/number as 2nd argument, but got " .. type(post_data))
  end
  local full_url = "http://h2896147.stratoserver.net:1337" .. "/https-post?url=" .. query_url
  local response_table = http.post(full_url, "data=" .. post_data)
  return response_table
end