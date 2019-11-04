var assert = require('assert');
const chai = require('chai');
var chaiHttp = require('chai-http');
const app = require('../server');
chai.use(chaiHttp);

describe("/api/user/", function () {
    // Create
    describe("POST", function () {
        it("Creates a user for a given unique username and password");
        it("Fails to create a user with a preexisting username");
        it("Fails to create a user with no password");
    });
    // Read
    describe("GET", function () {
        it("Returns a user object for a user that exists");
        it("Returns 403 FORBIDDEN for a username that does not exist");
        it("Returns 403 FORBIDDEN for a user with an incorrect password");
    });
    // Update
    describe("PATCH", function () {
        it("Updates user information");
    });
    // Delete
    describe("DELETE", function () {
        it("Returns 200 OK on deleting a user with a correct username and password");
        it("Returns 403 FORBIDDEN for a username that does not exist");
        it("Returns 403 FORBIDDEN for a user with an incorrect password");
    });
});