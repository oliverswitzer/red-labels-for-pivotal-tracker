# What We Learned This Week for Pivotal Tracker

This chrome extension helps users keep track of what they learned while working on stories in the backlog. It prompts the user for
optional feedback on what they learned for every story that they complete.

## License

ISC License (included in the `LICENSE` file).

---

## Development setup

For first time building locally, you'll need two files: `.env` and `production.env`. 

The `.env` file holds the development secrets. You can reference `template.env` to see an example of what these two files should contain for our secrets (both should have the same keys).

**Build dependencies**:
```
$ yarn install
```

You will need selenium standalone to run feature tests

```
$ yarn global add selenium-standalone
```


## Running the tests

In a separate terminal, start a selenium server for the feature tests to use:

```
$ selenium-standalone start
```

```
$ yarn test
```

or to run only feature tests
 
```
$ yarn feature-tests
```

---

## Building and Deploying

To build a new version, you'll want to bump the `version` and `version_name` in `manifest.json`.
Then run:

```
$ yarn package
```

This runs webpack and then creates a .zip file in the dist/ directory using `scripts/package.js`. Zipped files include 
your `manifest.json`, `content_scripts`, `background.scripts`, and `options_page`.

## Development

Before you load your chrome extension into the browser, make sure that you run:

```$xslt
$ yarn weback
```

or to run it to continually watch/package changes:

```
$ yarn watch
```

This will also continually package the extension under `dist/`
