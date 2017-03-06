'use strict';
app.service('FriendService',['$http','$q','$rootScope', function($http,$q,$rootScope){
 
	console.log("FriendService.......")

	var BASE_URL = 'http://localhost:1111/talkbackend/';
	
	var service = {};
	 
	 service.viewFriendRequset = viewFriendRequset;
	 service.acceptFriendRequset = acceptFriendRequset;
	 service.rejectFriendRequset = rejectFriendRequset;
	 service.getFriends = getFriends;
	 service.countFriendRequests = countFriendRequests;
	 service.removeFriendRequset = removeFriendRequset;
	 
	 	service.getAllUsers = getAllUsers;
		service.sendFriendRequset = sendFriendRequset;
		
		return service;
		
		function getAllUsers(item) {
			console.log("inside the getallusers service");
			return $http.post(BASE_URL + 'getusers',item).then(function(response) {
				return response.data;
			}, function(errResponse) {
				return $q.reject(errResponse);
			});
		}
		
		function sendFriendRequset(id) {
			console.log("inside the sendRequst service");
			return $http.post(BASE_URL + 'friendrequest', id).then(
					function(response) {
						return response.data;
					}, function(errResponse) {
						return $q.reject(errResponse);
					});
		}
	 //
		
	 function viewFriendRequset(item){
		 console.log("inside the friendrequest service");
		 return $http.post(BASE_URL + 'friendrequests' , item).then(
					function(response) {
						return response.data;
					}, function(errResponse) {
						return $q.reject(errResponse);
					}); 
	 }
	 
	 function acceptFriendRequset(friendId,email){
		 console.log(friendId);
		 console.log("inside the accept friend request service");
		 
		 var item = {"Email":email};
		 
		 return $http.post(BASE_URL + 'acceptfriendrequest/'+friendId , item).then(
					function(response) {
						return response.data;
					}, function(errResponse) {
						return $q.reject(errResponse);
					}); 
	 }
	 
	 function removeFriendRequset(friendId,email){
		 console.log(friendId);
		 console.log("inside the accept friend remove service");
		 
		 var item = {"Email":email};
		 
		 return $http.post(BASE_URL + 'removefriendrequest/'+friendId , item).then(
					function(response) {
						return response.data;
					}, function(errResponse) {
						return $q.reject(errResponse);
					}); 
	 }
	 
	 function rejectFriendRequset(item){
		 //console.log(friendId);
		 console.log("inside the reject friend request service");
		 return $http.post(BASE_URL + 'rejectfriendrequest' , item).then(
					function(response) {
						return response.data;
					}, function(errResponse) {
						return $q.reject(errResponse);
					}); 
	 }
	 
	 function getFriends(item){
		 console.log("inside the get friend request service");
		 console.log( item );
		 return $http.post(BASE_URL + 'getfriends' , item).then(
					function(response) {
						return response.data;
					}, function(errResponse) {
						return $q.reject(errResponse);
					}); 
	 }
	 
	 function countFriendRequests(item){
		 console.log("inside the count friend request service");
		 return $http.post(BASE_URL + 'countfriendrequests',item).then(
					function(response) {
						return response.data;
					}, function(errResponse) {
						return $q.reject(errResponse);
					}); 
	 }
	 
	
	
	
	
	
}])
