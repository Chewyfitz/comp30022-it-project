// libraries/imports
var assert = require('assert');
const chai = require('chai');
var chaiHttp = require('chai-http');
const app = require('../server');
chai.use(chaiHttp);

// variables

// album integration tests
describe("/api/album/", function () {
    describe("POST", function () {
        it("returns success if an album is created successfully");
    });
    describe("PUT", function () {
        it("returns success if an album is updated successfully");
    });
    describe("PATCH", function () {
        it("returns success if an album property is updated successfully");
    });
    describe("GET", function () {
        it("returns 404 NOT FOUND for an album that does not exist")
        it("returns album properties for a known album", (done) =>{
            chai.request(app)
                .get('/api/album/un')
                .end( (err, res) => {
                    chai.expect(res).to.have.status(200);
                    chai.expect(res.body).to.not.be.empty;
                    chai.expect(res.body).to.have.property('Album Name');
                    chai.expect(res.body).to.have.property('Album Template');
                    chai.expect(res.body).to.have.property('Album View');
                    chai.expect(res.body).to.have.property('photos');
                    done();
                });
        });
    });
    describe("DELETE", function () {
        it("returns success if an album is successfully deleted");
    });
});
// album page tests
describe("/api/album/{albumId}/", function () {
    describe("POST", function () {
        it("returns success if an album page is created successfully");
    });
    describe("PUT", function () {
        it("returns success if an album page is updated successfully");
    });
    describe("PATCH", function () {
        it("returns success if an album page property is updated successfully");
    });
    describe("GET", function () {
        it("returns an album page object for a known album page");
    });
    describe("DELETE", function () {
        it("returns sucess if an album page is deleted successfully");
    });
});