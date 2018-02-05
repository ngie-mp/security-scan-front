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

app.controller('homeController', function($scope, $timeout, $mdSidenav, $interval, $http) {
  $scope.toggleLeft = buildToggler('left');
  $scope.toggleRight = buildToggler('right');

  function buildToggler(componentId) {
    return function() {
      $mdSidenav(componentId).toggle();
   };
  }

  $scope.pagetitle = 'home page';
  $scope.showLoader = false;
  $scope.showStatus = false;

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

   $scope.sendGitUrl = function sendGitUrl() {
     $scope.showLoader = true;
     $scope.showStatus = true;
     var url = 'http://localhost/api/urltest',
         data = {
           "url" : $scope.git_url,
         },
         config='contenttype';
     $http.post(url, data, config, {'Access-Control-Allow-Origin':'*'})
     .then(function (response) {
        console.log(response.data.status);
        console.log(typeof(response.data.status));
        $scope.showLoader = false;
        if(response.data.status === "success" ) {
          $scope.projectStatus = "cloning into our servers";
        }
        else {
          $scope.modal = "not a git repository :(";
        }
        console.log(response);
        $scope.showStatus = true;

       }, function (response) {
      });
     }
});
