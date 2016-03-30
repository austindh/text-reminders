//Routes requiring no authentication
var express = require( 'express' );
var router = express.Router();
var twilio = require( '../texting' );
var User = require('../models/users')
var bcrypt = require('bcryptjs');

var CODES = {};

function getRandomInt( min, max ) {
	return Math.floor( Math.random() * ( max - min + 1 ) ) + min;
}

router.post( '/verificationCode', function( req, res ) {

	var phoneNumber = req.body.number;

	//Get code to text back and save in object
	var code = getRandomInt( 100000, 999999 ); //Random 6 digit number
	CODES[phoneNumber] = code;

	//Expire code after 5 minutes
	setTimeout( function() {
		if ( CODES[phoneNumber] === code ) { //to check that it hasn't been replaced with a new code
			delete CODES[phoneNumber];
		}
	}, 5 * 1000 * 60 );

	var message = 'Your verification code is: ' + code;
	console.log( 'message: ', message );

	twilio.sendMessage( message, phoneNumber, function( err, data ) {

		if ( err ) {
			console.log( 'err: ', err );
			console.log( 'data: ', data );
		}

		res.writeHead( 200, { 'Content-Type': 'text/plain' } );
		res.end( JSON.stringify( data ) );

	});

});

router.post( '/signUp', function( req, res ) {

	console.log(req.body);
	var phoneNumber = req.body.phoneNumber;
	var verificationCode = parseInt( req.body.verificationCode );

	if ( CODES[phoneNumber] === verificationCode ) {
		//res.writeHead( 200, { 'Content-Type': 'text/plain' } );
		//res.end( 'OK' );
	} else {
		res.writeHead( 403, { 'Content-Type': 'text/plain' } );
		res.end( 'Invalid verification code!' );
		return;
	}
	
	var password = req.body.password;
	bcrypt.genSalt(10, function(err, salt) {
    	bcrypt.hash(password, salt, function(err, hash) {
        	// Store hash in your password DB.
			//Save hash to the database in the User collection

			var newUser = new User({username: phoneNumber, password: hash});
			newUser.save(function(err,post)
			{
				if (err)
				{
					res.writeHead(500, {'Content-Type': 'text/plain'})
					res.end('Server Database Error');
					return console.log('error in saving to database');
				}
				console.log("GOT HERE");
	
				res.writeHead(200, {'Content-Type': 'text/plain'});
				res.end("OK");
			});
		}); 
    });

});

module.exports = router;
