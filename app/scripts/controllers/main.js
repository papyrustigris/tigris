'use strict';

/**
 * @ngdoc function
 * @name tigrisApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the tigrisApp
 */
angular.module('tigrisApp')
  .controller('MainCtrl', function ($scope) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
  });
