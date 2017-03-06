app.controller("indexController",['UserService','$scope','$location','$window',function( $UserService ,  $scope , $location,$window){
	
	$scope.LoginEmail = '';
	$scope.LoginPassword = '';
	
	$scope.InvalidLogin = false;
	$scope.LoginStatus = true;
	
	if( $window.sessionStorage.getItem("currentUser") != null && $window.sessionStorage.getItem("currentUser") != undefined )
	{
		$scope.LoginEmail = $window.sessionStorage.getItem("currentUser");
		
		$scope.LoginStatus = false;

		//alert( $location.path() );
		//alert( $location.path().split('/')[2] );
		
		if( $location.path() == '/' )
			$location.path('/profile');
	}
	
	
	$scope.logout = function()
	{
		$window.sessionStorage.clear();
		$scope.LoginStatus = true;
		
		$location.path('/home');
	}
	
	$scope.Login = function()
	{
		var json = 	{
				"Email" : $scope.LoginEmail ,
				"Password" : $scope.LoginPassword
			};

		console.log(json);
		
		$UserService.UserLogin(json).then(function(response){
			console.log(response);
			
			if( response.msg == 'Invalid Login' )
			{
				$scope.InvalidLogin = true;
				window.setTimeout(function(){
					$scope.$apply( $scope.InvalidLogin = false );					
				}, 5000);
			}	
			else
			{
				$window.sessionStorage.setItem("currentUser", $scope.LoginEmail);
				$window.sessionStorage.setItem("currentUserRole", response.role);
				
				$location.path('/profile');
				$scope.LoginStatus = false;
			}
				
			
		});
	}
	
	$scope.Username = '';
	$scope.UsernameError = true;
	$scope.UsernameTouched = false;
	$scope.ValidateUsername = function()
	{
		$scope.UsernameTouched = true;
		var reg = /^$/;
		$scope.UsernameError = reg.test( $scope.Username );
		$scope.CheckOverallError();
	}
	
	$scope.Email = '';
	$scope.EmailError = true;
	$scope.EmailTouched = false;
	$scope.ValidateEmail = function()
	{
		$scope.EmailTouched = true;
		var reg = /\S+@\S+\.\S+/;
		$scope.EmailError = !reg.test( $scope.Email );
		$scope.CheckOverallError();
	}

	$scope.Password = '';
	$scope.PasswordError = true;
	$scope.PasswordTouched = false;
	$scope.ValidatePassword = function()
	{
		$scope.PasswordTouched = true;
		var reg = /^.{8,20}$/;
		$scope.PasswordError = !reg.test( $scope.Password );
		$scope.CheckOverallError();
	}

	$scope.ConfirmPassword = '';
	$scope.ConfirmPasswordError = true;
	$scope.ConfirmPasswordTouched = false;
	$scope.ValidateConfirmPassword = function()
	{
		$scope.ConfirmPasswordTouched = true;
		var reg = /^.{8,20}$/;
		$scope.ConfirmPasswordError = !reg.test( $scope.ConfirmPassword );
		$scope.CheckOverallError();
	}
	
	$scope.City = '';
	$scope.CityError = true;
	$scope.CityTouched = false;
	$scope.ValidateCity = function()
	{
		$scope.CityTouched = true;
		var reg = /^$/;
		$scope.CityError = reg.test( $scope.City );
		$scope.CheckOverallError();
	}
	
	$scope.Date = '';
	
	$scope.Phone = '';
	$scope.PhoneError = true;
	$scope.PhoneTouched = false;
	$scope.ValidatePhone = function()
	{
		$scope.PhoneTouched = true;
		var reg = /^[7-9][0-9]{9}$/;
		$scope.PhoneError = !reg.test( $scope.Phone );
		$scope.CheckOverallError();
	}
	
	$scope.Gender = 'Male';
	
	$scope.OverallError = true;
	$scope.CheckOverallError = function(){
		$scope.OverallError = $scope.UsernameError || $scope.EmailError	|| $scope.PasswordError || $scope.ConfirmPasswordError || $scope.CityError || $scope.PhoneError;
		$scope.PasswordMismatch = false;
	}
	
	$scope.PasswordMismatch = false;
	
	$scope.DateEmpty = false;
	
	$scope.ServerResponse = '';
	
	$scope.SignUp = function()
	{
		if( $scope.Password != $scope.ConfirmPassword )
			$scope.PasswordMismatch = true;
		
		if( $scope.Date == '' || $scope.Date == null )
			$scope.DateEmpty = true;
		
		if( $scope.PasswordMismatch != true && $scope.DateEmpty != true )
		{
			$scope.UsernameError = false;
			$scope.EmailError = false;
			$scope.PasswordError = false;
			$scope.ConfirmPasswordError = false;
			$scope.CityError = false;
			$scope.DateEmpty = false;
			$scope.PhoneError = false;
			$scope.PasswordMismatch = false;
			
			var json = 	{
					"Username" : $scope.Username,
					"Email" : $scope.Email ,
					"Password" : $scope.Password,
					"ConfirmPassword" : $scope.ConfirmPassword,
					"City" : $scope.City,
					"Date" : $scope.Date,
					"Phone" : $scope.Phone,
					"Gender" : $scope.Gender
				};
	
			console.log(json);
			
			$UserService.InsertUser(json).then(function(response){
				console.log(response);
				
				$scope.ServerResponse = response.msg;
				
				window.setTimeout(function(){
					$scope.$apply( $scope.ServerResponse = '' );					
				}, 5000);
			});
		}
		
		
	}
}]);