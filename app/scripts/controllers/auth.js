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
  .controller('AuthCtrl', ['$state', '$scope', '$timeout', 'Auth', function($state, $scope, $timeout, Auth) {
	  $scope.auth = Auth;
	  $scope.auth.$onAuth(function(authData) {
	    $timeout(function() {
	      $scope.user = authData;
	      $state.go('about');
	    });
	  });
	}]);