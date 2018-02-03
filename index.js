"use strict";

const https = require("https");
const DomParser = require("dom-parser");

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
	DATA_FORMAT = dataFormat;
};

exports.getCoords = function(inputString) {
	return new Promise((resolve, reject) => {

		if(!inputString) {
			throw new Error("No query specified");
		}

		let address = encodeURIComponent(inputString);
		let requestUrl = ENDPOINT_URL + "?address=" + address + "&key=" + API_KEY;

		makeRequest(requestUrl,DATA_FORMAT).then((result) => {
			if(DATA_FORMAT === "json") {
				resolve({
					"lat": result.results[0].geometry.location.lat,
					"lng": result.results[0].geometry.location.lng,
				});
			} else {
				console.log("XML result!");
			}
		}).catch((error) => {
			throw new Error("Request error, API returned: " + error.status);
		});
	});
};

exports.getLocation = function(coords) {
	return new Promise((resolve, reject) => {
		if(!coords) {
			throw new Error("No coordinates specified");
		}

		let point = coords[0]+","+coords[1];
		let requestUrl = ENDPOINT_URL + "?latlng=" + point + "&key=" + API_KEY;


		makeRequest(requestUrl,DATA_FORMAT).then((result) => {
			if(DATA_FORMAT === "json") {
				resolve(result.results[0].formatted_address);
			} else {
				console.log("XML result!");
			}
		}).catch((error) => {
			throw new Error("Request error, API returned: " + error.status);
		});
	});
};


/**
 * Sends a request to the Google Geocode API
 * @param {string} requestUrl - The API url to query.
 * @param {string} dataFormat - The data format to return results as.
 */
function makeRequest(requestUrl, dataFormat) {
	return new Promise((resolve, reject) => {
		https.get(requestUrl, (resp) => {
			let body = "";

			resp.on("data", function(chunk) {
				body += chunk;
			});

			resp.on("end", function() {
				let responseObject,requestStatus;
			
				if(dataFormat === "json") {
					responseObject = JSON.parse(body);
					requestStatus = responseObject.status;
				} else {
					let dParser = new DomParser();
					responseObject = dParser.parseFromString(body);
					requestStatus = responseObject.getElementsByTagName("status")[0].innerHTML;
				}

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
