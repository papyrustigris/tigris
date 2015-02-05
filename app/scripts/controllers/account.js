'use strict';

/**
 * @ngdoc function
 * @name tigrisApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the tigrisApp
 */
angular.module('tigrisApp')
  .controller('AboutCtrl', ['$scope', '$firebaseAuth', 'currentAuth',  function($scope, $firebaseAuth, currentAuth) {
    var ref = new Firebase('https://papertigers.firebaseio.com/');
    var auth = $firebaseAuth(ref);
    
  }]);
