const https = require("https");

var API_KEY = "";
var ENDPOINT_URL = "https://maps.googleapis.com/maps/api/geocode/";
var DATA_FORMAT = "";

exports.init = function(apikey, format) {

	if(apikey == null || format == null) {
		throw "API key or format not specified";
	}

	API_KEY = apikey;

	var dataFormat = format.toLowerCase();

	if(dataFormat !== "json" && dataFormat !== "xml") {
		throw "Invalid data format exception";
	}

	ENDPOINT_URL += dataFormat + "?address=";
};

exports.getCoords = function(inputString,callback) {
	var address = encodeURIComponent(inputString);
	var requestUrl = ENDPOINT_URL + address;

	requestUrl += "&key=" + API_KEY;

	https.get(requestUrl, (resp) => {

		var body = "";

		resp.on("data", function(chunk) {
			body += chunk;
		});

		resp.on("end", function() {
			var responseObject = JSON.parse(body);

			var lat = responseObject.results[0].geometry.location.lat;
			var lng = responseObject.results[0].geometry.location.lng;

			callback({"lat":lat,"lng":lng});
		});
	});
};