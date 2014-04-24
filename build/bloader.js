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

    Bloader.instances = {};

    /**
     * Sets an instance
     * Not exposed to the user
     *
     * @param {String} namespace
     * @param {Object} instance
     *
     * @return {Object} instance
     */
    var _setInstance = function (namespace, instance) {
        Bloader.instances[namespace] = instance;

        return instance;
    };

    /**
     * Gets an instance
     * If the requested instance doesn't exist, it creates a new one
     *
     * @param  {String} namespace
     * @return {Object} instance
     */
    Bloader.getInstance = function (namespace) {
        if (Bloader.instances[namespace])
            return Bloader.instances[namespace];

        return _setInstance(namespace, new Bloader.progress());
    };

    Bloader.progress = function () {
        var _start,
            _complete,
            _set,
            _increment,
            _hasStarted,
            _setStatus,
            _el,
            _progress = 0,
            _status,
            _timeout;

        /**
         * Starts the loading bar
         */
        _start = function () {
            // Append the bar in the DOM?
            if (_hasStarted())
                return;
            _el = document.getElementById('loading-bar');
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
                return 0;

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
            if (!_hasStarted() && 0 !== progress)
                return 0;

            progress = +progress || 0;

            // if (progress > _progress) {
                _progress = progress;
            // }

            _el.style.width = _progress + '%';

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
                return 0;

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
         *            It stays to `completed` for 1000 milliseconds before going back to null
         *
         * @return {String} current status
         */
        _setStatus = function (status) {
            status = status || null;
            _status = status;
            _el.setAttribute('data-status', _status);
            if ('completed' === status)
                setTimeout(function () {
                    _setStatus('ended');
                }, 1000);
            if ('ended' === status)
                _set(0);

            return _status;
        };

        return {
            start: _start,
            complete: _complete,
            set: _set
        };
    };
}());
