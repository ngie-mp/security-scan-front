import angular from 'angular';
import angularMeteor from 'angular-meteor';
import ngMaterial from 'angular-material';
import ngAnimate from 'angular-animate';
import template from './todoList.html';

class TodosListCtrl {
  constructor() {
    this.tasks = [{
      what: 'project-mvc',
      who: '/user/php-project.git',
      notes: 'description/issues'
    }, {
      what: 'laravel',
      who: '/user/php-project.git',
      notes: 'description/issues'
    }, {
      what: 'symfony',
      who: '/user/php-project.git',
      notes: 'description/issues'
    }];
  }
}

export default angular.module('todoList', [
  angularMeteor,
  ngMaterial,
  ngAnimate
])
  .component('todoList', {
    templateUrl: 'imports/components/todoList/todoList.html',
    controller: TodosListCtrl
  });
