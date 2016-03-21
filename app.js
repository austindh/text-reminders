var express = require( 'express' );
var app = express();
var bodyParser  = require( 'body-parser' );
var jwt = require( 'jsonwebtoken' ); // used to create, sign, and verify tokens
var mongoose = require( 'mongoose' );

app.use( bodyParser.json() );
app.use( '/', express.static( 'public' ) );

var PORT = process.argv[2] || 8080;
//Start server
var server = app.listen( PORT, function() {
	console.log( 'Server running on port ' + PORT );
});

app.use( bodyParser.json() ); //makes parsing requests easier

//Set up public folder for static hosting
app.use( '/', express.static( 'public' ) );

//Connect to database
var database = require( './config/database' );
mongoose.connect( database.url );
mongoose.connection.once( 'open', function() {
	console.log( 'DB Connected!' );
});

//API routes
var api = require( './app/api' );
var publicAPI = require( './app/api/public' );

app.use( '/api', api );
app.use( '/api', publicAPI );
