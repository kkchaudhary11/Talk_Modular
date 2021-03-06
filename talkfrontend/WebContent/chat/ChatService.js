'use strict';
app.service('ChatService',['$http','$q','$rootScope','$window', function($http,$q,$rootScope,$window){
 
	console.log("ChatService.......")

	var BASE_URL = 'http://localhost:1111/talkbackend/';
		
	var service = {}, 
    listener = $q.defer(), 
    socket = {
      client: null,
      stomp: null
    }, 
    messageIds = []
    ;
    
    service.RECONNECT_TIMEOUT = 30000;
    service.SOCKET_URL = "/talkbackend/privatechat";
    service.CHAT_TOPIC = "/queue/message";
    service.CHAT_BROKER = "/app/privatechat";
    
    service.receive = function() {
      return listener.promise;
    };
    
    var getids = function(item) {

		console.log("inside the getids service");
		return $http.post('http://localhost:1111/talkbackend/talk/getids',item).then(function(response) {
			var userid =  response.data.userId;
			var friendid = response.data.friendId;
			console.log("User ID: "+userid);
			console.log("Friend ID: "+friendid);
			service.CHAT_TOPIC = "/queue/message/"+userid;
		}, function(errResponse) {
			return $q.reject(errResponse);
		});
	};

    
    service.send = function(message) {
      var id = Math.floor(Math.random() * 1000000);
      socket.stomp.send(service.CHAT_BROKER, {
        priority: 9
      }, JSON.stringify({
        message: message,
        id: id
      }));
      messageIds.push(id);
    };
    
    var reconnect = function() {
      $timeout(function() {
        initialize();
      }, this.RECONNECT_TIMEOUT);
    };
    
    var getMessage = function(data) {
      var message = JSON.parse(data), out = {};
      out.message = message.message;
      out.time = new Date(message.time);
      if (_.contains(messageIds, message.id)) {
        out.self = true;
        messageIds = _.remove(messageIds, message.id);
      }
      return out;
    };
    
    var startListener = function() {
      socket.stomp.subscribe(service.CHAT_TOPIC, function(data) {
        listener.notify(getMessage(data.body));
      });
    };
    
    var initialize = function() {
      socket.client = new SockJS(service.SOCKET_URL);
      socket.stomp = Stomp.over(socket.client);
      socket.stomp.connect({}, startListener);
      socket.stomp.onclose = reconnect;
    };
    
    var currentUser = $window.sessionStorage.getItem("currentUser");
    var secondUser = $window.sessionStorage.getItem("secondUser");

    console.log( "second user : "+$window.sessionStorage.getItem("secondUser") );
    
    getids({"Email":currentUser,"FriendId":secondUser});
    initialize();
    return service;
	
	
}])
