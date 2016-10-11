
# PREREQUISITES

NodeJS V6.3.0

Linux: `apt-get install libnotify-bin` <br />
Mac OS: `brew install terminal-notifier`


# INSTALLATION

install node modules

`npm i`

# RUN

`npm start`

will start a live reloading webpack dev server on the port mentioned in the config of the package.json.

Default port = 4000

# PACKAGE

`npm run clean && npm run build`

will clean the previous build and make a new one inside `/build`

after having ran the build, we can check it by running `npm run start:prod`. This will run a server against the production build.

# METHODS & TECHNIQUES

 * front end build through [WebPack](https://webpack.github.io/)
 * all styling is done with [Sass](http://sass-lang.com/)
 * css methodology: [BEM](http://getbem.com/introduction/)
 * please respect [Sass Guidelines](http://sass-guidelin.es/)
 * unit tests with [KarmaJS](https://karma-runner.github.io) and [JasmineJS](http://jasmine.github.io/)
 * end to end tests with [WebDriverIO](http://webdriver.io/)
