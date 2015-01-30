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
     

      .state('about', {
        url: '/',
        templateUrl: 'views/about.html',
        controller: 'AboutCtrl',
        resolve: {
        // controller will not be loaded until $requireAuth resolves
        // Auth refers to our $firebaseAuth wrapper in the example above
        'currentAuth': ['Auth', function(Auth) {
          // $requireAuth returns a promise so the resolve waits for it to complete
          // If the promise is rejected, it will throw a $stateChangeError (see above)
          return Auth.$waitForAuth();
          }]
        }
      })
      .state('login', {
        url: '/login',
        templateUrl: 'views/login.html',
        controller: 'LoginCtrl',
        resolve: {
        // controller will not be loaded until $waitForAuth resolves
        // Auth refers to our $firebaseAuth wrapper in the example above
        'currentAuth': ['Auth', function(Auth) {
          // $waitForAuth returns a promise so the resolve waits for it to complete
          return Auth.$waitForAuth();
          }]
        }
      })
      .state('portfolio', {
        url: '/portfolio',
        templateUrl: 'views/portfolio.html',
        controller: 'PortfolioCtrl',
        resolve: {
        // controller will not be loaded until $requireAuth resolves
        // Auth refers to our $firebaseAuth wrapper in the example above
        'currentAuth': ['Auth', function(Auth) {
            // $requireAuth returns a promise so the resolve waits for it to complete
            // If the promise is rejected, it will throw a $stateChangeError (see above)
            return Auth.$waitForAuth();
          }]
        }
      })
      .state('inquire', {
        url: '/inquire',
        templateUrl: 'views/inquire.html',
        controller: 'InquireCtrl',
        resolve: {
        // controller will not be loaded until $requireAuth resolves
        // Auth refers to our $firebaseAuth wrapper in the example above
        'currentAuth': ['Auth', function(Auth) {
            // $requireAuth returns a promise so the resolve waits for it to complete
            // If the promise is rejected, it will throw a $stateChangeError (see above)
            return Auth.$waitForAuth();
          }]
        }
      })
      .state('account', {
        url: '/account',
        templateUrl: 'views/account.html',
        controller: 'AccountCtrl',
        resolve: {
        // controller will not be loaded until $requireAuth resolves
        // Auth refers to our $firebaseAuth wrapper in the example above
        'currentAuth': ['Auth', function(Auth) {
          // $requireAuth returns a promise so the resolve waits for it to complete
          // If the promise is rejected, it will throw a $stateChangeError (see above)
          return Auth.$requireAuth();
          }]
        }
      })
      .state('messages', {
        url: '/messages',
        templateUrl: 'views/messages.html',
        controller: 'MessagesCtrl',
        resolve: {
        // controller will not be loaded until $requireAuth resolves
        // Auth refers to our $firebaseAuth wrapper in the example above
        'currentAuth': ['Auth', function(Auth) {
          // $requireAuth returns a promise so the resolve waits for it to complete
          // If the promise is rejected, it will throw a $stateChangeError (see above)
          return Auth.$requireAuth();
          }]
        }
      })
      .state('payment', {
        url: '/payment',
        templateUrl: 'views/payment.html',
        controller: 'PaymentCtrl',
        resolve: {
        // controller will not be loaded until $requireAuth resolves
        // Auth refers to our $firebaseAuth wrapper in the example above
        'currentAuth': ['Auth', function(Auth) {
          // $requireAuth returns a promise so the resolve waits for it to complete
          // If the promise is rejected, it will throw a $stateChangeError (see above)
            return Auth.$requireAuth();
          }]
        }
      });
      
      
    $urlRouterProvider
      .otherwise('/');
  })

  .run(function($rootScope, $state, $stateParams, Auth) {
    // It's very handy to add references to $state and $stateParams to the $rootScope
    // so that you can access them from any scope within your applications.
    $rootScope.$state = $state;
    $rootScope.$stateParams = $stateParams;
    
    $rootScope.$on('$stateChangeError', function(event, toState, toParams, fromState, fromParams, error) {
    // We can catch the error thrown when the $requireAuth promise is rejected
    // and redirect the user back to the home page
    if (error === 'AUTH_REQUIRED') {
      $state.go('about');
      }
    });
  });
  
