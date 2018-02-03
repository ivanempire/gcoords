"use strict";

const chai = require("chai");
const expect = chai.expect;
const gcoords = require("../");

describe("Initialization", function() {
	describe("init()", function() {

		it("should return null when initialized", function() {
			expect(gcoords.init("123ABC")).to.equal(undefined);
		});

		it("should throw an error when API key not specified", function() {
			try {
				gcoords.init(null);
			} catch (e) {
				expect(e.message).to.be.equal("API key not specified");
			}
		});
	});
});
