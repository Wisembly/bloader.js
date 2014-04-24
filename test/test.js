(function () {
    describe('Bloader.js', function () {
        describe('Instanciation', function () {
            it('should expose the loader into the window object', function () {
                expect(window.Bloader).to.be.an('object');
                expect(window.Bloader.progress).to.be.a('function');
                expect(window.Bloader.getInstance).to.be.a('function');
            });
        });

        describe('Get instance', function () {
            var bloader, setAttributeSpy;

            before(function () {
                setAttributeSpy = sinon.spy();
                document.getElementById = function () {
                    return {
                        style: {},
                        setAttribute: setAttributeSpy
                    };
                };

                bloader = window.Bloader.getInstance('tests:bloader');
            });

            it('should have the proper methods exposed', function () {
                expect(bloader.start).to.be.a('function');
                expect(bloader.complete).to.be.a('function');
                expect(bloader.set).to.be.a('function');
                expect(bloader.getStatus).to.be.a('function');
                expect(bloader.getProgress).to.be.a('function');
            });

            it('should have a clear instance', function () {
                expect(bloader).to.be.an('object');
                expect(bloader.getProgress()).to.be(0);
                expect(bloader.getStatus()).to.be(null);
            });

            it('should start the loader and make sure it\'s started and increasing', function (done) {
                bloader.start();
                expect(bloader.getStatus()).to.be('started');

                expect(setAttributeSpy.callCount).to.be(1);
                expect(setAttributeSpy.calledWith('data-status', 'started')).to.be(true);

                var currentProgress = bloader.getProgress();
                expect(currentProgress).to.greaterThan(1);

                setTimeout(function () {
                    expect(bloader.getProgress()).to.be.greaterThan(currentProgress);
                    done();
                }, 500);
            });

            it('should get another instance and make sure it\'s a new one', function () {
                var _bloader = window.Bloader.getInstance('tests:_bloader');
                expect(_bloader.getProgress()).to.be.lessThan(bloader.getProgress());
                expect(_bloader.getProgress()).to.be(0);
                expect(_bloader.getStatus()).to.be(null);
            });

            it('should get the same instance', function () {
                var _bloader = window.Bloader.getInstance('tests:bloader');
                expect(_bloader.getProgress()).to.be(bloader.getProgress());
                expect(_bloader.getStatus()).to.be(bloader.getStatus());
            });

            it('should complete the loader', function () {
                bloader.complete();
                expect(bloader.getProgress()).to.be(100);
                expect(bloader.getStatus()).to.be('completed');

                expect(setAttributeSpy.callCount).to.be(2);
                expect(setAttributeSpy.calledWith('data-status', 'completed')).to.be(true);
            });

            it('should make sure the loading bar goes to "ended"', function (done) {
                setTimeout(function () {
                    expect(bloader.getProgress()).to.be(0);
                    expect(bloader.getStatus()).to.be('ended');

                    expect(setAttributeSpy.callCount).to.be(3);
                    expect(setAttributeSpy.calledWith('data-status', 'ended')).to.be(true);

                    done();
                }, 1000);
            });
        });
    });
}());
