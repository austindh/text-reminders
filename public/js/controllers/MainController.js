app.controller( 'MainController', [ '$scope', '$http', function( $scope, $http ) {

	$scope.loginStep = 1;

	//Send verification code for new account
	$scope.sendCode = function() {
//		console.log( 'sendCode called!' );
		$http.post( 'api/verificationCode', { number: '1' + $scope.phoneNumber } )
			.then( function( data ) {
				console.log( 'data: ', data );
			});
		$scope.loginStep = 2;
	};

	$scope.signUp = function() {

		$http.post( 'api/signUp', { phoneNumber: '1' + $scope.phoneNumber, verificationCode: $scope.verificationCode,
		password: $scope.password} )
			.then( function( data ) {
				console.log( 'data: ', data );
			}, function( err ) {
				console.log( 'err: ', err );
			});

	};

} ]);
