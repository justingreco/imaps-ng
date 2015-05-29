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
    'ngTouch',
    'ngAnimate',
    'ngCookies',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch',
    'pageslide-directive',
    'ui.bootstrap',
    'vr.directives.slider',
    'LocalStorageModule',
    'angular-loading-bar',
    'cfp.loadingBar',
    'ngCsv',
    'ngReactGrid'
  ]).config(['localStorageServiceProvider', function (localStorageServiceProvider) {
    localStorageServiceProvider.setPrefix('imaps');

  }]).filter('titleCase', function() {
    return function(input) {
      input = input || '';
      return input.replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});
    };
  });
