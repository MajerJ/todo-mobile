angular.module('ToDo')
.controller('NotesCtrl', function($scope, $http, $location, $routeParams, $httpParamSerializerJQLike) {
    $scope.notes = [];

    $http({
        method: 'GET',
        url: $scope.serverUrl + '/task/' + $routeParams._id,
        withCredentials: true
    }).then(function(response) {
        if (response.data.message) {
            $location.path('/login');
        } else {
            $scope.selectedTask = response.data;
        }
    });

    $http({
        method: 'GET',
        url: $scope.serverUrl + '/notes/' + $routeParams._id,
        withCredentials: true
    }).then(function(response) {
        if (response.data.message) {
            alert(response.data.message);
        } else {
            $scope.notes = response.data;
        }
    });

    $scope.newNote = {};

    $scope.addNote = function() {
        $http({
            method: 'POST',
            url: $scope.serverUrl + '/notes/' + $routeParams._id,
            data: $httpParamSerializerJQLike({note: $scope.newNote.note, taskId: $routeParams._id}),
            headers: {'Content-Type': 'application/x-www-form-urlencoded'}
        }).then(function(response) {
            $scope.notes.push(response.data);
        });
        $scope.newNote = {}
    }

    $scope.goBack = function() {
        $location.path('/tasks');
    }

    $scope.addByEnter = function(keyEvent) {
        if (keyEvent.which === 13) {
            keyEvent.preventDefault();
            $scope.addNote();
        }
    }
});