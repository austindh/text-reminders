var accountSID = require( '../../config/twilio' ).TWILIO_SID;
var authToken = require( '../../config/twilio' ).TWILIO_AUTH_TOKEN;
var twilioNumber = require( '../../config/twilio' ).TWILIO_PHONE_NUM;

var client = require( 'twilio' )( accountSID, authToken );

module.exports = {

	/**
	 *	Send a text message to the given phone number
	 */
	sendMessage: function( message, number, callback ) {

		client.messages.create({
			to: number,
			from: twilioNumber,
			body: message,
		}, function( err, message ) {
			callback( err, message );
		});

	}

};
