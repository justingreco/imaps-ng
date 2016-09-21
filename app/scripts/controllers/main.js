'use strict';

/**
 * @ngdoc function
 * @name imapsNgApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the imapsNgApp
 */
angular.module('imapsNgApp')
  .controller('MainCtrl', function ($rootScope, $location, $timeout, config) {
  	$rootScope.checked = true;
    $rootScope.loading = true;
   
    $timeout(function () {
        $('#loading').remove();
        $('#loadingBackground').remove();
        $rootScope.loading = false;
    }, 1000);

    var getBrowser = function () {
        var userAgent = navigator.userAgent.toLowerCase();
        var chrome = /chrome/.test(userAgent);
        var safari= /webkit/.test(userAgent);
        var opera=/opera/.test(userAgent);
        var mozilla= /mozilla/.test( userAgent ) && !/(compatible|webkit)/.test( userAgent ) || /firefox/.test(userAgent);
        var msie=(/msie/.test( userAgent ) || /mozilla/.test( userAgent )) && !/firefox/.test( userAgent ) && !/opera/.test( userAgent );
     
        
        if(chrome) return "chrome";
        if(safari) return "safari";
        if(msie) return "ie";
        if(mozilla) return "mozilla";
        if(opera) return "opera";

        
    };    
    if(getBrowser()=='mozilla'){
    $('body').addClass('mozilla');
    }
    else if(getBrowser()=='ie'){
        $('body').addClass('ie');
    }
    else if(getBrowser()=='opera'){
        $('body').addClass('opera');
    }
    else if (getBrowser()=='safari'){ // safari
        $('body').addClass('safari');
    }
    else if(getBrowser()=='chrome'){
        $('body').addClass('chrome');
    };
    var ua = navigator.userAgent.toLowerCase();
    var isAndroid = ua.indexOf("android") > -1; //&& ua.indexOf("mobile");
    if(isAndroid) {

        $timeout(function () {
          $('pageslide').addClass('android');
          $('toggle-button').addClass('android');
          $('tool-panel').addClass('android');  
        });
       
    }    
    var configUrl = 'config/config.json';
    if ($location.search().config) {
    	configUrl = 'config/' + $location.search().config + '.json';
    	$rootScope.configName = $location.search().config;
    }
    config.loadConfig(configUrl).then(function (data) {
    	$rootScope.config = data;
    });
    $rootScope.touch = (('ontouchstart' in window) || (navigator.MaxTouchPoints > 0) || (navigator.msMaxTouchPoints > 0));
  });
