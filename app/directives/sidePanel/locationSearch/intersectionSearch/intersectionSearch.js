angular.module('imapsNgApp')
.directive('intersectionSearch', function () {
	return {
		templateUrl: 'directives/sidePanel/locationSearch/intersectionSearch/intersectionSearch.html',
		restrict: 'EA',
		controller: function ($scope, $http, locationFactory) {
			$scope.primaryStreet = null;
			$scope.primaryStreets = function(street){
		        return locationFactory.getStreets(street).then(function (response) {
		        	return response.features;
		        });
		    };
		    $scope.primaryStreetSelected = function ($item, $model, $label) {
				locationFactory.getIntersectingStreets($item.geometry).then(function (response) {
					$scope.intersectingStreets = response.features;
				});
		    };
		    $scope.intersectionSelected = function () {
				require([
				  "esri/geometry/Point", "esri/layers/GraphicsLayer", "esri/graphic", "esri/symbols/PictureMarkerSymbol"
				], function(Point, GraphicsLayer, Graphic, PictureMarkerSymbol) {
				  	
				  	locationFactory.geocodeAddress($scope.primaryStreet.attributes.CARTONAME + ' & ' +$scope.intersectingStreet.attributes.CARTONAME).then(function (response) {
						if (response.candidates.length > 0) {

							  var gl = $scope.map.getLayer('locationGraphics');
							  var g = null;
							  if (!gl) {
							  	gl = new GraphicsLayer({id: 'locationGraphics'});
							  	$scope.map.addLayer(gl);
							  }
							  gl.clear();
							  var symbol =  new PictureMarkerSymbol({
							    "url":"images/esriGreenPin16x26.png",
							    "height":26,
							    "width":16,
							    "type":"esriPMS"
							  });							  
							  gl.add(new Graphic(new Point({"x": response.candidates[0].location.x, "y": response.candidates[0].location.y, "spatialReference": {"wkid": $scope.map.spatialReference.latestWkid } }), symbol));

							$scope.map.centerAndZoom(response.candidates[0].location, 10);
						}
					});
				});				
		    };
		},
		link: function (scope, element, attrs) {
			// scope.searches = [{label: 'For Property', value: 'property'}, {label: 'For Location', value: 'location'}];
			// scope.selectedSearch = scope.searches[0];
		}
	}
});
