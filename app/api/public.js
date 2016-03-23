//Routes requiring no authentication
var express = require( 'express' );
var router = express.Router();
var twilio = require( '../texting' );

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

	twilio.sendMessage( message, phoneNumber, function( err, data ) {

		if ( err ) {
			console.log( 'err: ', err );
			console.log( 'data: ', data );
		}

		res.writeHead( 200, { 'Content-Type': 'text/plain' } );
		res.end( JSON.stringify( data ) );

	});

});

module.exports = router;
