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
     * @param  {Object} config
     * @return {Object} instance
     */
    Bloader.getInstance = function (namespace, config) {
        config = config || {};

        if (Bloader.instances[namespace])
            return Bloader.instances[namespace];

        return _setInstance(namespace, new Bloader.progress(config));
    };

    Bloader.progress = function (config) {
        var _start,
            _complete,
            _set,
            _increment,
            _getProgress,
            _hasStarted,
            _setStatus,
            _getStatus,
            _setConfig,
            _getConfig,
            _el,
            _config = {},
            _progress = 0,
            _status = null,
            _timeout;

        /**
         * Starts the loading bar
         */
        _start = function () {
            // Append the bar in the DOM?
            if (_hasStarted())
                return;
            _el = document.getElementById(_config.el);
            if (!_el)
                return;
            _setStatus('started');
            _set(1);
            if (_config.autoIncrement)
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
         * Returns the current progress
         *
         * @return {Number} _progress
         */
        _getProgress = function () {
            return _progress;
        };

        /**
         * Sets a new config
         *
         * el            {String}   id of the loading bar
         * statusEl      {String}   id of the element you want the statuses on
         * autoIncrement {Boolean}  auto increments the loading bar
         *
         * @param {Object} config
         */
        _setConfig = function (config) {
            config = config || {};
            config = {
                el: config.el || 'loading-bar',
                statusEl: config.statusEl || 'loading-bar',
                autoIncrement: false !== config.autoIncrement
            };

            _config = config;
            return _config;
        };

        /**
         * Returns the current config
         *
         * @return {Object} config
         */
        _getConfig = function () {
            return _config;
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
         * null       Nothing happened yet
         * started    The progress bar is on its way
         * completed  The progress bar has just ended
         *            It stays to `completed` for 1000 milliseconds before going to ended
         * ended      The progress bar has ended and nothing is happening
         *
         * @return {String} current status
         */
        _setStatus = function (status) {
            status = status || null;
            _status = status;
            var el = document.getElementById(_config.statusEl);
            if (el)
                el.setAttribute('data-status', _status);
            if ('completed' === status)
                setTimeout(function () {
                    _setStatus('ended');
                }, 1000);
            if ('ended' === status)
                _set(0);

            return _status;
        };

        /**
         * Returns the current status
         *
         * @return {String} _status
         */
        _getStatus = function () {
            return _status;
        };

        // Sets the config and its defaults
        _config = _setConfig(config);

        return {
            start: _start,
            complete: _complete,
            set: _set,
            getProgress: _getProgress,
            getStatus: _getStatus,
            setConfig: _setConfig,
            getConfig: _getConfig
        };
    };
}());
