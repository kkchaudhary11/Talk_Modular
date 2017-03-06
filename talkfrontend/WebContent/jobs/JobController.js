	
	app.controller('JobController',['$scope','JobService','$location','$window',
                                 
    function($scope,$JobService,$location,$window){
		console.log("JobController.......");
		
		$scope.currentUser = $window.sessionStorage.getItem("currentUser");
		console.log($scope.currentUser);
		//$scope.role = $window.sessionStorage.getItem("currentUser");
		$scope.currentUserRole = $window.sessionStorage.getItem("currentUserRole");
		console.log($scope.currentUserRole);
		
		// edit data
		$scope.editedItem = {};

		$scope.editrow = function($index) {
			$scope.istrue = true;
			$scope.$index = $index;
			angular.copy($scope.jobs[$index], $scope.editedItem);
			console.log($scope.editedItem);
		}

		// post the job [ADMIN]

		$scope.postJob = function() {

			console.log("in the post job");
			$scope.JobInfo = {
				JobTitle : $scope.user.jobTitle,
				JobQual : $scope.user.jobQual,
				JobDesc : $scope.user.jobDesc
			};

			$JobService.postJob($scope.JobInfo).then(
					function(response) {
						try {
							$scope.status = response.status;
						} catch (e) {
							$scope.data = [];
						}

					}, function(errResponse) {
						console.error('Error while Sending Data.');
					});

		}

		//apply for a  job
		$scope.applyJob = function(jobId) {

			console.log("in the apply job");
			
			this.AppliedJob= {
					User : $scope.currentUser,
					JobID : jobId,
				};
			$JobService.applyJob(this.AppliedJob).then(function(response) {
				try {
					$scope.status = response.status;
				} catch (e) {
					$scope.data = [];
				}

			}, function(errResponse) {
				console.error('Error while Sending Data.');
			});

		}

		//view  jobs user applied [ADMIN]

		$scope.jobsUserApplied = function() {

			console.log("in the jobs user apply");
			$JobService.jobsUserApplied().then(function(response) {
				try {
					$scope.users = response;
				} catch (e) {
					$scope.data = [];
				}

			}, function(errResponse) {
				console.error('Error while Sending Data.');
			});

		}

		//post comment
		$scope.postComment = function(post) {
			console.log("in the post comment");
			this.JobInfo = {
				User : $scope.currentUser,	
				JobID : $scope.selectedJob,
				Comment : post.comment
			};
			console.log(this.PostComment);

			$JobService.postComment(this.JobInfo).then(
					function(response) {
						try {
							console.log("response:");
							console.log(response);
							$scope.comments = response;
							} catch (e) {
							$scope.data = [];
						}

					}, function(errResponse) {
						console.error('Error while Sending Data.');
					});

		}
		
		//delete job

		$scope.deleteJob = function(jobId) {

			console.log("in the delete blog");

			$JobService.deleteJob(jobId).then(function(response) {
				try {
					$scope.jobs = response;
				} catch (e) {
					$scope.data = [];
				}

			}, function(errResponse) {
				console.error('Error while Sending Data.');
			});

		}

		//list jobs on page-load

		$JobService.getJobs().then(function(response) {

			$scope.jobs = response;
		}, function(errResponse) {
			console.log('Error fetching Users');
		});
		
		//update job
		
		$scope.editJob = function(jobId) {
			
			window.setTimeout(function(){
				
			
			$scope.istrue = false;

			console.log("in the edit blog data");
			this.editJobData = {
				//id of the selected blog data
				JobID : jobId,
				JobTitle : $scope.editedItem.title,
				JobQual : $scope.editedItem.qualification,
				JobDesc : $scope.editedItem.description,
				
			};

			console.log(this.editJobData);

		 	$JobService.editJob(this.editJobData)
					.then(function(response) {
						$scope.jobs = response;
						console.log($scope.jobs );
						//$location.path('/jobs');
					}, function(errResponse) {
						console.log('Error fetching data');
					}); 
			},500);
			
		}
		
		//list comments

		$JobService.listComments().then(function(response) {
			$scope.comments = response;
		}, function(errResponse) {
			console.log("error fatching data");
			$scope.error = "Something went wrong";
		});

		//set the current forum id 
		$scope.setJobId = function(jobId) {
			$scope.selectedJob = jobId;
		}
		//
	}]);