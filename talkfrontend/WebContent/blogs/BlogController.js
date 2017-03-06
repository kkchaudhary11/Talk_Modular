	
	app.controller('BlogController',['$scope','BlogService','$location','$window','$routeParams',
                                 
    function($scope,$BlogService,$location,$window,$routeParams){
		console.log("BlogController.......");
		
		$scope.loggedInUser = $window.sessionStorage.getItem("currentUser");
		
		console.log("loggedInUser"+ $scope.ser);
		
		console.log( $routeParams.secondUser );
		
		
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
		
		console.log( $scope.currentUser );
		
		$scope.editedItem = {}; 
		$scope.editrow = function($index) {
			$scope.istrue = true;
			$scope.$index = $index;
			angular.copy($scope.blogsdata[$index], $scope.editedItem);
		}
		//current logged-in user email
		//$scope.currentUser = "${currentuser}";
		//post the blog
		$scope.user = {};
		
		$scope.postBlog = function() {
			console.log("in the post blog");
			$scope.UserBlog = {
				BlogTitle : $scope.user.blogTitle,
				BlogDesc : $scope.user.blogDesc,
				Email: $scope.currentUser,
			};
			$BlogService.postBlog($scope.UserBlog).then(
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
		//list all blogs [ADMIN]
		$scope.getAllBlogs = function() {
			$BlogService.getAllBlogs().then(function(response) {
				$scope.allblogs = response;
			}, function(errResponse) {
				console.log('Error fetching Users');
			});
		}
		//publish blog [ADMIN]
		$scope.publishBlog = function(blogId) {
			console.log(blogId);
			$BlogService.publishBlog(blogId).then(function(response) {
				$scope.status = response.status;
			}, function(errResponse) {
				console.log('Error fetching Users');
			});
		}
		//unpublish blog [ADMIN]
		$scope.unpublishBlog = function(blogId) {
			console.log(blogId);
			$BlogService.unpublishBlog(blogId).then(function(response) {
				$scope.status = response.status;
			}, function(errResponse) {
				console.log('Error fetching Users');
			});
		}
		//list blogs
		$BlogService.getBlogs().then(function(response) {
			$scope.blogs = response;
			console.log("Blogs:");
			console.log( $scope.blogs  );
			$scope.getBlogsData();
		}, function(errResponse) {
			console.log('Error fetching Users');
		});
		/////////////////////
		
		//get blogs data
		
		$scope.getBlogsData = function() {
			$BlogService.getBlogData().then(function(response) {
				$scope.blogsdata = response;
				console.log("Blogs2:");
				console.log($scope.blogsdata);
			}, function(errResponse) {
				console.log('Error fetching Users');
			});
		}
		//add blog data
		$scope.addBlogData = function() {
			console.log("in the post blog");
			$scope.UserBlogData = {
				//id of the selected blog
				BlogID : $scope.selectedBlog,
				BlogData : $scope.user.blogData
			};
			console.log($scope.UserBlogData);
			$BlogService.addBlogData($scope.UserBlogData).then(
					function(response) {
						$scope.status = response.status;
						$scope.getBlogsData();
					}, function(errResponse) {
						console.log('Error fetching Users');
					});
		}
		//delete blog data
		$scope.deleteBlogData = function(blogDataId) {
			console.log(blogDataId);
			$BlogService.deleteBlogData(blogDataId).then(
					function(response) {
						$scope.status = response.status;
						$scope.getBlogsData();
					}, function(errResponse) {
						console.log('Error fetching Users');
					});
		}
		//update blog data
		
		$scope.updateBlogData = function(blogId) {
			$scope.istrue = false;
			console.log("in the edit blog data");
			$scope.UpdateUserBlogData = {
				//id of the selected blog data
				BlogID : $scope.editedItem.blogDataId,
				UpdatedBlogData : $scope.editedItem.blogData,
			};
			console.log($scope.UpdateUserBlogData);
			$BlogService.updateBlogData($scope.UpdateUserBlogData)
					.then(function(response) {
						$scope.status = response.status;
						$scope.getBlogsData();
					}, function(errResponse) {
						console.log('Error fetching data');
					});
		}
		//set the id to current blog used to add data to the blog
		$scope.setBlogId = function(blogId) {
			$scope.selectedBlog = blogId;
		}
		//
	}]);