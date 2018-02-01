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
    })
    .when('/contact-list', {
      templateUrl: 'client/pages/contact-list.html',
      controller: 'homeController'
    })
    .when('/settings', {
      templateUrl: 'client/pages/settings.html',
      controller: 'homeController'
    })
    .when('/project-list', {
      templateUrl: 'client/pages/project-list.html',
      controller: 'homeController'
    });
    $routeProvider.otherwise('/');
});

app.controller('homeController', function($scope, $timeout, $mdSidenav, $interval) {
  $scope.pagetitle = 'home page';
  var self = $scope, j= 0, counter = 0;

  self.mode = 'query';
  self.activated = true;
  self.determinateValue = 30;
  self.determinateValue2 = 30;

  self.showList = [ ];

   /**
    * Turn off or on the 5 themed loaders
    */
   self.toggleActivation = function() {
       if ( !self.activated ) self.showList = [ ];
       if (  self.activated ) {
         j = counter = 0;
         self.determinateValue = 30;
         self.determinateValue2 = 30;
       }
   };

   $interval(function() {
     self.determinateValue += 1;
     self.determinateValue2 += 1.5;

     if (self.determinateValue > 100) self.determinateValue = 30;
     if (self.determinateValue2 > 100) self.determinateValue2 = 30;

       // Incrementally start animation the five (5) Indeterminate,
       // themed progress circular bars

       if ( (j < 2) && !self.showList[j] && self.activated ) {
         self.showList[j] = true;
       }
       if ( counter++ % 4 === 0 ) j++;

       // Show the indicator in the "Used within Containers" after 200ms delay
       if ( j == 2 ) self.contained = "indeterminate";

   }, 100, 0, true);

   $interval(function() {
     self.mode = (self.mode == 'query' ? 'determinate' : 'query');
   }, 7200, 0, true);


   $scope.tasks = [
    'Bugs finders: PHP-malware-finder'
  ];

  $scope.completedTasks = [
    'AppChecker',
    'Code insight',
    'Exakat ',
    'PHP Analysis',
    'PHPCodeFixer',
    'PHP Code Static Analysis '
  ];

  $scope.add = function(task) {
    if ( task == '' || typeof task === 'undefined' ) {
      return false;
    }

    $scope.tasks.push(task);
    $scope.newTask = '';
  };

  $scope.markAsComplete = function(index) {
    var task = $scope.tasks[index];
    $scope.tasks.splice(index, 1);
    $scope.completedTasks.push(task);
  };

  $scope.markAsIncomplete = function(index) {
    var task = $scope.completedTasks[index];
    $scope.completedTasks.splice(index, 1);
    $scope.tasks.push(task);
  };

  $scope.getTotalTasks = function() {
    return $scope.tasks.length + $scope.completedTasks.length;
  };

  $scope.calculatePercent = function(count) {
    var total = $scope.getTotalTasks();
    return Math.round(100 / total * count);
  };
});
