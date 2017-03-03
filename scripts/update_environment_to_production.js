#! /usr/bin/env node

var fs = require('fs');
var fsPromise = require('fs-promise');

useDotEnvFileForProduction();

function useDotEnvFileForProduction() {
    printDotEnvFileContents();

    fsPromise.rename('.env', 'development.env')
        .then(function () {
            return fsPromise.rename('production.env', '.env');
        })
        .then(function () {
            printDotEnvFileContents();
        });
}

function printDotEnvFileContents() {
    fs.readFile('.env', 'utf8', (err, dotEnvFileContents) => {
        if (err) throw err;
    });
}
