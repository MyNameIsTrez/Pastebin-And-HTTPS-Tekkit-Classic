-- ComputerCraft and server code written and hosted by MyNameIsTrez#1585 on Discord. Feel free to contact me!

function get(query_url)
  local redirect_url = "http://h2896147.stratoserver.net:1337"
  local full_url = redirect_url .. "/https-get?url=" .. query_url
  local response_table = http.get(full_url)
  return response_table
end

function post(query_url, post_data)
  local redirect_url = "http://h2896147.stratoserver.net:1337"
  local full_url = redirect_url .. "/https-post?url=" .. query_url
  print("foo")
  print("data={\"rofl\":\"" .. post_data .. "\"}")
  print("bar")
  local response_table = http.post(full_url, "data={\"rofl\":\"" .. post_data .. "\"}")
  return response_table
end