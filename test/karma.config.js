module.exports = function(config) {
  config.set({
    basePath: '../',

    frameworks: ['jasmine', 'detectBrowsers'],

    detectBrowsers: {
      enabled: true,
      usePhantomJS: true
    },

    files: [
        'bloader.js',
        'test/test.js'
    ],

    exclude: [],

    reporters: ['progress'], // or `dots`

    port: 9876,

    colors: true,

    logLevel: config.LOG_INFO,

    autoWatch: false,

    // All the available browsers are launched by detectBrowsers
    // browsers: ['Chrome', 'PhantomJS', 'Firefox', 'Safari', 'IE'],

    singleRun: true
  });
};