// Karma configuration
// Generated on Thu Aug 06 2015 23:34:21 GMT-0400 (Eastern Daylight Time)

module.exports = function(config) {
    config.set({
        // base path that will be used to resolve all patterns (eg. files, exclude)
        basePath: '',

        // frameworks to use
        // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
        frameworks: ['jasmine'],

        // list of files / patterns to load in the browser
        files: [
            'node_modules/moment/min/moment.min.js',
            'src/inject/fetch_wrapper.js',
            'src/inject/story_title_provider.js',
            'src/inject/wwltw_repository.js',
            'src/inject/find_or_create_wwltw_story.js',
            'src/inject/pivotal_tracker_api_client.js',
            'src/inject/project_id_provider.js',
            'src/inject/description_builder.js',
            'src/inject/add_learning_to_story_description.js',
            '**/*_spec.js',
        ],

        // list of files to exclude
        exclude: [],

        // preprocess matching files before serving them to the browser
        // available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor

        // test results reporter to use
        // possible values: 'dots', 'progress'
        // available reporters: https://npmjs.org/browse/keyword/karma-reporter
        reporters: ['progress'],


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


        // Continuous Integration mode
        // if true, Karma captures browsers, runs the tests and exits
    })
};