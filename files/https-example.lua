os.loadAPI("https")


term.clear()
term.setCursorPos(1, 1)


print("This is a showcase of what's possible with HTTPS.")
sleep(6)


print("\nNot only Pastebin is suddenly accessible with the power of HTTPS; any website or API now is!")

quote = https.get("https://api.kanye.rest/?format=text")
sleep(13)

write("\nHave a random Kanye quote for example that an API provides:")
print(" '" .. quote .. "'")
sleep(10)


print("\nA small limitation of this HTTPS API is that you can't use it to ask websites your IP/time.")
sleep(10)

print("\nThis is because my server is sending the HTTPS requests to websites for you, so the websites would just return the IP/time of my server.")
sleep(15)

print("\nThis problem can luckily still be overcome by just finding a website that accepts HTTP requests, but there aren't that many of them nowadays.")
sleep(20)

print("\nWebsites that accept HTTP will return your IP/time if you're in single player, or the IP/time of where your MC server is hosted in multiplayer.")
sleep(20)

write("\nHere's your country, based on the IP address this regular HTTP request was sent from:")
print(" '" .. http.get("http://ip-api.com/line/?fields=country").readAll() .. "'")
sleep(15)


print("\nThere are an incredible amount of fun and even useful HTTPS programs that haven't been invented yet.")
sleep(15)

print("\nYou could for example draw live graphs of covid cases on a large CC Monitor using just text characters.")
sleep(15)

print("\nBuild a functioning casino by sending your HTTPS requests to a database website that will store how much money every player in the server has.")
sleep(20)

print("\nMake a turtle dance when it rains a lot in Africa!")
sleep(10)


print("\nLook up 'fun api ideas' online and get creative! :)")