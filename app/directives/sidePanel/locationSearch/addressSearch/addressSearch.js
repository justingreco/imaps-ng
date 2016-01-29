angular.module('imapsNgApp')
.directive('addressSearch', function () {
	return {
		templateUrl: 'directives/sidePanel/locationSearch/addressSearch/addressSearch.html',
		restrict: 'EA',
		controller: function ($scope, locationFactory) {
			$scope.geocodeAddress = function () {
		        require([
		          "esri/geometry/Point", "esri/layers/GraphicsLayer", "esri/graphic", "esri/symbols/PictureMarkerSymbol"
		        ], function(Point, GraphicsLayer, Graphic, PictureMarkerSymbol) {
			        locationFactory.geocodeAddress($scope.streetAddress).then(function (response) {
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
					          var pt = new Point({"x": response.candidates[0].location.x, "y": response.candidates[0].location.y, "spatialReference": {"wkid": $scope.map.spatialReference.latestWkid } });							  
					          gl.add(new Graphic(pt, symbol));
					          
					          $scope.map.centerAndZoom(pt, 11);							
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
