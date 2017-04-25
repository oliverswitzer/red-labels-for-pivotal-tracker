const Dotenv = require('dotenv-webpack');
const WebpackShellPlugin = require('webpack-shell-plugin');

module.exports = {
    plugins: [
        new Dotenv(),
        new WebpackShellPlugin({onBuildExit:['./scripts/package.js']})
    ],
    entry: {
        pivotal_tracker_content_scripts: './src/content_scripts/pivotal_tracker/main.js',
        gmail_content_scripts: './src/content_scripts/gmail/main.js',
        background_scripts: './src/background/main.js',
        options_page: './src/options/main.jsx'
    },
    output: {
        path: `${__dirname}/dist/bundles/`,
        filename: '[name].bundle.js'
    },
    module: {
        rules: [
            {
                test: /.jsx?$/,
                exclude: /node_modules/,
                use: {
                  loader: 'babel-loader',
                  options:{
                    presets: ['es2015', 'react']
                  }
                }
            }
        ]
    }
};
