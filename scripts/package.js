#! /usr/bin/env node

const fs = require('fs');
const exec = require('child_process').exec;
const jsonfile = require('jsonfile');
const manifestFile = 'manifest.json';
const rmdirSync = require('fs-extra').removeSync;

fs.readFile(manifestFile, 'UTF-8', (err, data) => {
    if (err) {
        console.log('Error!', err);
    }
    const manifest = JSON.parse(data);
    const fileList = [
        '_locales/**/*',
        'src/options/**/*',
        'src/options/*'
    ];

    if (process.env.CIRCLE_BUILD_NUM) {
        manifest.version = manifest.version + '.' + process.env.CIRCLE_BUILD_NUM;
    }

    jsonfile.writeFile('dist/' + manifestFile, manifest);

    fileList.push(manifest.options_page);
    fileList.push(manifest.browser_action.default_popup);

    manifest.content_scripts.forEach((scripts) => {
        (scripts.css.concat(scripts.js)).forEach((file) => {
            fileList.push(file);
        });
    });

    manifest.background.scripts.forEach((file) => {
        fileList.push(file);
    });

    manifest.web_accessible_resources.forEach((file) => {
        fileList.push(file);
    });

    const zipFile = 'dist/' + packageName(manifest) + '.zip';
    fileList.unshift(zipFile);

    zipPackage(fileList, zipFile)
        .then(() => makeUnzippedDirectory(zipFile, manifest))
        .catch((error) => console.log(error));
});

const zipPackage = (fileList, zipFile) => {
    return new Promise((resolve, reject) => {
        exec('zip ' + fileList.join(' ') + ' && zip -j ' + zipFile + ' dist/manifest.json', (error, stdout, stderr) => {
            if (error) {
                reject('Error zipping into "dist" directory!', stdout, stderr);
            } else {
                resolve()
            }
        });
    }).catch((error) => {
        console.log(error);
    });
};

const makeUnzippedDirectory = (zipFile, manifest) => {
    makeZipDirectory(manifest);
    exec(`unzip ${zipFile} -d dist/${packageName(manifest)}`, (error, stdout, stderr) => {
        if (error) {
            reject('Error unzipping for reference into dist/!', error, stderr);
        }
    });
};

const makeZipDirectory = manifest => {
    if (fs.existsSync(`dist/${packageName(manifest)}`)) {
        rmdirSync(`dist/${packageName(manifest)}`)
    }

    fs.mkdirSync(`dist/${packageName(manifest)}`);
};

const packageName = manifest => {
    return `${manifest.short_name}-${manifest.version}`
};
