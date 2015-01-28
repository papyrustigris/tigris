'use strict';

/**
 * @ngdoc function
 * @name tigrisApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the tigrisApp
 */
angular.module('tigrisApp')
  .controller('InquireCtrl', function ($scope, $firebase, $firebaseAuth) {
    var ref = new Firebase(FB_URL),
   	// sync = $firebase(ref),
   	auth = $firebaseAuth(ref);

   	$scope.submitInquiry = function () {
   		
   	}
   	
   	
  });