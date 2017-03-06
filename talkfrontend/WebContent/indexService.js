app.factory('UserService', ['$http', '$q', function($http, $q){
	 
	var BASE_URL = 'http://localhost:1111/talkbackend';
	
    return {
         		InsertUser: function(item){
                    return $http.post(BASE_URL + '/adduser', item)
                            .then(
                                    function(response){
                                        return response.data;
                                    }, 
                                    function(errResponse){
                                        console.error('Error while updating User');
                                        return $q.reject(errResponse);
                                    }
                            );
            		
    		}
    		,
    		UserLogin: function(item){
                return $http.post(BASE_URL + '/loginuser', item)
                        .then(
                                function(response){
                                    return response.data;
                                }, 
                                function(errResponse){
                                    console.error('Error while updating User');
                                    return $q.reject(errResponse);
                                }
                        );
        		
		}
    		
    };
 
}]);