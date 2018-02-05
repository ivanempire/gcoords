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

		it("should return a JSON object of coordinates by default", function() {
			gcoords.init(config.api_key);

			//Default format is JSON
			return gcoords.getCoords("Rome, Italy").then((result) => {
				expect(result).to.deep.equal({ lat: 41.9027835, lng: 12.4963655 });
			});

			//Returns JSON
			return gcoords.getCoords("Rome, Italy","json").then((result) => {
				expect(result).to.deep.equal({ lat: 41.9027835, lng: 12.4963655 });
			});
		});
	});
});
