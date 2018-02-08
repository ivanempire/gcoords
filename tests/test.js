"use strict";

const chai  = require("chai");
const expect  = chai.expect;
const gcoords = require("../");
const config  = require("./config.json");

describe("Initialization", function() {
	describe("init()", function() {

		it("should return null when initialized", function() {
			expect(gcoords.init(config.api_key)).to.equal(undefined);
		});

		it("should throw an error when API key not specified", function() {
			try {
				gcoords.init(null);
			} catch (e) {
				expect(e.message).to.be.equal("API key not specified");
			}
		});
	});

	describe("getCoords()",function() {

		it("should throw an error when query is null",function() {
			try {
				gcoords.getCoords(null);
			} catch(e) {
				expect(e.message).to.be.equal("No query specified");
			}
		});

		it("should throw an error if init() was not run",function() {
			try {
				gcoords.getCoords("Rome, Italy");
			} catch(e) {
				expect(e.message).to.be.equal("API key not specified");
			}
		});		

		it("should return a JSON object of coordinates by default", function() {
			gcoords.init(config.api_key);

			return gcoords.getCoords("Rome, Italy").then((result) => {
				expect(result).to.deep.equal({ lat: 41.9027835, lng: 12.4963655 });
			});

			return gcoords.getCoords("Rome, Italy","json").then((result) => {
				expect(result).to.deep.equal({ lat: 41.9027835, lng: 12.4963655 });
			});
		});

		it("should return an XML string of coordinates",function() {
			gcoords.init(config.api_key);

			return gcoords.getCoords("Rome, Italy","xml").then((result) => {
				expect(result).to.be.equal("<location><lat>41.9027835</lat><lng>12.4963655</lng></location>");
			});
		});
	});

	describe("getLocation()",function() {
		it("should throw an error if coordinates are null",function() {
			try {
				gcoords.getLocation(null);
			} catch(e) {
				expect(e.message).to.be.equal("No coordinates specified");
			}
		});

		it("should throw an error if init() was not run",function() {
			try {
				gcoords.getLocation(["40.714224","-73.961452"]);
			} catch(e) {
				expect(e.message).to.be.equal("API key not specified");
			}
		});

		it("should return a string of location's full name by default",function() {
			
			return gcoords.getLocation(["40.714224","-73.961452"]).then((result) => {
				expect(result).to.be.equal("277 Bedford Ave, Brooklyn, NY 11211, USA");
			});

			return gcoords.getLocation(["40.714224","-73.961452"],"json").then((result) => {
				expect(result).to.be.equal("277 Bedford Ave, Brooklyn, NY 11211, USA");
			});
		});

		it("should return an XML tag of location's full name by default",function() {
			return gcoords.getLocation(["40.714224","-73.961452"],"xml").then((result) => {
				expect(result).to.be.equal("<formatted_address>277 Bedford Ave, Brooklyn, NY 11211, USA</formatted_address>");
			});
		});
	})
});
