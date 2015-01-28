'use strict';

/**
 * @ngdoc overview
 * @name tigrisApp
 * @description
 * # tigrisApp
 *
 * Main module of the application.
 */
angular
  .module('tigrisApp', [
    'ngAnimate',
    'ngCookies',
    'ngResource',
    'ngSanitize',
    'ngTouch',
    'ui.router',
    'firebase'
  ])

  .constant('FB_URL', 'https://papertigers.firebaseio.com/')
  
  .factory('Auth', ['$firebaseAuth', function($firebaseAuth) {
    var ref = new Firebase('https://papertigers.firebaseio.com/');
    return $firebaseAuth(ref);
  }])

  .config(function ($stateProvider, $urlRouterProvider) {

    $stateProvider
      .state('login', {
        url: '/',
        templateUrl: 'views/login.html',
        controller: 'LoginCtrl',
        authenticate: false
      })
      .state('about', {
        url: '/about',
        templateUrl: 'views/about.html',
        controller: 'AboutCtrl',
        authenticate: true 
      })
      .state('payment', {
        url: '/payment',
        templateUrl: 'views/payment.html',
        controller: 'PaymentCtrl',
        authenticate: true
      })
      .state('portfolio', {
        url: '/portfolio',
        templateUrl: 'views/portfolio.html',
        controller: 'PortfolioCtrl',
        authenticate: true
      })
      .state('inquire', {
        url: '/inquire',
        templateUrl: 'views/inquire.html',
        controller: 'InquireCtrl',
        authenticate: true
      });
      
    $urlRouterProvider
      .otherwise('/');
  })

  .run(function($rootScope, $state, $stateParams) {
    // It's very handy to add references to $state and $stateParams to the $rootScope
    // so that you can access them from any scope within your applications.
    $rootScope.$state = $state;
    $rootScope.$stateParams = $stateParams;

    $rootScope.$on("$stateChangeStart", function(event, toState, toParams, fromState, fromParams, Auth){
      if (toState.authenticate && !Auth.isAuthenticated()){
        // User isn’t authenticated
        $state.transitionTo("login");
        event.preventDefault(); 
      }
    });

    function authDataCallback(authData) {
      if (authData) {
        console.log('User ' + authData.uid + ' is logged in with ' + authData.provider);
        $state.go('about');
      } else {
        console.log('User is logged out');
        $state.go('login');
      }
    }
    // Register the callback to be fired every time auth state changes
    var ref = new Firebase('https://papertigers.firebaseio.com');
    ref.onAuth(authDataCallback);
    
    });
  
