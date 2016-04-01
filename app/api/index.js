//Routes requiring authentication
var express = require( 'express' );
var router = express.Router();



router.post( '/test', function( req, res ) {
	console.log("Authenticated User: ");
	console.log(req.user);
	
	res.writeHead( 200, { 'Content-Type': 'text/plain' } );
	res.end( JSON.stringify( req.user ) );


});

module.exports = router;