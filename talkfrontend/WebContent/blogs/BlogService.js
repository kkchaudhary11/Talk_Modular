'use strict';
app.service('BlogService',['$http','$q','$rootScope', function($http,$q,$rootScope){
 
	console.log("BlogService.......")

	var BASE_URL = 'http://localhost:1111/talkbackend/';
	return {
		postBlog : function(item) {
			return $http.post(BASE_URL + 'postblog', item).then(
					function(response) {
						return response.data;
					}, function(errResponse) {
						console.error('Error while sending data');
						return $q.reject(errResponse);
					});
		},
		getAllBlogs : function() {
			return $http.get(BASE_URL + 'admin/allblogs').then(
					function(response) {
						return response.data;
					}, function(errResponse) {
						return $q.reject(errResponse);
					});
		},
		publishBlog : function(item) {
			return $http.post(BASE_URL + 'publishblog', item).then(
					function(response) {
						return response.data;
					}, function(errResponse) {
						console.error('Error while sending data');
						return $q.reject(errResponse);
					});
		},
		unpublishBlog : function(item) {
			return $http.post(BASE_URL + 'unpublishblog', item)
					.then(function(response) {
						return response.data;
					}, function(errResponse) {
						console.error('Error while sending data');
						return $q.reject(errResponse);
					});
		},
		getBlogs : function() {
			return $http.get(BASE_URL + 'blogs').then(
					function(response) {
						return response.data;
					}, function(errResponse) {
						return $q.reject(errResponse);
					});
		},
		addBlogData : function(item) {
			return $http.post(BASE_URL + 'addblogdata', item).then(
					function(response) {
						return response.data;
					}, function(errResponse) {
						console.error('Error while sending data');
						return $q.reject(errResponse);
					});
		},
		getBlogData : function(item) {
			return $http.get(BASE_URL + 'getblogdata', item).then(
					function(response) {
						return response.data;
					}, function(errResponse) {
						console.error('Error while sending data');
						return $q.reject(errResponse);
					});
		},
		deleteBlogData : function(item) {
			return $http.get(BASE_URL + 'deleteblogdata/' + item)
					.then(function(response) {
						return response.data;
					}, function(errResponse) {
						console.error('Error while sending data');
						return $q.reject(errResponse);
					});
		},
		updateBlogData : function(item) {
			return $http.post(BASE_URL + 'updateblogdata', item)
					.then(function(response) {
						return response.data;
					}, function(errResponse) {
						console.error('Error while sending data');
						return $q.reject(errResponse);
					});
		}
	};
	
	
	
	
}])
