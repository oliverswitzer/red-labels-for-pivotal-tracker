// Karma configuration
// Generated on Thu Aug 06 2015 23:34:21 GMT-0400 (Eastern Daylight Time)

var webpackConfig = require('./webpack.config');

module.exports = function(config) {
    config.set({
        // base path that will be used to resolve all patterns (eg. files, exclude)
        basePath: '',

        // frameworks to use
        // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
        frameworks: ['jasmine'],

        // list of files / patterns to load in the browser
        files: [
            'vendor/moment/moment.min.js',
            'test/test_helpers.js',
            '**/*_spec.js',
            '**/*_spec.jsx'
        ],

        preprocessors: {
            // add webpack as preprocessor
            '**/*_spec.js': ['webpack', 'sourcemap'],
            '**/*_spec.jsx': ['webpack', 'sourcemap']
        },

        // list of files to exclude
        exclude: [],

        // preprocess matching files before serving them to the browser
        // available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor

        // test results reporter to use
        // possible values: 'dots', 'progress'
        // available reporters: https://npmjs.org/browse/keyword/karma-reporter
        reporters: ['progress'],

        webpack: Object.assign({}, webpackConfig, {
            externals: {
                'react/lib/ExecutionEnvironment': true,
                'react/addons': true,
                'react/lib/ReactContext': 'window'
            }
        }),

        webpackMiddleware: {
            noInfo: true
        },

      // web server port
        port: 9876,


        // enable / disable colors in the output (reporters and logs)
        colors: true,


        // level of logging
        // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
        logLevel: config.LOG_INFO,


        // enable / disable watching file and executing tests whenever any file changes
        autoWatch: true,


        // start these browsers
        // available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
        browsers: ['Chrome'],

        client: {
            captureConsole: false
        }
    })
};