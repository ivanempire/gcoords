const https = require("https");

var API_KEY = "";
var ENDPOINT_URL = "https://maps.googleapis.com/maps/api/geocode/";
var DATA_FORMAT = "";

exports.init = function(apikey, format) {

	if(apikey == null || format == null) {
		throw "API key or format not specified";
	}

	var dataFormat = format.toLowerCase();
	if(dataFormat !== "json" && dataFormat !== "xml") {
		throw "Invalid data format exception";
	}

	API_KEY = apikey;
	ENDPOINT_URL += dataFormat;

};

exports.getCoords = function(inputString,callback) {
	var address = encodeURIComponent(inputString);
	var requestUrl = ENDPOINT_URL + "?address=" + address + "&key=" + API_KEY;

	makeRequest(requestUrl,"json", (resp) => {
		callback({
			"lat":resp.results[0].geometry.location.lat,
			"lng":resp.results[0].geometry.location.lng
		});
	});
};

exports.getLocation = function(coords,callback) {
	var point = coords[0]+","+coords[1];
	var requestUrl = ENDPOINT_URL + "?latlng=" + point + "&key=" + API_KEY;

	makeRequest(requestUrl,"json", (resp) => {
		callback(resp.results[0].formatted_address);
	});
};

function makeRequest(requestUrl,dataformat,callback) {
	https.get(requestUrl, (resp) => {

			var body = "";

			resp.on("data", function(chunk) {
				body += chunk;
			});

			resp.on("end", function() {
				var requestStatus = body.status;
				switch(requestStatus) {
					//Result-related errors
					case "OK":
					if(dataformat === "json") {
						var responseObject = JSON.parse(body);
						callback(responseObject);
					} else {
						//XML logic here
					}
					break;
					case "ZERO_RESULTS":
						console.log("Google Geocode API returned zero results.");
					break;

					//Putting these three together as usability errors
					case "OVER_QUERY_LIMIT":
					case "REQUEST_DENIED":
					case "INVALID_REQUEST":
						console.log("Google Maps API exception: " + JSON.parse(body).error_message);
					break;
					case "UNKNOWN_ERROR":
						console.log("Google Geocode API returned an unknown error. Try again.");
					break;
				}
			});
		});
}