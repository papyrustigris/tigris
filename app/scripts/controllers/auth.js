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
  .controller("AuthCtrl", ["$scope", "$timeout", "Auth", function($scope, $timeout, Auth) {
	  $scope.auth = Auth;
	  $scope.auth.$onAuth(function(authData) {
	    $timeout(function() {
	      $scope.user = authData;
	    });
	  });
	}]);