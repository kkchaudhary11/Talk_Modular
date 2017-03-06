'use strict';

app.controller('UserController', [
		'$scope',
		'UserService',
		'$location',
		'$rootScope',
		

		function($scope, UserService, $location, $rootScope,$http) {
			console.log("UserController.....")

			var self = this;
			self.user = {
				id : '',
				name : '',
				password : '',
				mobile : '',
				address : '',
				email : '',
				role : '',
				errorMessage : ''
			};
			self.users = [];

			self.fetchAllUsers = function() {
				UserService.fetchAllUsers()
				.then(
						function(d) {
					self.users = d;
				}, 
				function(errResponse) {
					console.error('Error while fetching users');

				}
				);
			};

			
			
			
			self.createUser = function(user) {
				UserService.createUser(user).then(self.fetchAllUsers,
						function(errResponse) {
							cosole.error('Error while creating user');
						});

			};

			self.updateUser = function(user, id) {
			
				UserService.updateUser(user, id).then(self.fetchAllUsers,
						function(errResponse) {
							console.error('Error while updating user');
						});
			};
			self.authenticate = function(user) {
				console.log("authenticate.....")
				UserService.authenticate(user).then(function(d) {
					self.user = d;
					console.log("user.errorCode:"
							+self.user.errorCode)
							
							if(self.user.errorCode == "404")
								{
								alert("Invalid Credentials... Please try again")
								self.user.id ="";
								self.user.password ="";
								}
							else{
								console.log("Valid credentials")
							}
					$rootScope.currentUser = {
							name : self.user.name,
							id  : self.user.id,
							role :self.user.role
					}
				
		/*			$http.defaults.headers.common['Authorization'] = 'name'
						+ $rootScope.currentUser;*/
					
					
						$location.path('/');
					
				}
					, function(errResponse) {

					console.error('Error while authenticating user')
				
				})
				;
			};
			self.deleteUser = function(id) {
				UserService.deleteUser(id).then(self.fetchAllUsers,
						function(errResponse) {
							console.error('Error while deleting user')
						});
			};

			self.fetchAllUsers();
			 
	    /*      self.submit = function() {
	              if(self.user.id===null){
	                  console.log('Saving New User', self.user);    
	                  self.createUser(self.user);
	              }else{
	                  self.updateUser(self.user, self.user.id);
	                  console.log('User updated with id ', self.user.id);
	              }
	          	self.submit();
	              self.reset();
	          };*/
			self.login = function() {
				{
					console.log('login validation??????????', self.user);
					self.authenticate(self.user);
				}
			};
		

			self.submit = function() {
		

				{
					console.log('Saving new user', self.user);
					self.createUser(self.user);
				}
	
				
			};

			self.edit = function(id) {
				console.log('id is to be edited', id);
				for (var i = 0; i < self.users.length; i++) {
					if (self.users[i].id === id) {
						self.user = angular.copy(self.users[i]);
						break;
					}

				}
			};

		}

]);