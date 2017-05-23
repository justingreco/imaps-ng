angular.module('imapsNgApp')
.directive('coordinateSearch', function () {
	return {
		templateUrl: 'directives/sidePanel/locationSearch/coordinateSearch/coordinateSearch.html',
		restrict: 'EA',
		controller: function ($scope, mapUtils) {
			$scope.coordinateTypes = [
				{label: 'Decimal Degrees', xLabel: 'Longitude', yLabel: 'Latitude', wkid: 4326, xmin: -79.0, xmax:-78.2, ymin: 35.5, ymax: 36.1, xPrompt: -78.643, yPrompt: 35.778},			
				{label: 'Stateplane Feet', xLabel: 'Easting', yLabel: 'Northing', wkid: 2264, xmin: 1998000, xmax: 2222000, ymin: 644000, ymax: 848000, xPrompt: 2105888, yPrompt: 738558}
			];
			$scope.coordinateType = $scope.coordinateTypes[0];

			$scope.zoomToCoordinate = function () {
				require([
				  "esri/geometry/Point", "esri/layers/GraphicsLayer", "esri/graphic", "esri/symbols/PictureMarkerSymbol"
				], function(Point, GraphicsLayer, Graphic, PictureMarkerSymbol) {
				  var pt = null;
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
				  if ($scope.coordinateType.wkid === $scope.map.spatialReference.latestWkid) {
 					pt = new Point( {"x": $scope.coordinate.x, "y": $scope.coordinate.y, "spatialReference": {"wkid": $scope.coordinateType.wkid } });
 					$scope.map.centerAndZoom(pt, 11);
 					g = new Graphic().setGeometry(pt).setSymbol(symbol);
 					gl.add(g);
				  } else {
				  	mapUtils.project($scope.config.map.geometryServiceUrl, {"geometryType": "esriGeometryPoint", "geometries": [{"x": $scope.coordinate.x, "y": $scope.coordinate.y}]}, $scope.coordinateType.wkid, $scope.map.spatialReference.wkid).then(function (result) {
				  		if (result.geometries.length > 0) {
				  			pt =  new Point( {"x": result.geometries[0].x, "y": result.geometries[0].y, "spatialReference": {"wkid": $scope.map.spatialReference.latestWkid } });
				  			$scope.map.centerAndZoom(pt, 11);
							g = new Graphic().setGeometry(pt).setSymbol(symbol).setAttributes({});
		 					gl.add(g);
				  		}
				  	});
				  }
				});
			};

		},
		link: function (scope, element, attrs) {
			// scope.searches = [{label: 'For Property', value: 'property'}, {label: 'For Location', value: 'location'}];
			// scope.selectedSearch = scope.searches[0];
		}
	}
});
