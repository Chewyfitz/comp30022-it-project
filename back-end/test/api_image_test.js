var assert = require('assert');
const chai = require('chai');
var chaiHttp = require('chai-http');
const app = require('../server');
chai.use(chaiHttp);

const imageId_exists = 'BdOTCk3lhxp8bwkZqGiF';

// image tests
describe("/api/image/", function () {
    describe("POST", function () {
        it("returns success if a URL is added successfully");
        it("returns success if a file is uploaded successfully");
        it("returns 400 BAD REQUEST if ?user={userId} is not specified");
        var url = '';
        it("returns 400 BAD REQUEST if ?image={URL} is not specified and an image is not supplied", (done) => {
            chai.request(app)
                .post(`/api/image/?image=${url}`)
                .end((err, res) => {
                    chai.expect(res).to.have.status(400);
                    done();
                });
        });
        it("returns 400 BAD REQUEST if an image is not supplied and ?image={url} is not specified");
    });
    describe("GET", function () {
        it("returns an image URL for an /{imageId}/view that exists", (done) => {
            chai.request(app)
                .get(`/api/image/${imageId_exists}/view`)
                .end((err, res) => {
                    console.log(res.body);
                    chai.expect(res).to.have.status(200);
                    chai.expect(res.body).to.not.be.empty;
                    done();
                });
        });
        it("returns an image object for a /{imageId} that exists", (done) => {
            chai.request(app)
                .get(`/api/image/${imageId_exists}`)
                .end((err, res) => {
                    chai.expect(res).to.have.status(200);
                    chai.expect(res.body).to.not.be.empty;
                    chai.expect(res.body).to.have.property('Photo DateTime');
                    chai.expect(res.body).to.have.property('Photo Description');
                    chai.expect(res.body).to.have.property('Photo Name');
                    chai.expect(res.body).to.have.property('Photo Reference');
                    done();
                });
        });
        it("returns 404 for an image that does not exist");
    });
    describe("DELETE", function() {
        it("returns 200 OK for a successfully deleted image");
        it("returns 404 NOT FOUND for an invalid image id");
    });
});
