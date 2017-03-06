'use strict';
app.service('ProfileService',['$http','$q','$rootScope', function($http,$q,$rootScope){
 
	console.log("ProfileService.......")

	var BASE_URL = 'http://localhost:1111/talkbackend/';
	
	
	//
	return {
		userData : function(item) {
			
			console.log( item );
			
			return $http.post(BASE_URL + 'userdata' , item ).then(
					function(response) {
						return response.data;
					}, function(errResponse) {
						return $q.reject(errResponse);
					});
		},
		updateUser : function(item) {
			return $http.post(BASE_URL + 'updateuser', item).then(
					function(response) {
						return response.data;
					}, function(errResponse) {
						console.error('Error while sending data');
						return $q.reject(errResponse);
					});
		},
		
		disableUser : function(item) {
			return $http.post(BASE_URL + 'admin/disableuser', item)
					.then(function(response) {
						return response.data;
					}, function(errResponse) {
						console.error('Error while sending data');
						return $q.reject(errResponse);
					});
		},
		enableUser : function(item) {
			console.log("enable user service is called");
			return $http.post(BASE_URL + 'admin/enableuser', item)
					.then(function(response) {
						return response.data;
					}, function(errResponse) {
						console.error('Error while sending data');
						return $q.reject(errResponse);
					});
		},
		makeAdmin : function(item) {
			return $http.post(BASE_URL + 'admin/makeadmin', item)
					.then(function(response) {
						return response.data;
					}, function(errResponse) {
						console.error('Error while sending data');
						return $q.reject(errResponse);
					});
		},
		deleteUser : function(item) {
			return $http.post(BASE_URL + 'deleteuser', item).then(
					function(response) {
						return response.data;
					}, function(errResponse) {
						console.error('Error while sending data');
						return $q.reject(errResponse);
					});
		},
		updatePassword : function(item) {
			return $http.post(BASE_URL + 'updatepassword', item)
					.then(function(response) {
						return response.data;
					}, function(errResponse) {
						console.error('Error while sending data');
						return $q.reject(errResponse);
					});
		},
		deleteUserImage : function(item) {
			return $http.post(BASE_URL + 'deleteUserImage', item)
					.then(function(response) {
						return response.data;
					}, function(errResponse) {
						console.error('Error while updating User');
						return $q.reject(errResponse);
					});
		},
		getAllUsers : function() {
			return $http.get(BASE_URL + 'admin/allusers').then(
					function(response) {
						return response.data;
					}, function(errResponse) {
						return $q.reject(errResponse);
					});
		},
	
	};
	//
	
	
}])
