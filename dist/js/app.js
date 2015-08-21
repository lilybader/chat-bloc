app = angular.module('ChatBloc', ['ui.router', 'firebase']);

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
	var rooms = $firebase(firebase.child('rooms')).$asArray();
	console.log(rooms);
	return {
		all: rooms
	}
}]);

app.controller('roomController', ['$scope', '$firebase', 'Room', function($scope, $firebase, Room){
	$scope.rooms = Room.all;
}]);
