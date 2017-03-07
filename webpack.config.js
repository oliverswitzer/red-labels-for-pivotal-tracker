const Dotenv = require('dotenv-webpack');

module.exports = {
    plugins: [
        new Dotenv()
    ],
    entry: {
        pivotal_tracker_content_scripts: './src/content_scripts/pivotal_tracker/main.js',
        gmail_content_scripts: './src/content_scripts/gmail/main.js',
        background_scripts: './src/background/main.js'
    },
    output: {
        path: `${__dirname}/dist/bundles/`,
        filename: '[name].bundle.js'
    },
    module: {
        loaders: [
            { test: /\.css$/, loader: "style!css" }
        ]
    }
};