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
    'ngReactGrid',
    'angulartics',
    'angulartics.google.analytics',
    'colorpicker.module'
  ]).config(['localStorageServiceProvider', '$locationProvider', function (localStorageServiceProvider, $locationProvider) {
    localStorageServiceProvider.setPrefix('imaps');
    $locationProvider.html5Mode({enabled: true, requireBase: false});
          // set up your dojoConfig
      var dojoConfig = {
        baseUrl: '.',
        deps: ['app/main'],
        packages: [
          'app',
          'dijit',
          'dojo',
          'dojox',
          'dstore',
          'dgrid',
          'xstyle',
          'put-selector',
          'esri'
        ]
      };
  }]).filter('titleCase', function() {
    return function(input) {
      input = input || '';
      return input.replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});
    };
  }).directive('onlyDigits', function () {
    return {
      require: 'ngModel',
      restrict: 'A',
      link: function (scope, element, attr, ctrl) {
        function inputValue(val) {
          if (val) {
            var digits = val.toString().replace(/[^0-9]/g, '');

            if (digits !== val) {
              ctrl.$setViewValue(digits);
              ctrl.$render();
            }
            return parseInt(digits,10);
          }
          return undefined;
        }
        ctrl.$parsers.push(inputValue);
      }
    };
});
