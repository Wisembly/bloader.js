(function () {
    // Since we're in a node environment, the window object isn't available
    window = {};

    var expect = require('expect.js'),
        sinon = require('sinon'),
        bloader = require('../bloader');

    describe('Bloader.js', function () {
        describe('Instanciation', function () {
            it('should expose the loader into the window object', function () {
                expect(true).to.be(true);
                expect(window.Bloader).to.be.an('object');
                expect(window.Bloader.progress).to.be.a('function');
            });
        });
    });
}());
