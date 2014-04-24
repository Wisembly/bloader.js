(function () {
    describe('Bloader.js', function () {
        describe('Instanciation', function () {
            it('should expose the loader into the window object', function () {
                expect(typeof window.Bloader).toBe('object');
                expect(typeof window.Bloader.progress).toBe('function');
            });
        });
    });
}());
