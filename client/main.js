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

app.controller('homeController', function($scope,
  $timeout, $mdSidenav, $interval, $http, $mdDialog,
  $mdBottomSheet)
  {
  var url;

  $scope.toggleLeft = buildToggler('left');

  function buildToggler(componentId) {
    return function() {
      $mdSidenav(componentId).toggle();
   };
  }


  $scope.showDonateMethod = function(ev) {
    $mdDialog.show({
      controller: 'homeController',
      templateUrl: 'client/templates/dialog.html',
      parent: angular.element(document.body),
      targetEvent: ev,
      clickOutsideToClose: true
    })
    .then(function(answer) {
      $scope.method = 'You said the information was "' + answer + '".';
    }, function() {
      $scope.method = 'You cancelled the dialog.';
    });
  };


  $scope.showGridBottomSheet = function() {
    $scope.alert = '';
    $mdBottomSheet.show({
      templateUrl: '/client/templates/bottom-menu.html',
      controller: 'homeController'
    }).then(function() {

    }).catch(function(error) {
    });
  };

  $scope.showLoader = false;
  $scope.showStatus = false;
  $scope.plugins = {};

  $scope.sendGitUrl = function sendGitUrl() {
    $scope.showLoader = true;
    $scope.showStatus = true;

    url = 'http://localhost/api/process', data = { "url" : $scope.git_url, },
        config='contenttype';

    $http.post(url, data, config, {'Access-Control-Allow-Origin':'*'})
     .then(function (response) {
      $scope.showLoader = false;
      if(response.data.status === "success" ) {
        $scope.projectStatus = "Checking up you git repository..";
        $scope.projectStatus = "Scanned finished";
        $scope.plugins = response.data.plugins;
        console.log(response.data.plugins)
      }
      else {
        console.log("error");
        $scope.projectStatus = "Oh... not a git repository :(";
      }
      $scope.showStatus = true;
     }, function (response) {});
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
    template : '<div><div ng-click="collapse()" class="title">'+
    '{{title}}<i class="material-icons">brightness_1</i></div><div class="collapse-content">'+
    '<div class="content" ng-transclude></div></div><div>',
    link: function(scope, element, attrs){
      var isOpen = scope.isOpen ? true : false;
      var collapse_content_div = element[0].getElementsByClassName('collapse-content');
      var collapse_content_height = collapse_content_div[0].clientHeight;
      if(isOpen){
        collapse_content_div[0].style.height = "0";
      }else{
        collapse_content_div[0].style.height = "100%";
      }
      scope.collapse = function(){
        if(isOpen){
          collapse_content_div[0].style.height = "0";
          isOpen = false;

        }else{
          collapse_content_div[0].style.height = "100%";
          isOpen = true;
        }
      }
    }
  }
}]);

app.filter('newline', function() {
  return function(text) {
    return text.replace('\n\r\n', "<br><br>");
  };
});
