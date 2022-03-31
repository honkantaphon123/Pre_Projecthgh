// Step 1 - set up express & mongoose

var express = require("express");
var app = express();
var bodyParser = require("body-parser");
var mongoose = require("mongoose");

var fs = require("fs");
var path = require("path");
require("dotenv/config");
mongoose.connect(
  process.env.MONGO_URL,
  { useNewUrlParser: true, useUnifiedTopology: true },
  (err) => {
    console.log("connected");
  }
);

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static(__dirname + '/public'))

// Set EJS as templating engine
app.set("views", "./views");
app.set("view engine", "ejs");

// Step 6 - load the mongoose model for Image

var imgModel = require('./model');

// Step 7 - the GET request handler that provides the HTML UI

app.get("/", (req, res) => {
  imgModel.find({}, (err, items) => {
		if (err) {
			console.log(err);
			res.status(500).send('An error occurred', err);
		}
		else {
			res.render('index', { items: items });
		}
	});
});
app.get('/login', (req, res) => {
  res.render('login')
})
// Step 9 - configure the server's port

var port = process.env.PORT || "3000";
app.listen(port, (err) => {
  if (err) throw err;
  console.log("Server listening on port", port);
});
