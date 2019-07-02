var express = require("express");
var router = express.Router();
var details = require("./details/index");
var client = require("flipkart-api-affiliate-client");

var fkClient = new client(
	{
		trackingId: details.trackingId,
		token: details.token
	},
	"json"
);

router.get("/", (req, res) => {
	res.render("index", { title: "Search" });
});

router.get("/search/:query", function(req, res, next) {
	var { query } = req.params;
	var resultCount = 10;

	var url = `https://affiliate-api.flipkart.net/affiliate/1.0/search.json?query=${query}&resultCount=${resultCount}`;

	fkClient.getProductsFeed(url).then(function(value) {
		var data = JSON.parse(value.body);
		res.send(data);
	});
});

module.exports = router;
