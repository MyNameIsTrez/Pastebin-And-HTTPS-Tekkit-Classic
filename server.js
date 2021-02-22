const express = require("express");
const bodyParser = require("body-parser");
const https = require("https");


const app = express();

app.listen(3000, () => { // TODO: Might be able to remove "0.0.0.0".
	console.log("Listening...");
});


/* HTTPS download command:
h=io.open("https","w")h:write(http.get("http://h2896147.stratoserver.net:3000".."/https-download").readAll())h:close()
*/
app.get("/https-download", (req, res) => {
	console.log("/https-download request received.")
	res.download("https/https")
})

/* HTTPS example download command:
h=io.open("example","w")h:write(http.get("http://h2896147.stratoserver.net:3000".."/https-example-download").readAll())h:close()
*/
app.get("/https-example-download", (req, res) => {
	console.log("/https-example-download request received.")
	res.download("https/https-example")
})

app.get("/https", (httpRequest, httpResponse) => {
	console.log("/https request received.");
	if (httpRequest.query.url !== undefined) {
		https.get(httpRequest.query.url, (httpsResponse) => {
			let body = "";
			httpsResponse.on("data", chunk => {
				body += chunk;
			}).on("end", () => {
				httpResponse.send(body);
			});
		})
	} else {
		console.log("Error: Couldn't extract query url.");
		httpResponse.end();
	}
});
