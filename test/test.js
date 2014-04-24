(function () {
    describe('Bloader.js', function () {
        describe('Instanciation', function () {
            it('should expose the loader into the window object', function () {
                expect(window.Bloader).to.be.an('object');
                expect(window.Bloader.progress).to.be.a('function');
            });
        });
    });
}());
