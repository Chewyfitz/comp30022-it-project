// libraries/imports
var assert = require('assert');
const chai = require('chai');
var chaiHttp = require('chai-http');
const app = require('../server');
chai.use(chaiHttp);

// variables
const user = 'test_user';
const albumId   = 'test_album';
const albumId_1 = '12345';
const albumName   = 'test_album';
const albumName_1 = 't3st_4lbum';
const template   = 0;
const template_1 = 1;
const view   = 'preview';
const view_1 = 'page';

// album integration tests
describe("/api/album/", function () {
    // Create
    describe("POST", function () {
        it("returns 201 CREATED if an album is created successfully", (done) => {
            chai.request(app)
                .post('/api/album/')
                .query({user: user, albumName: albumName})
                .end( (err, res) => {
                    chai.expect(res).to.have.status(201);
                    done();
                });
        });
    });
    // Read
    describe("GET", function () {
        it("returns 404 NOT FOUND for an album that does not exist")
        it("returns album properties for a known album", (done) => {
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
    // Update
    describe("PUT", function () {
        it("returns 200 OK if all album properties are updated successfully", (done) => {
            chai.request(app)
                .put(`/api/album/${albumId}`)
                .query({albumName: albumName, template: template, view: view})
                .end( (err, res) => {
                    chai.expect(res).to.have.status(200);
                    done();
                });
        });
        it("returns 404 NOT FOUND if an update is attempted on a nonexistent album");
    });
    describe("PATCH", function () {
        it("returns 200 OK if a single album property is updated successfully", (done) => {
            chai.request(app)
                .patch(`/api/album/${albumId}`)
                .query({albumName: albumName_1})
                .end( (err, res) => {
                    chai.expect(res).to.have.status(200);
                    done();
                });
        });
        it("returns 200 OK if two album properties are updated successfully", (done) => {
            chai.request(app)
                .patch(`/api/album/${albumId}`)
                .query({template: template_1, view: view_1})
                .end( (err, res) => {
                    chai.expect(res).to.have.status(200);
                    done();
                });
        });
        it("returns 200 OK if three album properties are updated successfully", (done) => {
            chai.request(app)
                .patch(`/api/album/${albumId}`)
                .query({albumName: albumName, template: template, view: view})
                .end( (err, res) => {
                    chai.expect(res).to.have.status(200);
                    done();
                });
        });
        it("returns 404 NOT FOUND if an update is attempted on a nonexistent album", (done) => {
            chai.request(app)
                .patch(`/api/album/${albumId_1}`)
                .query({albumName: albumName, template: template, view: view})
                .end( (err, res) => {
                    chai.expect(res).to.have.status(404);
                    done();
                });
        });
    });
    // Delete
    describe("DELETE", function () {
        it("returns 200 OK if an album is successfully deleted");
    });
});
// album page tests
describe("/api/album/{albumId}/", function () {
    // Create
    describe("POST", function () {
        it("returns 201 CREATED if an album page is created successfully");
    });
    // Read
    describe("GET", function () {
        it("returns an album page object for a known album page");
        it("returns 404 NOT FOUND for an album page that is out of range");
    });
    // Update
    describe("PATCH", function () {
        it("returns 200 OK if an album page property is updated successfully");
    });
    describe("PUT", function () {
        it("returns 200 OK if an album page is updated successfully");
    });
    // Delete
    describe("DELETE", function () {
        it("returns 200 OK if an album page is deleted successfully");
    });
});