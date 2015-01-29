/* global Firebase */

'use strict';

/**
 * @ngdoc function
 * @name tigrisApp.controller:LoginCtrl
 * @description
 * # LoginCtrl
 * Controller of the tigrisApp
 */
angular.module('tigrisApp')
  .controller('LoginCtrl', function ($scope, $firebase, $firebaseAuth, $state, FB_URL, Auth) {
    var ref = new Firebase(FB_URL),
   	// sync = $firebase(ref),
   	auth = $firebaseAuth(ref),
   	
   	fbRef = $firebase(ref.child('/users/facebook/')),
   	googleRef = $firebase(ref.child('/users/google/')),
   	twitterRef = $firebase(ref.child('/users/twitter/')),
	passRef = $firebase(ref.child('/users/pass/')),
	
	toggleLogin = '';

	$scope.loginEmailPass = function () {
		auth.$authWithPassword({
		  email: $scope.email,
		  password: $scope.password
		}).then(function(authData) {
		  console.log('Logged in as:', authData.uid);
		  passRef.$push(authData);
		}).catch(function(error) {
		  console.error('Error: ', error);
		});
	};

	$scope.registerEmailPass = function () {
		Auth.$createUser({
		  email: $scope.email,
		  password: $scope.password 
		}).then(function(userData) {
		  console.log('User ' + userData.uid + ' created successfully!');
		  return auth.$authWithPassword({
		    email: $scope.email,
		    password: $scope.password
		  });
		}).then(function(authData) {
		  console.log('logged in as:', authData.uid);
		  passRef.$push(authData);
		}).catch(function(error) {
		  console.error('Error: ', error);
		});
	};

	$scope.doLoginFb = function () {
		auth.$authWithOAuthPopup('facebook').then(function(authData) {
			fbRef.$push(authData).then(function () {
				console.log('authenticated successfully with payload:', authData);
			}).catch(function(error){
			console.log('authentication failed:', error);
			});
		});
	};

	$scope.doLoginGoogle = function () {
		auth.$authWithOAuthPopup('google').then(function(authData) {
			googleRef.$push(authData).then(function () {
				console.log('authenticated successfully with payload:', authData);
			}).catch(function(error){
			console.log('authentication failed:', error);
			});
		});
	};

	$scope.doLoginTwitter = function () {
		auth.$authWithOAuthPopup('twitter').then(function(authData) {
			twitterRef.$push(authData).then(function () {
				console.log('authenticated successfully with payload:', authData);
			}).catch(function(error){
			console.log('authentication failed:', error);
			});
		});
	};

	$scope.toggleLogin = function () {
		toggleLogin = true;
	};

	$scope.logout = function () {
		$state.go('login');
		auth.$unauth();
	};
  });
