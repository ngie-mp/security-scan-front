import angular from 'angular';
import angularMeteor from 'angular-meteor';
import ngMaterial from 'angular-material';
import ngAnimate from 'angular-animate';
import todoList from '/imports/components/todoList/todoList.js';

var app = angular.module('scanApp', [
  angularMeteor,
  ngMaterial,
  todoList.name
]);
