angular.module('ToDo')
.controller('MyTaskList', function($scope, $http, $httpParamSerializerJQLike, $location) {
    $scope.list = [];
        
    $http({
            method: 'GET',
            url: $scope.serverUrl + '/tasks/' + $scope.user._id,
            withCredentials: true
        }).then(function(response) {                     
            if (response.data.message) {                
                $location.path('/login');
                alert(response.data.message);
            } else {
                $scope.list = response.data;
            } 
        });

    $scope.newTask = {};    

    $scope.addTask = function() {        
        $http({                      
            method: 'POST',
            url: $scope.serverUrl + '/tasks',            
            data: $httpParamSerializerJQLike({task: $scope.newTask.task, userId: $scope.user._id}),
            headers: {'Content-Type': 'application/x-www-form-urlencoded'}
        }).then(function(response) {
            $scope.list.push(response.data);                            
        });
        $scope.newTask = {}
    }
    
    $scope.addByEnter = function(keyEvent) {
        if (keyEvent.which === 13) {
            keyEvent.preventDefault();
            $scope.addTask();
        }
    }

    $scope.removeSelected = function() {
        for (var i = ($scope.list.length)-1; i >= 0 ; i--) {
            if ($scope.list[i].done) {                             
                $http({                    
                    method: 'DELETE',
                    url: $scope.serverUrl + '/tasks/' + $scope.list[i]._id                   
                }).then(function(response) {                    
                    console.log(response.data)                    
                });
            $scope.removeNotes($scope.list[i]._id); 
            $scope.list.splice([i], 1);            
            }
        }    
    }

    $scope.removeNotes = function(id) {
        $http({                    
            method: 'DELETE',
            url: $scope.serverUrl + '/notes/' + id                   
        }).then(function(response) {                    
            console.log(response.data)                    
        });
    }

    $scope.updateTask = function() {
        for (var i = 0; i < ($scope.list.length); i++) {                            
                $http({                    
                    method: 'PUT',
                    url: $scope.serverUrl + '/tasks/' + $scope.list[i]._id,
                    data: $httpParamSerializerJQLike({done: $scope.list[i].done}),
                    headers: {'Content-Type': 'application/x-www-form-urlencoded'}
                }).then(function(response) {                    
                    console.log(response.data)
                });
        } 
    }
    
    $scope.$on('remove', function(event) {
        $scope.removeSelected();
    })

    $scope.sortBy = function(propertyName) {
        $scope.reverse = ($scope.propertyName === propertyName) ? !$scope.reverse : false;
        $scope.propertyName = propertyName;
    }
});
