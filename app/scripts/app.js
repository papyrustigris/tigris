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
    'ui.router'
  ])
  
  .config(function ($stateProvider, $urlRouterProvider) {

    $stateProvider
      .state('main', {
        url: '/',
        templateUrl: 'views/main.html',
        controller: 'MainCtrl'
      })
      .state('about', {
        url: '/about',
        templateUrl: 'views/about.html',
        controller: 'AboutCtrl'
      })
      .state('payment', {
        url: '/payment',
        templateUrl: 'views/payment.html',
        controller: 'PaymentCtrl'
      })
      .state('portfolio', {
        url: '/portfolio',
        templateUrl: 'views/portfolio.html',
        controller: 'PortfolioCtrl'
      })
      .state('inquire', {
        url: '/inquire',
        templateUrl: 'views/inquire.html',
        controller: 'InquireCtrl'
      });
      
    $urlRouterProvider
      .otherwise('/');
  })

  .run(function($rootScope, $state, $stateParams) {
    // It's very handy to add references to $state and $stateParams to the $rootScope
    // so that you can access them from any scope within your applications.
    $rootScope.$state = $state;
    $rootScope.$stateParams = $stateParams;
  });