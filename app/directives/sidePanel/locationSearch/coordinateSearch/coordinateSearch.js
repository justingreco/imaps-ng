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
				  "esri/geometry/Point" 
				], function(Point) {
				  var pt = null;
				  if ($scope.coordinateType.wkid === $scope.map.spatialReference.wkid) {
 					pt = new Point( {"x": $scope.coordinate.x, "y": $scope.coordinate.y, "spatialReference": {"wkid": $scope.coordinateType.wkid } });
 					$scope.map.centerAndZoom(pt, 11);
				  } else {
				  	mapUtils.project($scope.config.map.geometryServiceUrl, {"geometryType": "esriGeometryPoint", "geometries": [{"x": $scope.coordinate.x, "y": $scope.coordinate.y}]}, $scope.coordinateType.wkid, $scope.map.spatialReference.wkid).then(function (result) {
				  		if (result.geometries.length > 0) {
				  			pt = result.geometries[0];
				  			$scope.map.centerAndZoom(pt, 11);
				  		}
				  	});
				  }
				  $scope.map.centerAndZoom(pt, 11);
				});
			};

		},
		link: function (scope, element, attrs) {
			// scope.searches = [{label: 'For Property', value: 'property'}, {label: 'For Location', value: 'location'}];
			// scope.selectedSearch = scope.searches[0];
		}
	}
});
