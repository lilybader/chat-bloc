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

app.controller('roomController', ['$scope', '$firebase', 'Room', '$modal', '$log', function($scope, $firebase, Room, $modal, $log){
	$scope.rooms = Room.all;

  $scope.animationsEnabled = true;

  $scope.open = function () {

        var modalInstance = $modal.open({
            animation: $scope.animationsEnabled,
            templateUrl: 'addRoom.html',
            controller: 'addRoomController',
            resolve: {
                room: function () {
                    return $scope.rooms;
                }
            }
        });

        modalInstance.result.then(function (selectedRoom) {
            $scope.selected = selectedRoom;
        }, 

        function () {
            $log.info('Chat room added: ' + new Date());
        });
    };
}]);

$scope.toggleAnimation = function () {
    $scope.animationsEnabled = !$scope.animationsEnabled;
};

});


app.controller('addRoomController', ['$scope', '$modalInstance', 'Room', function ($scope, $modalInstance, Room) {

  $scope.rooms = Room.all;
  $scope.selected = {
    room: $scope.rooms[0]
  };

  $scope.ok = function () {
    $modalInstance.close($scope.selected.room);
  };

  $scope.cancel = function () {
    $modalInstance.dismiss('cancel');
  };
}]);
