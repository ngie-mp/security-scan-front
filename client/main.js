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
      controller: 'homeController'
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
