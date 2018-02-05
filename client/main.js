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

  $scope.testType = 'the test type name here';
  $scope.showLoader = false;
  $scope.showStatus = false;

  $scope.sendGitUrl = function sendGitUrl() {
   $scope.showLoader = true;
   $scope.showStatus = true;
   var url = 'http://localhost/api/process',
       data = {
         "url" : $scope.git_url,
       },
       config='contenttype';
   $http.post(url, data, config, {'Access-Control-Allow-Origin':'*'})
   .then(function (response) {
      console.log(response.data.status);
      console.log(typeof(response.data.status));
      $scope.showLoader = false;
      if(response.status === 200 ) {
        if(response.data.status === "success") {
            $scope.projectStatus = "cloning into our servers";
        }
        else {
          $scope.modal = "not a git repository :(";
        }
      }
      else {
        console.log("error");
      }
      console.log(response);
      $scope.showStatus = true;

     }, function (response) {
    });
   }
});


app.directive('collapse',[function(){
  return{
    restrict: 'E',
    scope : {
      title: '@',
      isOpen : '='
    },
    transclude: true,
    template : '<div class="collapser"><div ng-click="collapse()" class="title">'+
    '{{title}}</div><div class="collapse-content">'+
    '<div class="content" ng-transclude></div></div><div>',
    link: function(scope, element, attrs){
      var isOpen = scope.isOpen ? true : false;
      var collapse_content_div = element[0].getElementsByClassName('collapse-content');
      var collapse_content_height = collapse_content_div[0].clientHeight;
      if(isOpen){
        collapse_content_div[0].style.height = 0;
      }else{
        collapse_content_div[0].style.height = collapse_content_height+"px";
      }
      scope.collapse = function(){
        if(isOpen){
          collapse_content_div[0].style.height = collapse_content_height+"px";
          isOpen = false;

        }else{
          collapse_content_div[0].style.height = 0;
           isOpen = true;
        }
      }
    }
  }

}]);
