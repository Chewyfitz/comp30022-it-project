var assert = require('assert');
describe("/api/image/", function () {
    describe("POST", function () {
        it("returns success if a URL is added successfully");
        it("returns success if a file is uploaded successfully");
        it("returns 400 BAD REQUEST if ?user={userId} is not specified");
        it("returns 400 BAD REQUEST if ?image={URL} is not specified and an image is not supplied");
        it("returns 400 BAD REQUEST if an image is not supplied and ?image={url} is not specified");
    });
    describe("GET", function () {
        it("returns an image URL for an /{imageId}/view that exists");
        it("returns an image object for a /{imageId} that exists");
        it("returns 404 for an image that does not exist");
    });
    describe("DELETE", function() {
        it("returns 200 OK for a successfully deleted image");
        it("returns 404 NOT FOUND for an invalid image id");
    })
});