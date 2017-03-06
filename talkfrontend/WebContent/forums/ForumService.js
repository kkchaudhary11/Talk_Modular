'use strict';
app.service('ForumService',['$http','$q','$rootScope', function($http,$q,$rootScope){
 
	console.log("ForumService.......")

	var BASE_URL = 'http://localhost:1111/talkbackend/';
	
	
	//
	var service = {};
	
	service.postForum = postForum;
	service.listForum = listForum;
	service.postComment = postComment;
	service.listComments = listComments;
	return service;
	
	function postForum(item){
		return $http.post(BASE_URL+"postforum",item).then(function(response) {
			return response.data;
		}, function(errResponse) {
			return $q.reject(errResponse);
		});
	}
	
	function listForum(){
		return $http.get(BASE_URL+"getforums").then(function(response){
			return response.data;
		}, function(errResponse){
			return $q.reject(errResponse);
		});
	}
	
	function postComment(item){
		return $http.post(BASE_URL+"postcomment",item).then(function(response){
			return response.data;
		}, function(errResponse){
			return $q.reject(errResponse);
		});
	}
	
	function listComments(){
		return $http.get(BASE_URL+"listforumcomments").then(function(response){
			return response.data;
		}, function(errResponse){
			return $q.reject(errResponse);
		});
	}
	//
	
	
}])
