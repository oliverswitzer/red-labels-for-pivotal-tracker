#! /usr/bin/env node

var fsPromise = require('fs-promise');

useDotEnvFileForProduction();

function useDotEnvFileForProduction() {
    fsPromise.rename('.env', 'development.env')
        .then(function () {
            return fsPromise.rename('production.env', '.env');
        })
}
