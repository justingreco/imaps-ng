'use strict';

/**
 * @ngdoc function
 * @name imapsNgApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the imapsNgApp
 */
angular.module('imapsNgApp')
  .controller('MainCtrl', function ($rootScope, config) {
  	$rootScope.checked = true;
    config.loadConfig('../config/config.txt').then(function (data) {
    	$rootScope.config = data;
    });
  });
