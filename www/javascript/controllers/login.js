angular.module('ToDo')
.controller('LoginCtrl', function($scope, $http, $httpParamSerializerJQLike, $location) {
    $scope.sessionUser = sessionStorage.getItem('user');    
    $scope.user = ($scope.sessionUser !== null) ? JSON.parse($scope.sessionUser) : {};
    $scope.reqUser = {};
    $scope.serverUrl = 'https://todo30-be-au.herokuapp.com';
    
    if($scope.user.username !== undefined) {
        $location.path('/tasks');
    }

    $scope.storeUser = function() {
        sessionStorage.setItem('user', angular.toJson($scope.user));
    }

    $scope.login = function() {
        $http({
            method: 'POST',
            url: $scope.serverUrl + '/login',
            data: $httpParamSerializerJQLike({username: $scope.reqUser.username, password: $scope.reqUser.password}),
            headers: {'Content-Type': 'application/x-www-form-urlencoded'},
            withCredentials: true
        }).then(function(response) {
            if (response.data.error) {
                $scope.message = response.data.error;
                $scope.reqUser = {};
            } else {
                $scope.user = response.data;
                $scope.storeUser();
                $scope.reqUser = {};
                $location.path('/tasks');
            }            
        });
    }

    $scope.logout = function() {
        $http({
            method: 'GET',
            url: $scope.serverUrl + '/logout',
            withCredentials: true
        }).then(function(response) {
            $scope.user = {};
            $scope.storeUser();
            $scope.reqUser = {};
            $scope.message = response.data;                
            $location.path('/login');     
        });
    }

    $scope.register = function() {
        $http({
            method: 'POST',
            url: $scope.serverUrl + '/local-reg',
            data: $httpParamSerializerJQLike({username: $scope.reqUser.username, password: $scope.reqUser.password}),
            headers: {'Content-Type': 'application/x-www-form-urlencoded'},
            withCredentials: true
        }).then(function(response) {
            if (response.data.error) {
                $scope.message = response.data.error;
                $scope.reqUser = {};
            } else {
                $scope.user = response.data;
                $location.path('/tasks');
            }            
        });        
    }

    $scope.removeByCtrlD = function(keyEvent) {
        if (keyEvent.which === 68 && keyEvent.ctrlKey) {
            keyEvent.preventDefault();
            $scope.$broadcast('remove');
        }
    };
})