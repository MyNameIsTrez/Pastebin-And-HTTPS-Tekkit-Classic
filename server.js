const express = require("express");
const bodyParser = require("body-parser");
const https = require("https");


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
			httpsResponse.on("data", chunk => {
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

// Use webhook.site to debug.
app.post("/https-post", (httpRequest, httpResponse) => {
	const data = httpRequest.body.data;

	console.log(data);
	httpResponse.end();

	console.log("/https-post request received.");

	// const options = {
	// 	// hostname: httpRequest.query.url,
	// 	// path: '/post',

	// 	hostname: 'webhook.site',
	// 	path: '/a4304b41-0933-4b51-9ad8-27a7275ae653',
	// 	method: 'POST',
	// };

	const options = {
		method: 'POST',
	};

	if (httpRequest.query.url !== undefined) {
		const req = https.request(httpRequest.query.url, options, (httpsResponse) => {
			httpsResponse.on("data", (d) => {
				process.stdout.write(d);
			});
		});
		req.on("error", (error) => {
			console.error(error);
		});
		req.write(data);
		req.end();
	} else {
		console.log("Error: Couldn't extract query url.");
		httpResponse.end();
	}
});
