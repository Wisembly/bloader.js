/**
 * bloader
 *
 * Creates a loading bar
 *
 * (c) 2014 Wisembly
 * License: MIT
 */

(function () {
    'use strict';

    var Bloader = window.Bloader = {};

    Bloader.progress = function () {
        var _start,
            _complete,
            _set,
            _increment,
            _hasStarted,
            _setStatus,
            _progress,
            _status,
            _timeout;

        /**
         * Starts the loading bar
         */
        _start = function () {
            // Append the bar in the DOM?
            if (_hasStarted())
                return;
            _setStatus('started');
            _set(1);
            _increment();
        };

        /**
         * Completes the loading bar
         * To be triggered when the load is done
         *
         * @return {Number} _progress
         */
        _complete = function () {
            if (!_hasStarted())
                return;

            _set(100);
            _setStatus('completed');

            return _progress;
        };

        /**
         * Sets the loading bar progress
         * Only if it's higher than the current progress
         *
         * @return {Number} _progress
         */
        _set = function (progress) {
            console.log('Set: ' + progress + '%');
            if (!_hasStarted())
                return 0;

            progress = +progress || 0;

            // if (progress > _progress) {
                _progress = progress;
            // }

            document.getElementById('loading-bar').style.width = _progress + '%';

            return _progress;
        };

        /**
         * Increments the progress so the user always thinks something is happening
         *
         * Credits of the increment calculation goes to angular-loading-bar plugin
         * See: https://github.com/chieffancypants/angular-loading-bar
         *
         * @return {Number} _progress
         */
        _increment = function () {
            if (!_hasStarted())
                return;

            var add = 0;

            if (_progress >= 0 && _progress < 25) {
                // Start out between 3 - 6% increments
                add = (Math.random() * (5 - 3 + 1) + 3);
            } else if (_progress >= 25 && _progress < 65) {
                // increment between 0 - 3%
                add = (Math.random() * 3);
            } else if (_progress >= 65 && _progress < 90) {
                // increment between 0 - 2%
                add = (Math.random() * 2);
            } else if (_progress >= 90 && _progress < 99) {
                // finally, increment it .5 %
                add = 0.5;
            } else {
                // after 99%, don't increment:
                add = 0;
            }

            _set(_progress + add);
            setTimeout(function () {
                _increment();
            }, 250);

            return _progress;
        };

        /**
         * Is the loading bar currently active?
         *
         * @return {Boolean}
         */
        _hasStarted = function () {
            return 'started' === _status;
        };

        /**
         * Sets a new loading status
         *
         * Statuses are:
         *
         * null       Nothing is happening
         * started    The progress bar is on its way
         * completed  The progress bar has just ended
         *            It stays to `completed` for 2000 milliseconds before going back to null
         *
         * @return {String} current status
         */
        _setStatus = function (status) {
            status = status || null;
            // @TODO Set the status in the dom
            _status = status;
            if ('completed' === status)
                setTimeout(_setStatus, 2000);

            return _status;
        };

        return {
            start: _start,
            complete: _complete,
            set: _set
        };
    };
}());
