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
  	inboxRef = $firebase(ref.child('/messages/'+ authData.uid + '/inbox/')),
    inboxList = inboxRef.$asArray();

    inboxList.$loaded().then(function() {
      $scope.list = inboxList;
    });

  	$scope.funktion = function () {
  		inboxRef.$push({
  			name: 'billy',
  			msg: 'ayaella'
  		});
  	};

  	$scope.inboxArray = function () {
  		var inboxArray = inboxRef.$asArray();
      console.log(inboxArray);
  	};

  });
