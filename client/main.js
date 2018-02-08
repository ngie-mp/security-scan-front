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
    .when('/contact-list', {
      templateUrl: 'client/pages/contact-list.html',
      controller: 'contactController'
    })
    .when('/settings', {
      templateUrl: 'client/pages/settings.html',
      controller: 'homeController'
    })
    .when('/project-list', {
      templateUrl: 'client/pages/project-list.html',
      controller: 'projectListController'
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
  $scope.pluginTotals = {};

  $scope.sendGitUrl = function sendGitUrl() {
    $scope.showLoader = true;
    $scope.showStatus = true;
    $scope.projectStatus = "Analyzing your git repository..";

    url = 'http://localhost/api/process', data = {
      "url" : $scope.git_url, "email": $scope.user_email},
        config='contenttype';

    $http.post(url, data, config, {'Access-Control-Allow-Origin':'*'})
     .then(function (response) {
      $scope.showLoader = false;

      if(response.data.status === "success" ) {
        $scope.projectStatus = "Done, check your mail!";
        $scope.plugins = response.data.plugins;
        $scope.pluginTotals = response.data.plugins.totals;
        console.log($scope.user_email);
        console.log(response.data.plugins);
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
    templateUrl : '/client/templates/collapser.html',
    link: function(scope, element, attrs){
      var isOpen = scope.isOpen ? true : false;
      var collapse_content_div = element[0].getElementsByClassName('collapse-content');
      var collapse_content_height = collapse_content_div[0].clientHeight;
      if(isOpen){
        collapse_content_div[0].style.height = "0";
      }else{
        collapse_content_div[0].style.height = "auto";
      }
      scope.collapse = function(){
        if(isOpen){
          collapse_content_div[0].style.height = "auto";
          isOpen = false;

        }else{
          collapse_content_div[0].style.height = "0";
          isOpen = true;
        }
      }
    }
  }
}]);

app.controller('contactController', function($scope, $timeout) {
    $scope.pageTitle = "Contact";
});

app.controller('projectListController', function($scope, $timeout) {
    $scope.pageTitle = "Project list";
});

app.controller('loginController', function($scope, $timeout) {
    $scope.pageTitle = "User";
});
