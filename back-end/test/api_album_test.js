// libraries/imports
var assert = require('assert');
const chai = require('chai');
var chaiHttp = require('chai-http');
const app = require('../server');
chai.use(chaiHttp);

// variables
const user              = 'test_user';      // A valid user
const validAlbumId      = 'test_album';     // A valid album ID
const invalidAlbumId    = '12345';          // an invalid album ID
const albumName         = 'test_album';     // A valid album name
const albumName_1       = 't3st_4lbum';     // A second valid album name
const albumPage         = 0;                // A valid album page
const albumPage_1       = 25565;            // an invalid album page
const template          = 0;                // A valid template
const template_1        = 1;                // A second valid template
const view              = 'preview';        // A valid view
const view_1            = 'page';           // A second valid view

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
        it("returns 404 NOT FOUND for an album that does not exist", (done) => {
            chai.request(app)
                .get(`/api/album/${albumName_1}`)
                .query({user: user})
                .end ( (err, res) => {
                    chai.expect(res).to.have.status(404);
                    chai.expect(res.body).to.be.empty;
                    done();
                });
        });
        it("returns album properties for a known album", (done) => {
            chai.request(app)
                .get('/api/album/un')
                .query({user: user})
                .end( (err, res) => {
                    chai.expect(res).to.have.status(201);
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
                .put(`/api/album/${validAlbumId}`)
                .query({user: user, albumName: albumName, template: template, view: view})
                .end( (err, res) => {
                    chai.expect(res).to.have.status(200);
                    chai.expect(res.body).to.be.empty;
                    done();
                });
        });
        it("returns 404 NOT FOUND if an update is attempted on a nonexistent album", (done) => {
            chai.request(app)
                .put(`/api/album/${invalidAlbumId}`)
                .query({user: user, albumName: albumName, template: template, view: view})
                .end( (err, res) => {
                    chai.expect(res).to.have.status(404);
                    chai.expect(res.body).to.be.empty;
                });
        });
    });
    describe("PATCH", function () {
        it("returns 200 OK if a single album property is updated successfully", (done) => {
            chai.request(app)
                .patch(`/api/album/${validAlbumId}`)
                .query({user: user, albumName: albumName_1})
                .end( (err, res) => {
                    chai.expect(res).to.have.status(200);
                    done();
                });
        });
        it("returns 200 OK if two album properties are updated successfully", (done) => {
            chai.request(app)
                .patch(`/api/album/${validAlbumId}`)
                .query({user: user, template: template_1, view: view_1})
                .end( (err, res) => {
                    chai.expect(res).to.have.status(200);
                    done();
                });
        });
        it("returns 200 OK if three album properties are updated successfully", (done) => {
            chai.request(app)
                .patch(`/api/album/${validAlbumId}`)
                .query({user: user, albumName: albumName, template: template, view: view})
                .end( (err, res) => {
                    chai.expect(res).to.have.status(200);
                    done();
                });
        });
        it("returns 404 NOT FOUND if an update is attempted on a nonexistent album", (done) => {
            chai.request(app)
                .patch(`/api/album/${invalidAlbumId}`)
                .query({user: user, albumName: albumName, template: template, view: view})
                .end( (err, res) => {
                    chai.expect(res).to.have.status(404);
                    done();
                });
        });
    });
    // Delete
    describe("DELETE", function () {
        it("returns 204 NO CONTENT if an album is successfully deleted", (done) => {
            chai.request(app)
                .delete(`/api/album/${validAlbumId}`)
                .query({user: user})
                .end( (err, res) => {
                    chai.expect(res).to.have.status(204);
                })
        });
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
        it("returns an album page object for a known album page", (done) =>{
            chai.request(app)
                .get(`/api/album/${validAlbumId}/${albumPage}`)
                .end((err, res) => {
                    chai.expect(res).to.have.status(200);
                    chai.expect(res).to.not.be.empty;
                    done();
                });
        });
        it("returns 404 NOT FOUND for an album page that is out of range", (done) =>{
            chai.request(app)
                .get(`/api/album/${validAlbumId}/${albumPage_1}`)
                .end((err, res) => {
                    chai.expect(res).to.have.status(404);
                    done();
                });
        });
    });
    // Update
    describe("PATCH", function () {
        it("returns 200 OK if an album page property is updated successfully", (done) => {
            chai.request(app)
                .patch(`/api/album/${validAlbumId}/${albumPage}`)
                .query({user: user, template: template_1})
                .end((err, res) => {
                    chai.expect(res).to.have.status(204);
                    done();
                });
        });
    });
    describe("PUT", function () {
        it("returns 200 OK if an album page is updated successfully");
    });
    // Delete
    describe("DELETE", function () {
        it("returns 200 OK if an album page is deleted successfully");
    });
});