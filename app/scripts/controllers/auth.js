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
  .controller('AuthCtrl', 
  	function ($state, $scope, $firebase, $firebaseAuth, $timeout, Auth, FB_URL) {
	  
	  $scope.auth = Auth;
	  $scope.auth.$onAuth(function(authData) {
	    $timeout(function() {
	      $scope.user = authData;
	      
	      if (!authData) {
	      	$state.go('login');
	      } else {
	      	$state.go('inbox');
	      }; 
	      	
	    });
	  });
	

    var ref = new Firebase(FB_URL),
   	// sync = $firebase(ref),
   	auth = $firebaseAuth(ref),
   	
   //	fbRef = $firebase(ref.child('/users/facebook/')),
   //	googleRef = $firebase(ref.child('/users/google/')),
   //	twitterRef = $firebase(ref.child('/users/twitter/')),
   //	passRef = $firebase(ref.child('/users/pass/')),
	
	usersRef = $firebase(ref.child('/users/')),

	toggleLogin = '';

	$scope.loginEmailPass = function () {

		auth.$authWithPassword({
		  email: $scope.email,
		  password: $scope.password,
		}).then(function(authData) {

		  var userRef = $firebase(ref.child('/users/'+authData.uid));
		  userRef.$set(authData);
		  console.log('Logged in as:', authData.uid);

		}).catch(function(error) {
		  console.error('Error: ', error);
		  $scope.message = ''+error;
		});
	};

	$scope.registerEmailPass = function () {

		Auth.$createUser({
		  email: $scope.email,
		  password: $scope.password,
		}).then(function(userData) {

		  console.log('User ' + userData.uid + ' created successfully!');
		  return auth.$authWithPassword({
		    email: $scope.email,
		    password: $scope.password
		  });

		}).then(function(authData) {

		  var userRef = $firebase(ref.child('/users/'+authData.uid));
		  userRef.$set(authData);
		  console.log('Logged in as:', authData.uid);

		}).catch(function(error) {

		  console.error('Error: ', error);
		  $scope.message = ''+error;

		});
	};

	$scope.doLoginFb = function () {

		auth.$authWithOAuthPopup('facebook').then(function(authData) {
			
			var userRef = $firebase(ref.child('/users/'+authData.uid));

			userRef.$set(authData).then(function (ref) {
				var seshKey = ref.key();
				console.log('key: '+ seshKey);
			});
			
			userRef.$push(authData.uid).then(function () {
				console.log('authenticated successfully with payload:', authData.uid);
			}).catch(function(error){
			console.log('authentication failed:', error);
			$scope.message = ''+error;
			});
		});
	};

	$scope.doLoginGoogle = function () {

		auth.$authWithOAuthPopup('google').then(function(authData) {
			
			var userRef = $firebase(ref.child('/users/'+authData.uid));

			userRef.$set(authData).then(function (ref) {
				var seshKey = ref.key();
				console.log('key: '+ seshKey);
			});
			
			userRef.$push(authData.uid).then(function () {
				console.log('authenticated successfully with payload:', authData.uid);
			}).catch(function(error){
				console.log('authentication failed:', error);
				$scope.message = ''+error;
			});
		});
	};

	$scope.doLoginTwitter = function () {

		auth.$authWithOAuthPopup('twitter').then(function(authData) {
			
			var userRef = $firebase(ref.child('/users/'+authData.uid));

			userRef.$set(authData).then(function (ref) {
				var seshKey = ref.key();
				console.log('key: '+ seshKey);
			});
			
			userRef.$push(authData.uid).then(function () {
				console.log('authenticated successfully with payload:', authData.uid);
			}).catch(function(error){
				console.log('authentication failed:', error);
				$scope.message = ''+error;
			});
		});
	};

	$scope.toggleLogin = function () {
		toggleLogin = true;
	};

	$scope.logout = function () {
		Auth.$unauth();	
	};
  });
