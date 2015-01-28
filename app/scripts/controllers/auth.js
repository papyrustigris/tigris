/* global Firebase */

'use strict';

/**
 * @ngdoc function
 * @name tigrisApp.controller:AuthCtrl
 * @description
 * # AuthCtrl
 * Controller of the tigrisApp
 */
angular.module('tigrisApp')
  .controller('AuthCtrl', ['$scope', 'Auth', function ($scope, Auth) {
    $scope.auth = Auth;
    $scope.user = $scope.auth.$getAuth();
  }]);