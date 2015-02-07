'use strict';

/**
 * @ngdoc function
 * @name tigrisApp.controller:InboxCtrl
 * @description
 * # InboxCtrl
 * Controller of the tigrisApp
 */
angular.module('tigrisApp')
  .controller('InboxCtrl', function ($state, $scope, $firebase, $firebaseAuth, Auth, FB_URL) {

  	var ref = new Firebase(FB_URL),
  	authData = Auth.$getAuth(),
  	inboxRef = $firebase(ref.child('/messages/'+ authData.uid + '/inbox/'));

  	$scope.funktion = function () {
  		inboxRef.$push({
  			name: 'bob',
  			msg: 'hello motherfucking world'
  		});
  	};

  	$scope.inboxArray = function () {
  		var inboxArray = inboxRef.$asArray();
  	};

  });
