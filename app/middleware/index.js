//Middleware to be inserted before requests (e.g. authentication, etc.)



//Use this to verify hash
// Load hash from mongo. 
//bcrypt.compare(password, hash, function(err, res) {
    //if ( res == true) 
//});
// jwt-auth.js
module.exports = function() {

   var jwt = require( 'jsonwebtoken' );
   var secret = require( '../../config/jwt' ).secret;
   var bcrypt = require('bcryptjs');
   var User = require('../models/users');
   var Reminder = require('../models/reminders');

   return function(req, res, next) {

       console.log( 'req.url: ', req.url );
       if ( req.url === '/authenticate' || 
	   			req.url === '/signUp' || 
	   			req.url === '/verificationCode' ) 
	   {
		   console.log("Public URL")
           return next();
       }

       // check header or URL params or POST for token
       var token = req.body.token || req.query.token || req.headers['x-access-token'];

       if ( !token ) {
           return res.status( 403 ).send({
               success: false,
               message: 'No token provided.'
           });
       }

       jwt.verify( token, secret, function( err, decoded ) {
           if ( err ) {
               return res.status( 403 ).json({
                   success: false,
                   message: 'Failed to authenticate token.'
               });
           }

           // if everything is good, save to request for use in other routes
		   User
		   .findOne({ username: decoded.userID})
		   .populate('reminders')
		   .exec(function (err, user) {

		     if (err) 
			 {
                 return res.status( 403 ).json({
                     success: false,
                     message: 'Failed to authenticate token.'
                 });
			 }
		     req.user = user
			 next();
		   });
       });

   };

};
