import angular from 'angular';
import angularMeteor from 'angular-meteor';
import template from './sideNav.html';

class sideNavCtrl {
  constructor() {

  }
}

export default angular.module('sideNav', [
  angularMeteor
])
  .component('sideNav', {
    templateUrl: 'imports/components/sideNav/sideNav.html',
    controller: sideNavCtrl
  });
