-- ComputerCraft and server code written and hosted by MyNameIsTrez#1585 on Discord. Feel free to contact me!

function get(query_url)
  redirect_url = "http://h2896147.stratoserver.net:3000"
  full_url = redirect_url .. "/https?url=" .. query_url
  response_table = http.get(full_url)
  if response_table == nil then error("Didn't get a response back; the HTTPS redirection server and/or the website at the URL passed to this function may be down.") end
  return response_table.readAll()
end
