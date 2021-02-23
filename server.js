const express = require("express");
const bodyParser = require("body-parser");
const https = require("https");
const URL = require("url").URL; // TODO: Update my Node to version 10+ so this line can be removed.


const app = express();

app.listen(1337, () => {
	console.log("Listening...");
});

// This fixes app.post().
// ComputerCraft versions below 1.63 don't support custom headers,
// so the content-type of those is always 'application/x-www-form-urlencoded'.
app.use(bodyParser.urlencoded({ extended: true }));


app.get("/https-download", (req, res) => {
	console.log("/https-download request received.");
	res.download("files/https.lua");
})

app.get("/https-example-download", (req, res) => {
	console.log("/https-example-download request received.");
	res.download("files/https-example.lua");
})


app.get("/https-get", (httpRequest, httpResponse) => {
	console.log("/https-get request received.");
	if (httpRequest.query.url !== undefined) {
		https.get(httpRequest.query.url, (httpsResponse) => {
			let body = "";
			httpsResponse.on("data", (chunk) => {
				body += chunk;
			}).on("end", () => {
				httpResponse.send(body);
			});
		});
	} else {
		console.log("Error: Couldn't extract query url.");
		httpResponse.end();
	}
});

// Use https://webhook.site to debug and temporarily replace line 35 of the 'pastebin' file with this:
// "http://h2896147.stratoserver.net:1337".."/https-post?url=".."https://webhook.site/a4304b41-0933-4b51-9ad8-27a7275ae653",
app.post("/https-post", (httpRequest, httpResponse) => {
	console.log("/https-post request received.");

	const myURL = new URL(httpRequest.query.url);
	const options = {
		host: myURL.hostname,
		path: myURL.pathname,
		method: "POST",
		headers: {
			"Content-Type": "application/x-www-form-urlencoded", // Required for pastebin put to work.
		},
	};

	if (httpRequest.query.url !== undefined) {
		const req = https.request(options, (httpsResponse) => {
			let body = "";
			httpsResponse.on("data", (chunk) => {
				body += chunk;
			}).on("end", () => {
				httpResponse.send(body);
			});
		});
		
		req.on("error", (error) => {
			console.error(error);
		});

		if (httpRequest.body.hasOwnProperty("data")) { // Means it's one property.
			console.log("One property!");
			req.write(httpRequest.body.data);
		} else { // Means it has multiple properties.
			console.log("Multiple properties!");
			req.write(serialize(httpRequest.body));
		}
		req.end();
	} else {
		console.log("Error: Couldn't extract query url.");
		httpResponse.end();
	}
});

function serialize(obj) {
	let str = [];
	for (const p in obj) {
		if (obj.hasOwnProperty(p)) {
			str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
		}
	}
	return str.join("&");
}