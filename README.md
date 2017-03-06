# What We Learned This Week for Pivotal Tracker

This plugin helps users keep track of what they learned while working on stories in the backlog. It prompts the user for
optional feedback on what they learned for every story that they complete.

## License

ISC License (included in the `LICENSE` file).

## Running the tests

```
$ npm run test
```

or to run continually you'll need to install Karma
```
$ npm install -g karma-cli
```
and to run:
```
$ karma start
```

---

## Building and Deploying

For first time building locally, you'll need two files: `.env` and `production.env`. The `.env` file holds the development secrets. You can reference `template.env` to see an example of what these two files should contain for our secrets (both should have the same keys).

To build a new version, you'll want to bump the `version` and `version_name` in `manifest.json`.
Then run:

```$xslt
$ npm run package
```

This runs webpack and then creates a .zip file in the dist/ directory using `scripts/package.js`. Zipped files include 
your `manifest.json`, `content_scripts`, `background.scripts`, and `options_page`.

## Development

Before you load your chrome extension into the browser, make sure that you run:

```$xslt
$ npm run weback
```

or to run it to continually watch/package changes:

```
$ npm run watch
```