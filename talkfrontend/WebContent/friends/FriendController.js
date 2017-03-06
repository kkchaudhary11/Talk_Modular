	
	app.controller('FriendController',['$scope','FriendService','$location','$window','$routeParams',
                                 
    function($scope,$FriendService,$location,$window,$routeParams){
		console.log("FriendController.......");
		
		//
		
		$scope.viewFriendRequset = viewFriendRequset;
	     $scope.acceptFriendRequset = acceptFriendRequset;
	     $scope.rejectFriendRequset = rejectFriendRequset;
	        
	    if($routeParams.secondUser != undefined)
		{
				$scope.secondUser = true;
				$scope.currentUser = $routeParams.secondUser;
				console.log( $scope.secondUser );
		}
		else
		{
			$scope.secondUser = false;
			$scope.currentUser = $window.sessionStorage.getItem("currentUser");
		}
	     
	     
	     getFriends({"Email":$scope.currentUser});
	     countFriendRequests({"Email":$scope.currentUser});
		 
		 function viewFriendRequset() {
			 
			 $FriendService.viewFriendRequset( {"Email":$scope.currentUser} )
						.then(function(response) {
								$scope.friendrequest = response;
								
								console.log( "FriendRequests:" );
								console.log( $scope.friendrequest );
								
								},
								function(errResponse) {
									console.log('Error fetching Users');
								});
			}
		 
		 function acceptFriendRequset(friendId) {
			 $FriendService.acceptFriendRequset(friendId,$scope.currentUser)
						.then(function(response) {
							$scope.friendrequest = response;
							 getFriends({"Email":$scope.currentUser});
							 countFriendRequests({"Email":$scope.currentUser});
								},
								function(errResponse) {
									console.log('Error fetching Users');
								});
			
			 
			}
		
		 $scope.removeFriendRequset = function(friendId) {
			 $FriendService.removeFriendRequset(friendId,$scope.currentUser)
						.then(function(response) {
							$scope.friendrequest = response;
							 getFriends({"Email":$scope.currentUser});
							 countFriendRequests({"Email":$scope.currentUser});
								},
								function(errResponse) {
									console.log('Error fetching Users');
								});
			
			 
			}
		
		 
		 function rejectFriendRequset(friendId) {
			 $FriendService.rejectFriendRequset({"FriendId": friendId ,"Email":$scope.currentUser})
						.then(function(response) {
							$scope.friendrequest = response;
								},
								function(errResponse) {
									console.log('Error fetching Users');
								});
			}
		 
		 function getFriends(item) {
			 window.setTimeout(function(){
			 $FriendService.getFriends(item).then(function(response) {
							$scope.friends = response;
							
							console.log("Friends:");
							
							console.log( $scope.friends );
							
							for( var i = 0 ; i < $scope.allusers.length ; i++ )
							{
								$scope.allusers[i].isFriend = false;
								
								for( var j = 0 ; j < $scope.friends.length ; j++ )
								{
								
									if( $scope.allusers[i].email == $scope.friends[j].friendId.email )
									{
										$scope.allusers[i].isFriend = $scope.friends[j].status;
										console.log($scope.friends[j].status);
									}
									
								}
							}
							
								},
								function(errResponse) {
									console.log('Error fetching Users');
								});
			 },200);
			}
		 
		 function countFriendRequests(item) {
			 $FriendService.countFriendRequests(item)
						.then(function(response) {
							$scope.countfriendrequests = response.count;
								},
								function(errResponse) {
									console.log('Error fetching Users');
								});
			}
		//
		 
		 //$scope.sendFriendRequset = sendFriendRequset;
			
			getAllUsers({"Email":$scope.currentUser});
			
		/* 	var arrayText = [];
			$scope.calff = function(item) {
				console.log("next");
				arrayText.push(item);
				console.log(arrayText);
			
			}
			 
		 	$scope.calffff = function() {
				
				 var i=0, len=arrayText.length;
				    for (i; i<=len; i++) {
				    	console.log(arrayText[i]);
				     	  if ($scope.arrayText[i] == true) {
				     		console.log("friend");
				      }
				     	 else{
					     		console.log("send request ");
				     	 }  
				    }
				    
				    $scope.arrayText.length = 0; 
			}   */ 
			
			$scope.allusers = [];
			function getAllUsers(item) {
				console.log("in the getallusers");
				$FriendService.getAllUsers(item).then(function(response) {
					$scope.allusers = response;
					
					console.log("All Users");
					console.log($scope.allusers  );
					
					
				}, function(errResponse) {
					console.log('Error fetching Users');
				});
			}
			
			 $scope.sendFriendRequset = function(FriendId) {
				console.log(FriendId);
				
				$FriendService.sendFriendRequset({"FriendId":FriendId,"Email":$scope.currentUser}).then(function(response) {
					$scope.status = response.status;
					getFriends({"Email":$scope.currentUser});
					countFriendRequests({"Email":$scope.currentUser});
					
				}, function(errResponse) {
					console.log('Error fetching Users');
				});
				
			}
			 $scope.friends=[];
			 $scope.CheckFriend = function( user )
			 {
				 //alert(user); 
				 
				 console.log( $scope.friends );
				 console.log( user );
				 
				 for( var i = 0 ; i < $scope.friends.length ; i++)
				 {
					 if( $scope.friends[i].friendId.email == user.email )
					 {
						 //alert(true);
						 return true;
					 }
						 
				 }
				 
				 return false;
			 }
	}]);
