import angular from 'angular';
import angularMeteor from 'angular-meteor';
import template from './sideNav.html';

class sideNavCtrl {
  constructor($mdSidenav) {
    this.pagetitle = 'home page';
    this.toggleLeft = buildToggler('left');
    this.toggleRight = buildToggler('right');
      function buildToggler(componentId) {
        return function() {
          $mdSidenav(componentId).toggle();
        };
      }
  }
}

export default angular.module('sideNav', [
  angularMeteor
])
  .component('sideNav', {
    templateUrl: 'imports/components/sideNav/sideNav.html',
    controller: sideNavCtrl
  });
