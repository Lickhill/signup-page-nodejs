const express = require("express");
const request = require("request");
const bodyParser = require("body-parser");
const https = require("https");

const app = express();

app.use(express.static("public"));

app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", function (req, res) {
	res.sendFile(__dirname + "/signup.html");
});

app.post("/", function (req, res) {
	const firstname = req.body.firstname;
	const lastname = req.body.lastname;
	const email = req.body.email;

	const data = {
		members: [
			{
				email_address: email,
				status: "subscribed",
				merge_fields: {
					FNAME: firstname,
					LNAME: lastname,
				},
			},
		],
	};

	const jsonData = JSON.stringify(data);

	const url = "https://us21.api.mailchimp.com/3.0/lists/c6b7071a34"; // Define the URL here

	const options = {
		method: "POST",
		auth: "Lickhill:2017dda2d3462f1fd1263ba3f3997750-us21",
		headers: {
			"Content-Type": "application/json",
		},
	};

	const request = https.request(url, options, function (response) {
		if (response.statusCode === 200) {
			res.sendFile(__dirname + "/failure.html");
		} else {
			res.sendFile(__dirname + "/success.html");
		}
	});

	request.write(jsonData);
	request.end();
});

app.post("/failure", function (req, res) {
	res.redirect("/");
});

app.listen(3000, function () {
	console.log("server is running");
});
