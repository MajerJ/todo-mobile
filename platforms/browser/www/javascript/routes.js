angular.module('ToDo')
.config(function($routeProvider){
    $routeProvider.when('/login', {
        templateUrl: './pages/login.html'
    })
    .when('/register', {
        templateUrl: './pages/register.html'
    })
    .when('/tasks', {
        templateUrl: './pages/tasks.html'
    })
    .when('/notes/:_id', {
        templateUrl: './pages/notes.html'
    })
    .when('/', {
        templateUrl: './pages/login.html'
    })
    .otherwise({ redirectTo: '/' });
});