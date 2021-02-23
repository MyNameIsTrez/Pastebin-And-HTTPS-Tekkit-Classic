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

// Use https://webhook.site to debug.
app.post("/https-post", (httpRequest, httpResponse) => {
	console.log("/https-post request received.");

	// const data = httpRequest.body;

	const myURL = new URL(httpRequest.query.url);
	const options = {
		host: myURL.hostname,
		path: myURL.pathname,
		method: "POST",
		headers: {
			"Content-Type": "application/json",
			// "Content-Length": data.length,
		},
	};

	if (httpRequest.query.url !== undefined) {
		console.log(options);
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
		// console.log(JSON.stringify(httpRequest.body));
		// req.write(httpRequest.body.data); // Non-JSON object, just a string.
		req.write(JSON.stringify(httpRequest.body));
		req.end();
	} else {
		console.log("Error: Couldn't extract query url.");
		httpResponse.end();
	}
});
