'use strict';

/**
 * @ngdoc function
 * @name tigrisApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the tigrisApp
 */
angular.module('tigrisApp')
  .controller('InquiryCtrl', function ($scope, $firebase, $firebaseAuth, FB_URL) {
    var ref = new Firebase(FB_URL),
    // sync = $firebase(ref),
    auth = $firebaseAuth(ref),
    
    msgRef = $firebase(ref.child('/Inquiries/'));

   	$scope.submitInquiry = function () {
   		msgRef.$push({ 
        name: $scope.name,
        email: $scope.email,
        message: $scope.message 
      }).then(function(msgRef) {
          console.log(msgRef.key());
          $scope.name = $scope.email = $scope.message = null;
             // key for the new ly created record
        }, function(error) {
          console.log("Error:", error);
        });
    };
  });