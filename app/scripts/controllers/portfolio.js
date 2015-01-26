'use strict';

/**
 * @ngdoc function
 * @name tigrisApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the tigrisApp
 */
angular.module('tigrisApp')
  .controller('PortfolioCtrl', function ($scope) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
  });