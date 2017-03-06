	
	app.controller('ChatController',['$scope','ChatService','$location','$window','$routeParams',
                                 
    function($scope,$ChatService,$location,$window,$routeParams){
		console.log("ChatController.......");
		
		if($routeParams.secondUser != undefined)
		{
				$window.sessionStorage.setItem("secondUser",$routeParams.secondUser);
		}

		$scope.currentUser = $window.sessionStorage.getItem("currentUser");
		
		//
		
		$scope.messages = [];
	    $scope.message = "";
	    $scope.max = 140;
	    $scope.userid = "";
	    $scope.friendid="";
	    
	   /* ChatService.getids().then(function(response) {
	    	$scope.userid = response.userId;
	    	$scope.friendid= response.friendId;
	    	console.log("User ID :"+$scope.userid);
	    	console.log("Friend ID :"+$scope.friendid);
	    	
	    	
		});*/
	    
	    $scope.addMessage = function() {
	      $ChatService.send($scope.message,$scope.secondUser);
	      $scope.message = "";
	    };
	    
	    $ChatService.receive().then(null, null, function(message) {
	      $scope.messages.push(message);
	      //alert('Message');
	    });
		//
	}]);