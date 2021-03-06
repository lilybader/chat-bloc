app = angular.module('ChatBloc', ['ui.router', 'firebase', 'ui.bootstrap']);

app.config(['$locationProvider', '$stateProvider', function($locationProvider, $stateProvider) {
    $locationProvider.html5Mode(true);

    $stateProvider
    .state('home', {
    	url: '/',
    	controller: 'roomController',
    	templateUrl: 'templates/home.html',
    });
}]);

app.factory('Room', ['$firebase', function($firebase){
	var firebase = new Firebase("https://chat-bloc.firebaseio.com/rooms");
  var sync = $firebase(ref);
	var rooms = $firebase(firebase.child('rooms')).$asArray();
	rooms.$add({ room: "chat room" }).then(function(ref) {
  	var id = ref.key();
  	console.log("added record with id " + id);
  	rooms.$indexFor(id); 
});
	return {
		all: rooms
	}
}]);

app.controller('roomController', ['$scope', '$firebase', 'Room', function($scope, $firebase, Room){
	$scope.rooms = Room.all;

}]);

