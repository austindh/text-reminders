//Routes requiring no authentication
var express = require( 'express' );
var router = express.Router();
var twilio = require( '../texting' );

router.post( '/verificationCode', function( req, res ) {

	var phoneNumber = req.body.number;

	var code = '123456'; //This should be replaced with some kind of random number generator
						 //and saved in the database to check when they enter the number back in...
						 //probably add expiration date to this code as well

	console.log( 'phoneNumber: ', phoneNumber );

	twilio.sendMessage( code, phoneNumber, function( err, data ) {

		if ( err ) {
			console.log( 'err: ', err );
			console.log( 'data: ', data );
		}

		res.writeHead( 200, { 'Content-Type': 'text/plain' } );
		res.end( JSON.stringify( data ) );

	});

});

module.exports = router;
