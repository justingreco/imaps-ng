'use strict';

/**
 * @ngdoc function
 * @name imapsNgApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the imapsNgApp
 */
angular.module('imapsNgApp')
  .controller('MainCtrl', function ($rootScope, $location, config) {
  	$rootScope.checked = true;
    $rootScope.loading = true;
    var configUrl = 'config/config.json';
    if ($location.search().config) {
    	configUrl = 'config/' + $location.search().config + '.json';
    	$rootScope.configName = $location.search().config;
    }
    config.loadConfig(configUrl).then(function (data) {
    	$rootScope.config = data;
    });

  });
