'use strict';

/**
 * @ngdoc function
 * @name beerApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the beerApp
 */
angular.module('beerApp')
  .controller('MainCtrl', function ($scope, localStorageService) {

    var todosInStore = localStorageService.get('todos');

    $scope.todos = todosInStore || [];

    $scope.$watch('todos', function () {

      localStorageService.set('todos', $scope.todos);
    }, true);

    $scope.addTodo = function () {
      if ($scope.todos.indexOf($scope.todo) > -1) {
        console.log('in list');
      } else {
        $scope.todos.push($scope.todo);
        $scope.todo = '';
      }

    };

    $scope.removeTodo = function (index) {
      $scope.todos.splice(index, 1);
    };

  });
