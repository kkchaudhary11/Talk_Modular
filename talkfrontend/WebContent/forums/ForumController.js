	
	app.controller('ForumController',['$scope','ForumService','$location','$window','$routeParams',
                                 
    function($scope,ForumService,$location,$window,$routeParams){
		console.log("ForumController.......");
		
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
			$scope.currentUserRole = $window.sessionStorage.getItem("currentUserRole");
		}
		
		$scope.postForum = postForum;
		$scope.listForum = listForum;
		$scope.postComment = postComment;
		
		listForum();
		listComments();
	
		//post Forum 
	 	function postForum() {
			console.log("in the post forum");
			$scope.PostForum = {
				ForumTitle : $scope.user.forumTitle,
				"Email" : $scope.currentUser
			};
			
			console.log($scope.PostForum);
			ForumService.postForum($scope.PostForum).then(function(response) {
				$scope.status = response.status;
			}, function(errorResponse) {
				console.log("error Fatching data");
				$scope.error = "Something went wrong";
			});
		} 
		
		//list Forum
		function listForum(){
			console.log("in the list forum");
			ForumService.listForum().then(function(response){
				$scope.forums = response;
			}, function(errResponse){
				console.log("error fatching data");
				$scope.error = "Something went wrong";
			});
		}
		
		
		//post comment
		function postComment(post){
			console.log("in the post comment");
			this.PostComment = {
					  ForumID : $scope.selectedForum,
					 Comment : post.comment,
					 Email: $scope.currentUser
				};
			console.log(this.PostComment);
			ForumService.postComment(this.PostComment).then(function(response){
				$scope.status = response;
				listComments();
			}, function(errResponse){
				console.log("error fatching data");
				$scope.error = "Something went wrong";
			});
		}
		
		//list Comments
		function listComments(){
			console.log("in the list comment");
			ForumService.listComments().then(function(response){
				$scope.comments = response; 
				
			}, function(errResponse){
				console.log("error fatching data");
				$scope.error = "Something went wrong";
			});
		}
		
		//set the current forum id 
		$scope.setForumId = function(forumId) {
			$scope.selectedForum = forumId;
		}
		//
	}]);