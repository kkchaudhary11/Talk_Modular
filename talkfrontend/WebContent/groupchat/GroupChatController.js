	
	app.controller('GroupChatController',['$scope','GroupChatService','$location','$window','$routeParams',
                                 
    function($scope,$GroupChatService,$location,$window,$routeParams){
		console.log("GroupChatController.......");
		
		$scope.messages = [];
	    $scope.message = "";
	    $scope.max = 140;
	    
	    $scope.addMessage = function() {
	    	$GroupChatService.send($scope.message);
	      $scope.message = "";
	    };
	    
	    $GroupChatService.receive().then(null, null, function(message) {
	      
	    	console.log("Message received:");
	    	console.log(message)
	    	$scope.messages.push(message);
	    });
		//
	}]);