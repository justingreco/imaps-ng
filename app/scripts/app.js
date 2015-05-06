'use strict';

/**
 * @ngdoc overview
 * @name imapsNgApp
 * @description
 * # imapsNgApp
 *
 * Main module of the application.
 */
angular
  .module('imapsNgApp', [
    'ngAnimate',
    'ngCookies',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch',
    'pageslide-directive',
    'ui.bootstrap',
    'vr.directives.slider',
    'LocalStorageModule'
  ])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl'
      })
      .when('/about', {
        templateUrl: 'views/about.html',
        controller: 'AboutCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
  });
