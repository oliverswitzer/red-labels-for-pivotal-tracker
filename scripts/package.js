#! /usr/bin/env node

var fs = require('fs');
var exec = require('child_process').exec;
var jsonfile = require('jsonfile');

var manifestFile = 'manifest.json';

fs.readFile(manifestFile, 'UTF-8', function (err, data) {
    if (err) {
        console.log('Error!', err);
    }
    var manifest = JSON.parse(data);
    var fileList = [
        '_locales/**/*',
        'icons/*',
        'src/options/**/*'
    ];

    if(process.env.CIRCLE_BUILD_NUM) {
        manifest.version = manifest.version + '.' + process.env.CIRCLE_BUILD_NUM;
    }

    jsonfile.writeFile('dist/' + manifestFile, manifest);

    fileList.push(manifest.options_page);
    fileList.push(manifest.browser_action.default_popup);
    fileList.push('src/options/index.js');

    manifest.content_scripts.forEach(function (scripts) {
        (scripts.css.concat(scripts.js)).forEach(function (file) {
            fileList.push(file);
        });
    });

    manifest.background.scripts.forEach(function (file) {
        fileList.push(file);
    });

    var zipFile = 'dist/' + manifest.short_name + '-' + manifest.version + '.zip';
    fileList.unshift(zipFile);
    var cmd = 'zip ' + fileList.join(' ') + ' && zip -j ' + zipFile + ' dist/manifest.json';

    exec(cmd, function(error, stdout, stderr) {
        if (error) {
            console.log('Error!', error, stderr);
        } else {
            console.log('All good! Chrome extension packaged into\n', zipFile);
        }
    });
});