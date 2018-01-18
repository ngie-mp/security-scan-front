import angular from 'angular';
import angularMeteor from 'angular-meteor';
import template from './todoList.html';

class TodosListCtrl {
  constructor() {
    this.tasks = [{
      what: 'project one',
      who: 'URL',
      notes: 'description/issues'
    }, {
      what: 'project two',
      who: 'URL',
      notes: 'description/issues'
    }, {
      what: 'project three',
      who: 'URL',
      notes: 'description/issues'
    }];
  }
}

export default angular.module('todoList', [
  angularMeteor
])
  .component('todoList', {
    templateUrl: 'imports/components/todoList/todoList.html',
    controller: TodosListCtrl
  });
