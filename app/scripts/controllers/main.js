/* global Firebase */

'use strict';

/**
 * @ngdoc function
 * @name tigrisApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the tigrisApp
 */
angular.module('tigrisApp')
  .controller('MainCtrl', function ($scope, $firebase) {
    var ref = new Firebase('https://papertigers.firebaseio.com/users');
	var sync = $firebase(ref);

	$scope.doLoginFb = function () {
		ref.authWithOAuthPopup('facebook', function (error, authData) {
			if (error) {
				console.log('login failed!', error);
			} else {
				sync.$push(authData).then(function () {
					console.log('authenticated successfully with payload:', authData);	
				});
			}
		});
	};

	$scope.doLoginGoogle = function () {
		ref.authWithOAuthPopup('google', function (error, authData) {
			if (error) {
				console.log('login failed!', error);
			} else {
				sync.$push(authData).then(function () {
					console.log('authenticated successfully with payload:', authData);	
				});
			}
		});
	};

	$scope.doLoginTwitter = function () {
		ref.authWithOAuthPopup('twitter', function (error, authData) {
			if (error) {
				console.log('login failed!', error);
			} else {
				sync.$push(authData).then(function () {
					console.log('authenticated successfully with payload:', authData);	
				});
			}
		});
	};
  });
