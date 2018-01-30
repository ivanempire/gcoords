const API_KEY = "";
const BASE_URL = "https://maps.googleapis.com/maps/api/geocode/";

exports.init = function(apikey, format) {

	if(apikey == null || format == null) {
		throw "API key or format not specified";
	}

	var dataFormat = format.toLowerCase();

	if(dataFormat !== "json" && dataFormat !== "xml") {
		throw "Invalid data format exception";
	}
};