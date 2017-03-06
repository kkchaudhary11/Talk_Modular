	
	app.directive('onErrorSrc', function() {
		return {
			link : function(scope, element, attrs) {
				element.bind('error', function() {
					if (attrs.src != attrs.onErrorSrc) {
						attrs.$set('src', attrs.onErrorSrc);
						//disable the delete profile picture button when there is no image
						scope.picDeleted = true;
						scope.$apply();
					}
				});
			}
		}
	});
	
	app.service('fileUpload', [ '$http', function($http) {
		this.uploadFileToUrl = function(file, paramuser, uploadUrl) {
			var fd = new FormData();
			fd.append('file', file);
			//fd.append('user','vasudev89');
			return $http.post(uploadUrl, fd, {
				transformRequest : angular.identity,
				headers : {
					'Content-Type' : undefined,
					user : paramuser
				}
			}).then(function(response) {
				return response.data;
			}, function(errResponse) {
				console.error('Error while updating User');
				return "error";
			});
		}
	} ]);

	app.controller('ProfileController',['$scope','$filter','ProfileService','$location','$window','$routeParams','fileUpload',
                                 
    function($scope,$filter,$ProfileService,$location,$window,$routeParams,$fileUpload){
		console.log("ProfileController.......");
		

		$scope.currentUserRole = $window.sessionStorage.getItem("currentUserRole");
		
		//
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
		
		var date = new Date();
		$scope.time = $filter('date')(new Date(), 'HH');
		//get user data when page loads
		
		$scope.LoginData = {"Email" : $scope.currentUser};
		
		console.log( $scope.LoginData );
		
		$ProfileService
				.userData({"Email" : $scope.currentUser})
				.then(
						function(response) {
							//console.log(response);
							$scope.userdetails = response;
							
							console.log( 'RESP:' + response )
							
							//load profile picture when page loads after the userdetails get fatched
							$scope.userdetails.Image = 'http://localhost:1111/talkbackend/resources/images/'
									+ $scope.userdetails.email
									+ '.jpg';
						},
						function(errResponse) {
							console
									.log('Error fetching User Details');
						});
		//update user data							
		$scope.updateUser = function() {
			$scope.UserData = {
				UserId : $scope.userdetails.userId,
				Username : $scope.userdetails.username,
				Phone : $scope.userdetails.phone,
				City : $scope.userdetails.city,
				DOB : $scope.userdetails.dob,
				Gender : $scope.userdetails.gender
			};
			console.log($scope.UserData);
			console.log("in the update user");
			$ProfileService
					.updateUser($scope.UserData)
					.then(
							function(response) {
								try {
									$scope.status = response.status;
								} catch (e) {
									$scope.data = [];
								}
							},
							function(errResponse) {
								console
										.error('Error while Sending Data.');
							});
		}
		

		//disable user [ADMIN]
		$scope.disableUser = function(userId) {
			$ProfileService
					.disableUser(userId)
					.then(
							function(response) {
								try {
									$scope.allusers = response;
								} catch (e) {
									$scope.data = [];
								}
								/* 		console.log($scope.allusers); */
							},
							function(errResponse) {
								console
										.error('Error while Sending Data.');
							});
		}
		//enable user [ADMIN]
		$scope.enableUser = function(userId) {
			console.log("enable user called");
			$ProfileService
					.enableUser(userId)
					.then(
							function(response) {
								try {
									$scope.allusers = response;
								} catch (e) {
									$scope.data = [];
								}
								/* 		console.log($scope.allusers); */
							},
							function(errResponse) {
								console
										.error('Error while Sending Data.');
							});
		}
		//make user ADMIN [ADMIN]
		$scope.makeAdmin = function(userId) {
			$ProfileService
					.makeAdmin(userId)
					.then(
							function(response) {
								try {
									$scope.allusers = response;
								} catch (e) {
									$scope.data = [];
								}
								/* 		console.log($scope.allusers); */
							},
							function(errResponse) {
								console
										.error('Error while Sending Data.');
							});
		}
		
		//delete user [ADMIN]
		$scope.deleteUser = function(userId) {
			$ProfileService
					.deleteUser(userId)
					.then(
							function(response) {
								try {
									$scope.allusers = response;
								} catch (e) {
									$scope.data = [];
								}
								/* 		console.log($scope.allusers); */
							},
							function(errResponse) {
								console
										.error('Error while Sending Data.');
							});
		}
		//update password
		$scope.updatePassword = function() {
			console
					.log("in the update password update");
			$ProfileService
					.updatePassword(
							{"Email":$scope.currentUser,"NewPassword":$scope.userdetails.newpassword})
					.then(
							function(response) {
								try {
									$scope.status = response.status;
								} catch (e) {
									$scope.data = [];
								}
							},
							function(errResponse) {
								console
										.error('Error while Sending Data.');
							});
		}
		//list all users [ADMIN]
		$scope.getAllUsers = function() {
			$ProfileService
					.getAllUsers()
					.then(
							function(response) {
								$scope.allusers = response;
							},
							function(errResponse) {
								console
										.log('Error fetching Users');
							});
		}
		// open File Explorer for seleting file/image
		$scope.openFileChooser = function() {
			$('#trigger').trigger('click');
		};
		$scope.picUpdated = false;
		$scope.picUpdatedWithError = false;
		$scope.invalidPicType = false;
		/* $scope.picDeleted = false;  */
		// delete profile image
		$scope.DeletePic = function() {
			var resp = $ProfileService
					.deleteUserImage(
							$scope.userdetails.email)
					.then(
							function(response) {
								$scope.status = response.status;
								if ($scope.status == "Picture Deleted") {
									$scope.picDeleted = true;
									$scope.userdetails.Image = null;
									document
											.getElementById("profilepic").src = '';
									document
											.getElementById("sm_profilepic").src = '';
								} else {
									$scope.picUpdatedWithError = true;
								}
							},
							function(errResponse) {
								console
										.error('Error while Updating User.');
							});
		}
		// Upload image 
		$scope.setFile = function(element) {
			$scope.currentFile = element.files[0];
			var reader = new FileReader();
			reader.onload = function(event) {
				$scope.userdetails.Image = event.target.result
				$scope.$apply()
			};
			// when the file is read it triggers the onload event above.
			reader.readAsDataURL($scope.currentFile);
			var file = $scope.currentFile;
			console.log('file is :');
			console.dir(file);
			var uploadUrl = "http://localhost:1111/talkbackend/updateProfilePicture/";
			// calling uploadFileToUrl function of $fileUpload
			var res = $fileUpload
					.uploadFileToUrl(file,
							$scope.userdetails.email,
							uploadUrl)
					.then(
							function(response) {
								$scope.status = response.status;
								$scope.imagesrc = response.imagesrc;
								$scope.picDeleted = false;
								//console.log( $scope.response );
								//console.log( $scope.imagesrc );
								$scope.currentImage = '/'
										+ $scope.imagesrc;
								$scope.stateDisabled = false;
							},
							function(errResponse) {
								console
										.error('Error while Updating User.');
							});
		};
		//
	}]);
