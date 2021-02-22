<p align="center"><img src="media/logo.png" alt="Logo"></p>
<h1 align="center">Pastebin and HTTPS fix for Tekkit Classic</h1>

## Pastebin fix command
The `pastebin` command recently got broken due to them not accepting HTTP requests anymore, so this is how you fix that issue for both singleplayer and multiplayer.

Copy this into your File Explorer's search bar: `%appdata%/.technic/modpacks/tekkit/config` and open `mod_ComputerCraft.cfg` with Notepad.
If the value after `enableAPI_http=` is `0` then you should change that to `1`. Hold `ctrl+s` to save the file and close the file after that.

Now go to `%appdata%/.technic/modpacks/tekkit/mods/ComputerCraft/lua/rom/programs/http` and open `pastebin` with Notepad.

Copy this command and replace what was on line 76 with it:

`"http://h2896147.stratoserver.net:1337".."/https?url=".."https://pastebin.com/raw/"..textutils.urlEncode( sCode )`

Hold `ctrl+s` to save the file and close the file after that.

## HTTPS download command
You can copy the command below by selecting it and holding `ctrl+c`. Now open a Computer, type `lua` and paste it with `ctrl+v`:

`h=io.open("https","w")h:write(http.get("http://h2896147.stratoserver.net:1337".."/https-download").readAll())h:close()`

### Description
It'll download a Lua library containing the functions `get()` and `post()`.

To use this library in your own code you just have to add `os.loadAPI("https")` at the top of your file, which'll enable you to do `https.get()` and `https.post()`. See the section below on how you can download an example file, which'll act as a further tutorial.

## HTTPS example download command
You can copy the command below by selecting it and holding `ctrl+c`. Now open a Computer, type `lua` and paste it with `ctrl+v`:

`h=io.open("example","w")h:write(http.get("http://h2896147.stratoserver.net:1337".."/https-example-download").readAll())h:close()`

### Description
It'll download a tutorial on how to use HTTPS. It can be run by typing `example`.

The tutorial will make some HTTPS requests to web APIs which aren't accessible with regular HTTP.

The tutorial can be inspected by running `edit example`. This is how I recommend you learn how to make HTTPS requests to web APIs in your own programs.

You can remove the program with `rm example` after having seen the tutorial at least once. It isn't necessary to run this command again on any another computer.

## How the fix works
Proin risus turpis, tempor eu suscipit sit amet, semper sed urna. Nulla iaculis risus in metus tristique, ut convallis lorem pellentesque. Duis feugiat condimentum libero, nec accumsan tortor dapibus in. Proin eu eleifend lacus. Etiam imperdiet sed ex at placerat. Maecenas vitae gravida velit. Quisque lobortis lacus at sagittis facilisis. Donec et lorem id dui ornare fringilla. Proin placerat faucibus efficitur. Praesent suscipit nibh massa, ut dignissim tortor gravida a. Pellentesque eleifend tortor in ante lacinia, ac vehicula diam ultrices. Etiam gravida tellus ipsum, id auctor erat feugiat a. Mauris luctus ipsum id felis laoreet, eu dictum eros lacinia. Duis dictum velit in quam venenatis lacinia. Fusce convallis felis nec lacus venenatis, sit amet scelerisque nisi suscipit.

## Hosting the server yourself
`npm install`

## Get in contact
If you have any questions or just want to have a chat you can contact me via Discord: `#MyNameIsTrez1585`