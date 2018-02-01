"use strict";

const https = require("https");

let API_KEY = "";
let ENDPOINT_URL = "https://maps.googleapis.com/maps/api/geocode/";
let DATA_FORMAT = "";

exports.init = function(apikey, format) {
	if (apikey == null || format == null) {
		throw new Error("API key or format not specified");
	}

	let dataFormat = format.toLowerCase();
	if (dataFormat !== "json" && dataFormat !== "xml") {
		throw new Error("Invalid data format exception");
	}

	API_KEY = apikey;
	ENDPOINT_URL += dataFormat;
};

exports.getCoords = function(inputString, callback) {
	if(!inputString) {
		throw new Error("No query specified");
	}
	let address = encodeURIComponent(inputString);
	let requestUrl = ENDPOINT_URL + "?address=" + address + "&key=" + API_KEY;

	makeRequest(requestUrl, "json", (resp) => {
		callback({
			"lat": resp.results[0].geometry.location.lat,
			"lng": resp.results[0].geometry.location.lng,
		});
	});
};

exports.getLocation = function(coords, callback) {
	if(!coords) {
		throw new Error("No coordinates specified");
	}
	let point = coords[0]+","+coords[1];
	let requestUrl = ENDPOINT_URL + "?latlng=" + point + "&key=" + API_KEY;

	makeRequest(requestUrl, "json", (resp) => {
		callback(resp.results[0].formatted_address);
	});
};


/**
 * Sends a request to the Google Geocode API
 * @param {string} requestUrl - The API url to query.
 * @param {string} dataFormat - The data format to return results as.
 * @param {function} callback - Function to call after request is complete.
 */
function makeRequest(requestUrl, dataFormat, callback) {
	https.get(requestUrl, (resp) => {
		let body = "";

		resp.on("data", function(chunk) {
			body += chunk;
		});

		resp.on("end", function() {
			let requestStatus = body.status;
			switch (requestStatus) {
			// Result-related errors
			case "OK":
				if (dataFormat === "json") {
					let responseObject = JSON.parse(body);
					callback(responseObject);
				} else {
					// XML logic here
				}
				break;
			case "ZERO_RESULTS":
				console.log("Google Geocode API returned zero results.");
				break;

			// Putting these three together as usability errors
			case "OVER_QUERY_LIMIT":
			case "REQUEST_DENIED":
			case "INVALID_REQUEST":
				console.log("Google Maps API exception: "
					+ JSON.parse(body).error_message);
				break;
			case "UNKNOWN_ERROR":
				console.log("Google Geocode API returned an unknown error. Try again.");
				break;
			}
		});
	});
}
