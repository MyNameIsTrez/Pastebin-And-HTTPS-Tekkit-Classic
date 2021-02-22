<p align="center"><img src="media/logo.png" alt="Logo"></p>
<h1 align="center">Pastebin and HTTPS fix for Tekkit Classic</h1>

## Introduction
The `pastebin` command recently got broken in Tekkit Classic due to Pastebin not accepting HTTP requests anymore, so the section below covers how you fix that issue for both singleplayer and multiplayer.

Additionally, this page also covers how you can make HTTPS requests from Tekkit Classic, which is normally not possible due to HTTPS being added to ComputerCraft after Tekkit Classic came out.

## Pastebin fix command
Copy this into your File Explorer's search bar: `%appdata%/.technic/modpacks/tekkit/config` and open `mod_ComputerCraft.cfg` with Notepad.
If the value after `enableAPI_http=` is `0` then you should change that to `1`. Hold `ctrl+s` to save the file and close the file after that.

Now go to `%appdata%/.technic/modpacks/tekkit/mods/ComputerCraft/lua/rom/programs/http` and open `pastebin` with Notepad.

Copy this command and replace what is on line 35 with it:

`"http://h2896147.stratoserver.net:1337".."/https-post?url=".."https://pastebin.com/api/api_post.php",` 

Now also copy this command (it's a single line) and replace what is on line 76 with it:

`"http://h2896147.stratoserver.net:1337".."/https-get?url=".."https://pastebin.com/raw/"..textutils.urlEncode( sCode )`

Hold `ctrl+s` to save the file and close the file after that.

## HTTPS download command
You can copy the command below by selecting it and holding `ctrl+c`. Now open a Computer, type `lua` and paste it with `ctrl+v`:

`h=io.open("https","w")h:write(http.get("http://h2896147.stratoserver.net:1337".."/https-download").readAll())h:close()`

### Description
It'll download a Lua library containing the functions `get()` and `post()`.

To use this library in your own code you just have to add `os.loadAPI("https")` at the top of your file, which'll enable you to do `https.get(url)` and `https.post(url)`. See the section below on how you can download an example file, which'll act as a further tutorial.

## HTTPS example download command
You can copy the command below by selecting it and holding `ctrl+c`. Now open a Computer, type `lua` and paste it with `ctrl+v`:

`h=io.open("example","w")h:write(http.get("http://h2896147.stratoserver.net:1337".."/https-example-download").readAll())h:close()`

### Description
It'll download a tutorial on how to use HTTPS. It can be run by first typing `exit()` and then `example`.

The tutorial will make some HTTPS requests to web APIs which aren't accessible with regular HTTP.

The tutorial can be inspected by running `edit example`. This is how I recommend you learn how to make HTTPS requests to web APIs in your own programs.

You can remove the program with `rm example` after having seen the tutorial at least once. It isn't necessary to run this command again on any another computer.

## How the fixes work
My server acts as a middleman by making the HTTPS requests for you. What enables this is that I've set up my server to allow incoming HTTP requests, which most websites nowadays don't.

With `https.get(url)` or `https.post(url)` you send a HTTP request to my server, along with the *actual* URL you'd like to make a HTTPS request from/to.

My server makes that *actual* HTTPS request. The other website responds to my server with a response, and my server then responds to your original HTTP request with that same response.

## Hosting the server yourself
Download this repository and run `npm install` to install the required libraries. Run `node server.js` afterwards and you should now be able to change the `redirect_url` in `files/https.lua` to your own IP/URL. You should now also be able to do the same for the Pastebin command.

## Get in contact
If you have any questions or just want to have a chat you can contact me via Discord: `#MyNameIsTrez1585`

## Todo

* Support the headers table parameter for `https.post()` and `https.get()`
* Fix `pastebin put`