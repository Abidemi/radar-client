# RaDaR Client

[![Build Status](https://img.shields.io/travis/renalreg/radar-client/master.svg)](https://travis-ci.org/renalreg/radar-client) [![Coveralls](https://img.shields.io/coveralls/renalreg/radar-client.svg)](https://coveralls.io/github/renalreg/radar-client)

[![Sauce Test Status](https://saucelabs.com/browser-matrix/radar.svg)](https://saucelabs.com/u/radar)

## Build

### Development

During development you will probably want to run `gulp watch`. This will build
a development version of the application and watch for any changes to the
source code. You can use `gulp build` if you just want to build a development
version without watching for changes afterwards.

The terminal output will show any JavaScript lint errors. You can also check for
lint errors using `gulp lint`.

### Distribution

You can build a distribution version of the application using `gulp build:dist`.
This builds an optimised version of the application in the `dist` folder. Source
files are concatenated and minified.

## Deploy

Build a `.tar.gz`:

```
./build.sh
```

Deploy to servers:

```
virtualenv venv
source venv/bin/activate
pip install fabric

fab -H nww.radar.nhs.uk -u root deploy
```

The `--gateway` option is useful for tunneling through another server.

## Gulp Tasks

* `clean` - delete built files
* `build` - build the application for development
* `build:dist` - build the application for distribution
* `watch` - build the application and watch for changes
* `lint` - lint the JavaScript files
* `test` - run the tests
* `coverage` - run the tests and produce a coverage report
