	
	app.controller('EventController',['$scope','EventService','$location','$window',
                                 
    function($scope,$EventService,$location,$window){
		console.log("EventController.......");
		
		$scope.currentUserRole = $window.sessionStorage.getItem("currentUserRole");
		
		console.log("Current Role : "+$scope.currentUserRole);
		
		//
		// edit data
		$scope.editedItem = {};

		$scope.editrow = function($index) {
			$scope.istrue = true;
			$scope.$index = $index;
			angular.copy($scope.events[$index], $scope.editedItem);
			console.log($scope.editedItem);
		}


		// post the blog

		$scope.postEvent = function() {

			console.log("in the post blog");
			$scope.eventInfo = {
				EventTitle : $scope.user.eventTitle,
				EventDesc : $scope.user.eventDesc,
				EventDateFrom : $scope.user.eventDateFrom,
				EventDateTo : $scope.user.eventDateTo,
			};
			
			$EventService.postEvent($scope.eventInfo).then(
					function(response) {
						try {
							$scope.events = response;
						} catch (e) {
							$scope.data = [];
						}

					}, function(errResponse) {
						console.error('Error while Sending Data.');
					});

		}

		//delete event

		$scope.deleteEvent = function(eventId) {

			console.log("in the delete blog");
			
			$EventService.deleteEvent(eventId).then(
					function(response) {
						try {
							$scope.events = response;
						} catch (e) {
							$scope.data = [];
						}

					}, function(errResponse) {
						console.error('Error while Sending Data.');
					});

		}
		
		//edit event 
		$scope.updateEvent = function(eventId) {
			window.setTimeout(function(){
			console.log("in the edit blog");
			this.eventInfo = {
				EventId : $scope.editedItem.eventId,
				EventTitle : $scope.editedItem.title,
				EventDesc : $scope.editedItem.description,
				EventDateFrom : $scope.editedItem.eventFrom,
				EventDateTo : $scope.editedItem.eventTo,
			};
			
			console.log(this.eventInfo);
			$EventService.updateEvent(this.eventInfo).then(
					function(response) {						
					$scope.events = response;
					$('#editeventclose').click();
					
					}, function(errResponse) {
						console.error('Error while Sending Data.');
					});
			},500);
		}
		
		
		//list events

		$EventService.getEvents().then(function(response) {
			$scope.events = response;
			console.log($scope.events);
		}, function(errResponse) {
			console.log('Error fetching Events');
		});
		//
	}]);