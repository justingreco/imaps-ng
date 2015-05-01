angular.module('imapsNgApp')
.directive('mapPanel', function () {
	return {
		templateUrl: 'mapPanel/mapPanel.html',
		restrict: 'E',
		controller: function ($scope) {
			require(["esri/map", "esri/arcgis/utils","esri/SpatialReference", "dojo/domReady!"], function(Map, arcgisUtils,SpatialReference) { 
			    arcgisUtils.createMap("0757b2fd0e6f44dd8d8fefbfc09aa8eb","map").then(function(response){
			    	$scope.webmap = response;
			    	$scope.map = response.map;

			    	console.log(response);
			    	$scope.$digest();
			    });
			});	
		},
		link: function (scope, element, attrs) {
		
		}
	}
});