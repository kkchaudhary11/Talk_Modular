'use strict';
app.service('JobService',['$http','$q','$rootScope', function($http,$q,$rootScope){
 
	console.log("JobService.......")

	var BASE_URL = 'http://localhost:1111/talkbackend/';
		
	return {

		postJob : function(item) {
			return $http.post(BASE_URL + 'admin/postjob', item)
					.then(function(response) {
						return response.data;
					}, function(errResponse) {
						console.error('Error while sending data');
						return $q.reject(errResponse);
					});
		},

		applyJob : function(item) {
			return $http.post(BASE_URL + 'applyjob/', item).then(
					function(response) {
						return response.data;
					}, function(errResponse) {
						console.error('Error while sending data');
						return $q.reject(errResponse);
					});
		},

		getJobs : function() {
			return $http.get(BASE_URL + 'viewjobs').then(
					function(response) {
						return response.data;
					}, function(errResponse) {
						return $q.reject(errResponse);
					});
		},

		jobsUserApplied : function() {
			return $http.get(BASE_URL + 'viewjobapplied').then(
					function(response) {
						return response.data;
					}, function(errResponse) {
						return $q.reject(errResponse);
					});
		},

		postComment : function(item) {
			console.log("inside the post comment service")
			console.log(item);
			return $http.post(BASE_URL + 'jobpostcomment', item)
					.then(function(response) {
						return response.data;
					}, function(errResponse) {
						return $q.reject(errResponse);
					});
		},
		//list Comments

		listComments : function() {
			return $http.get(BASE_URL + "listpostcomments").then(
					function(response) {
						return response.data;
					}, function(errResponse) {
						return $q.reject(errResponse);
					});
		},

		deleteJob : function(deleteId) {
			console.log(deleteId);
			return $http.get(BASE_URL + 'admin/deletejob/' + deleteId)
					.then(function(response) {
						return response.data;
					}, function(errResponse) {
						return $q.reject(errResponse);
					});
		},
		
		editJob : function(jobData) {
			console.log("inside the job edit service");
			return $http.post(BASE_URL + 'admin/editjob', jobData)
					.then(function(response) {
						return response.data;
					}, function(errResponse) {
						return $q.reject(errResponse);
					});
		}

	};
	
}])
