var app = angular.module('myApp', [ 'ngRoute' ]);

app.config(function($routeProvider) {

	$routeProvider

	.when('/', {
		templateUrl : 'home.html',
		controller : 'indexController'
	}).when('/home', {
		templateUrl : 'home.html',
		controller : 'indexController'
	}).when('/friends/:secondUser', {
		templateUrl : 'friends/friend.html',
		controller : 'FriendController'
	}).when('/login', {

		templateUrl : 'c_user/login.html',
		controller : 'UserController'
	})

	.when('/chat', {
		templateUrl : 'chat/chat.html',
		controller : 'ChatController'

	})

	.when('/chat/:secondUser', {

		templateUrl : 'chat/chat.html',
		controller : 'ChatController'

	})

	.when('/logout', {

		templateUrl : '',
		controller : ''

	})

	.when('/register', {

		templateUrl : 'c_user/register.html',
		controller : 'UserController'
	}).when('/aboutus', {
		templateUrl : 'template/aboutus.html'
	}).when('/friends', {
		templateUrl : 'friends/friend.html',
		controller : 'FriendController'
	}).when('/searchUser', {
		templateUrl : 'c_user/searchUser.html',
		controller : 'UserController'
	}).when('/jobs', {
		templateUrl : 'c_job/job.html',
		controller : 'JobController'
	}).when('/blogs', {
		templateUrl : 'blogs/blog.html',
		controller : 'BlogController'
	}).when('/blogs/:secondUser', {
		templateUrl : 'blogs/blog.html',
		controller : 'BlogController'
	}).when('/forums', {
		templateUrl : 'forums/forums.html',
		controller : 'ForumController'
	}).when('/profile', {
		templateUrl : 'profile/profile.html',
		controller : 'ProfileController'
	}).when('/profile/:secondUser', {
		templateUrl : 'profile/profile.html',
		controller : 'ProfileController'
	}).when('/createBlog', {
		templateUrl : 'c_blog/createBlog.html',
		controller : 'BlogController'
	}).when('/createEvent', {
		templateUrl : 'events/createEvent.html',
		controller : 'EventController'
	}).when('/events', {
		templateUrl : 'events/events.html',
		controller : 'EventController'
	}).when('/jobs', {
		templateUrl : 'jobs/jobs.html',
		controller : 'JobController'
	}).when('/groupchat', {
		templateUrl : 'groupchat/groupchat.html',
		controller : 'GroupChatController'
	})
})