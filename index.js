"use strict";

const https = require("https");
const DomParser = require("dom-parser");
const inspect = require("util").inspect;
const parse = require('xml-parser');

let API_KEY = "";
let ENDPOINT_URL = "https://maps.googleapis.com/maps/api/geocode/json";

exports.init = function(apikey) {
	if (apikey == null) {
		throw new Error("API key not specified");
	}

	API_KEY = apikey;
};

exports.getCoords = function(inputString,format) {
	let dataFormat = "";

	if(!inputString) {
		throw new Error("No query specified");
	}
	
	if(format) {
		dataFormat = checkFormat(format.toLowerCase());
	} else {
		dataFormat = "json";
	}

	return new Promise((resolve, reject) => {

		let address = encodeURIComponent(inputString);
		let requestUrl = ENDPOINT_URL + "?address=" + address + "&key=" + API_KEY;

		makeRequest(requestUrl,dataFormat).then((result) => {
				if(dataFormat === "json") {
					resolve({
						"lat": result.results[0].geometry.location.lat,
						"lng": result.results[0].geometry.location.lng,
					});	
				} else if(dataFormat === "xml") {
					resolve(
						"<location><lat>" + result.results[0].geometry.location.lat + "</lat><lng>"
						+ result.results[0].geometry.location.lng +
						"</lng></location>");
				}
		}).catch((error) => {
			throw new Error("Request error, API returned: " + error.status);
		});
	});
};

exports.getLocation = function(coords,format) {
	let dataFormat = "";

	if(format) {
		dataFormat = checkFormat(format.toLowerCase());
	} else {
		dataFormat = "json";
	}

	return new Promise((resolve, reject) => {
		if(!coords) {
			throw new Error("No coordinates specified");
		}

		let point = coords[0]+","+coords[1];
		let requestUrl = ENDPOINT_URL + "?latlng=" + point + "&key=" + API_KEY;

		makeRequest(requestUrl).then((result) => {
			if(dataFormat === "json") {
				resolve(result.results[0].formatted_address);
			} else if(dataFormat === "xml") {
				let responseObject = parse(result.rawHTML);
				resolve("<formatted_address>" + responseObject.root.children[1].children[1].content + "</formatted_address>");
			}
		}).catch((error) => {
			throw new Error("Request error, API returned: " + error.status);
		});
	});
};

/**
 * Verifies the validity of the user's data format
 * @param {string} inputFormat - User inputted data format.
 */
function checkFormat(inputFormat) {
	if(inputFormat === "xml" || inputFormat === "json" ) {
		return inputFormat;
	} else {
		throw new Error("Invalid format specified!");
	}
}

/**
 * Sends a request to the Google Geocode API
 * @param {string} requestUrl - The API url to query.
 */
function makeRequest(requestUrl) {
	return new Promise((resolve, reject) => {
		https.get(requestUrl, (resp) => {
			let body = "";

			resp.on("data", function(chunk) {
				body += chunk;
			});

			resp.on("end", function() {
				let responseObject = JSON.parse(body);
				let requestStatus = responseObject.status;

				switch (requestStatus) {
					case "OK":
						resolve(responseObject);
						break;
					case "ZERO_RESULTS":					
					case "UNKNOWN_ERROR":	
					case "OVER_QUERY_LIMIT":
					case "REQUEST_DENIED":
					case "INVALID_REQUEST":
						reject(responseObject);
						break;
				}
			});
		});
	});
};
