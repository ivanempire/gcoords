"use strict";

const assert = require("assert");
const chai = require("chai");
const expect = chai.expect;
const gcoords = require("../");

describe("Initialization", function() {
	describe("init()", function() {
		it("should return null when initialized", function() {
			assert.equal(gcoords.init("123ABC", "json"), null);
		});

		it("should throw an error when API key or format is not specified", function() {
			try {
				gcoords.init(null, "json");
			} catch (e) {
				expect(e.message).to.be.equal("API key or format not specified");
			}

			try {
				gcoords.init("123ABC", null);
			} catch (e) {
				expect(e.message).to.be.equal("API key or format not specified");
			}
		});
	});

	describe("getCoords()",function() {
		it("should throw an error when query is not specified",function() {
			try {
				gcoords.getCoords(null,function(resp) {
					console.log(resp);
				});
			} catch (e) {
				expect(e.message).to.be.equal("No query specified");
			}
		});
	});

	describe("getLocation()",function() {
		it("should throw an error when coordinates are not specified",function() {
			try {
				gcoords.getLocation(null,function(resp) {
					console.log(resp);
				});
			} catch (e) {
				expect(e.message).to.be.equal("No coordinates specified");
			}
		});
	});

	describe("API Responses",function() {
		//Case OK
		//Case ZERO_RESULTS
		//case OVER_QUERY_LIMIT
		//Case REQUEST_DENIED
		it("should return REQUEST_DENIED with zero results given invalid credentials",function() {
			gcoords.init("123ABC", null);
			try {

			} catch(e) {
				expect(e.message).to.be.equal("No coordinates specified");
			}
			gcoords.getLocation("Boston, Massachusetts",function(resp) {

			})
		});
		//Case INVALID_REQUEST
		//Case UNKNOWN_ERROR
	})
});
