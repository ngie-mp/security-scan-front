import angular from 'angular';
import angularMeteor from 'angular-meteor';
import ngMaterial from 'angular-material';
import ngAnimate from 'angular-animate';
import ngRoute from 'angular-route';
import todoList from '/imports/components/todoList/todoList.js';
import sideNav from '/imports/components/sideNav/sideNav.js';

var app = angular.module('scanApp', [
  angularMeteor,
  ngMaterial,
  ngRoute,
  todoList.name,
  sideNav.name
]);

app.config(function($routeProvider, $locationProvider) {
  $locationProvider.html5Mode(true);

  $routeProvider
    .when('/', {
      templateUrl: 'client/pages/home.html',
      controller: 'homeController'
    })
    .when('/list', {
      templateUrl: 'client/pages/list.html',
      controller: 'homeController'
    })
    .when('/login', {
      templateUrl: 'client/pages/login.html',
      controller: 'loginController'
    })
    .when('/register', {
        templateUrl: 'client/pages/register.html',
        controller: 'registerController'
    });
    $routeProvider.otherwise('/');
});

app.controller('homeController', function($scope, $timeout, $mdSidenav) {
  $scope.pagetitle = 'home page';

  $scope.toggleLeft = buildToggler('left');
  $scope.toggleRight = buildToggler('right');

    function buildToggler(componentId) {
      return function() {
        $mdSidenav(componentId).toggle();
      };
    }
});


app.controller('loginController', function($scope, $timeout, $mdSidenav) {
    $scope.pagetitle = 'login page';
});


app.controller('registerController', function($scope, $http) {

    $scope.pagetitle = 'register page';

    $scope.useremail = '';
    $scope.userpass = '';
    $scope.confirmpass = '';


    $scope.register = function () {
        $http({
            method: 'GET',
            url: '127.0.0.1:8000/api/register'
        }).then(function successCallback(response) {
            console.log($scope.useremail);
            console.log($scope.userpass);
            console.log($scope.confirmpass);
            console.log(response);


        }, function errorCallback(response) {
            console.log(response);
        });
    };



});
