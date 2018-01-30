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

	ENDPOINT_URL += dataFormat + "?address";

	console.log(ENDPOINT_URL);

};