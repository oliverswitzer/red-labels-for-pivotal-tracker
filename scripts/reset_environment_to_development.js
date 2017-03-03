#! /usr/bin/env node

var fs = require('fs');
var fsPromise = require('fs-promise');

resetDotEnvFileForDevelopment();

function resetDotEnvFileForDevelopment() {
    printDotEnvFileContents();

    fsPromise.rename('.env', 'production.env')
        .then(function () {
            return fsPromise.rename('development.env', '.env');
        })
        .then(function () {
            printDotEnvFileContents();
        });
}

function printDotEnvFileContents() {
    fs.readFile('.env', 'utf8', (err, dotEnvFileContents) => {
        if (err) throw err;
        console.log(dotEnvFileContents);
    });
}
