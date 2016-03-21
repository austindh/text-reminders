app.controller( 'MainController', [ '$scope', '$http', function( $scope, $http ) {

	//Send verification code for new account
	$scope.sendCode = function() {
		console.log( 'sendCode called!' );
		$http.post( 'api/verificationCode', { number: '1' + $scope.phoneNumber } )
			.then( function( data ) {
				console.log( 'data: ', data );
			});
	};

} ]);
