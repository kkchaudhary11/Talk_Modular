'use strict';
app.service('GroupChatService',['$http','$q','$rootScope','$window', function($http,$q,$rootScope,$window){
 
	console.log("GroupChatService.......")

	var BASE_URL = 'http://localhost:1111/talkbackend/';
		
	var service = {}, listener = $q.defer(), socket = {
	      client: null,
	      stomp: null
	    }, messageIds = [];
	    
	    service.RECONNECT_TIMEOUT = 30000;
	    service.SOCKET_URL = "/talkbackend/chat";
	    service.CHAT_TOPIC = "/topic/message";
	    service.CHAT_BROKER = "/topic/message";
	    
	    service.receive = function() {
	      return listener.promise;
	    };
	    
	    var currentUser = $window.sessionStorage.getItem("currentUser");
	    
	    console.log( currentUser );
	    
	    service.send = function(message) {
	      var id = Math.floor(Math.random() * 1000000);
	      socket.stomp.send(service.CHAT_BROKER, {
	        priority: 9
	      }, JSON.stringify({
	        message: message,
	        id: id,
	        username: currentUser,
	        time: new Date()
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
	      out.username = message.username;
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
	    
	    initialize();
	    return service;
    
	
	
}])
