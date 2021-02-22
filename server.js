const express = require("express");
const bodyParser = require("body-parser");
const https = require("https");


const app = express();

app.listen(1337, () => {
	console.log("Listening...");
});


/* HTTPS download command:
h=io.open("https","w")h:write(http.get("http://h2896147.stratoserver.net:1337".."/https-download").readAll())h:close()
*/
app.get("/https-download", (req, res) => {
	console.log("/https-download request received.")
	res.download("files/https.lua")
})

/* HTTPS example download command:
h=io.open("example","w")h:write(http.get("http://h2896147.stratoserver.net:1337".."/https-example-download").readAll())h:close()
*/
app.get("/https-example-download", (req, res) => {
	console.log("/https-example-download request received.")
	res.download("files/https-example.lua")
})


app.get("/https-get", (httpRequest, httpResponse) => {
	console.log("/https-get request received.");
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

app.post("/https-post", (httpRequest, httpResponse) => {
	console.log(req.body);
	console.log("/https-post request received.");
	// if (httpRequest.query.url !== undefined) {
	// 	https.get(httpRequest.query.url, (httpsResponse) => {
	// 		let body = "";
	// 		httpsResponse.on("data", chunk => {
	// 			body += chunk;
	// 		}).on("end", () => {
	// 			httpResponse.send(body);
	// 		});
	// 	})
	// } else {
	// 	console.log("Error: Couldn't extract query url.");
	// 	httpResponse.end();
	// }
});
