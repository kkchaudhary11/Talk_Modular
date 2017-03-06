'use strict';
app.service('EventService',['$http','$q','$rootScope', function($http,$q,$rootScope){
 
	console.log("EventService.......")

	var BASE_URL = 'http://localhost:1111/talkbackend/';
		
	return {

		postEvent : function(item) {
			return $http.post(BASE_URL + 'admin/postevent', item).then(
					function(response) {
						return response.data;
					}, function(errResponse) {
						console.error('Error while sending data');
						return $q.reject(errResponse);
					});
		},

		getEvents : function() {
			return $http.get(BASE_URL + 'viewevents').then(
					function(response) {
						return response.data;
					}, function(errResponse) {
						return $q.reject(errResponse);
					});
		},
		
		deleteEvent : function(eventId) {
			console.log(eventId);
			return $http.get(BASE_URL + 'admin/deleteevent/'+eventId).then(
					function(response) {
						return response.data;
					}, function(errResponse) {
						return $q.reject(errResponse);
					});
		},
		updateEvent : function(item) {
			return $http.post(BASE_URL + 'admin/updateevent', item).then(
					function(response) {
						return response.data;
					}, function(errResponse) {
						console.error('Error while sending data');
						return $q.reject(errResponse);
					});
		}

	};
	
}])
