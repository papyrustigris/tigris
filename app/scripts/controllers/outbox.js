'use strict';

/**
 * @ngdoc function
 * @name tigrisApp.controller:OutboxCtrl
 * @description
 * # OutboxCtrl
 * Controller of the tigrisApp
 */
angular.module('tigrisApp')
  .controller('OutboxCtrl', function ($state, $scope, $firebase, $firebaseAuth, Auth, FB_URL) {

  	var ref = new Firebase(FB_URL),
  	authData = Auth.$getAuth(),
  	outboxRef = $firebase(ref.child('/UserMessages/'+ authData.uid + '/outbox/'));

  	$scope.funktion = function () {
  		outboxRef.$push({
  			msg: $scope.msgBox
  		});
  	};
  });
