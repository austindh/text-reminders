Text Reminders
==============

BYU CS 360 group project. Using Twilio API to send text message reminders.

### Getting Started ###
Install `bower` and `gulp` (using the `-g` flags installs them globally):

```bash
$ npm install -g bower
$ npm install -g gulp
```
### Installing Dependencies ###
`bower` is used to install front end dependencies, and `npm` is used to install back end ones.

```bash
$ npm install && bower install
```
What is installed is defined in package.json and bower.json. Whenever you install a new npm module, be sure to use
the `--save` flag so it gets added to package.json.  Similarly for frontend dependencies, use the `--save` flag
with bower to add new dependencies to bower.json.

Example:
```bash
$ npm install --save node-schedule
$ bower install --save angular
```

### CSS ###
We'll use SCSS, which is a pre-compiler for CSS.  To compile CSS once, run:
```bash
$ gulp css
```
This will compile all SCSS in the scss/ folder. In addition, all SCSS files will be concatenated into just one CSS file
(site.css), and browser prefixes will be automatically added.

Running
```bash
$ gulp watch
```
will place a watch on the scss/ folder, and will automatically run `gulp css` whenever there's a change saved to the
scss/ folder.

All gulp functions are defined in `gulpfile.js`

### Running the App ###
To run the server, use
```bash
$ node app
```
This will start the server running locally on port 8080. Open a browser and go to `localhost:8080`, which will load our
index.html file from our public folder.  This was specified in our main file (`app.js`), with the line:
```javascript
app.use( '/', express.static( 'public' ) );
```

You can pass in an optional parameter to specify a different
port if you want.
```bash
$ node app 3000
```
will start the server running on port 3000 instead.
