#! /usr/bin/env node

var fsPromise = require('fs-promise');

resetDotEnvFileForDevelopment();

function resetDotEnvFileForDevelopment() {
    fsPromise.rename('.env', 'production.env')
        .then(function () {
            return fsPromise.rename('development.env', '.env');
        })
}

