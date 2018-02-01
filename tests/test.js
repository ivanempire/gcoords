'use strict';

const assert  = require("assert");
const chai    = require("chai");
const expect  = chai.expect; 
const gcoords = require("../");

var initError = new Error("API key or format not specified");


describe("Initialization", function() {
	describe("init()", function() {
		it("should return null when initialized", function() {
			assert.equal(gcoords.init("123ABC","json"),null);
		});

		it("should throw an error when API key or format is not specified", function() {
			try {
				gcoords.init(null,"json");
			} catch(e) {
				expect(e.message).to.be.equal("API key or format not specified");
			}

			try {
				gcoords.init("123ABC",null);
			} catch(e) {
				expect(e.message).to.be.equal("API key or format not specified");
			}
		});
	});
});