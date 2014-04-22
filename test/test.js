(function () {
    // Since we're in a node environment, the window object isn't available
    window = {};

    var expect = require('expect.js'),
        sinon = require('sinon'),
        bloader = require('../bloader');

    describe('Bloader.js', function () {
        describe('First test', function () {
            it('should pass', function () {
                expect(true).to.be(true);
                expect(window.Bloader).to.be.an('object');
            });
        });
    });
}());
