angular.module('imapsNgApp')
.directive('subdivisionSearch', function () {
	return {
		templateUrl: 'directives/sidePanel/locationSearch/subdivisionSearch/subdivisionSearch.html',
		restrict: 'EA',
		controller: function ($scope, $http, locationFactory) {
			$scope.subdivisions = function(subdivision){
		        return locationFactory.getSubdivision(subdivision).then(function (response) {
/*		        	var subdivs = [];
		        	angular.forEach(response.features, function (f) {
		        		subdivs.push(f.attributes.NAME);
		        	});*/
		        	return response.features;
		        });
		    };
		    $scope.subdivisionSelected = function ($item, $model, $label) {
				require(["esri/geometry/Polygon"], function(Polygon) {
					var poly = new Polygon($item.geometry);
					poly.spatialReference = $scope.map.spatialReference;
					$scope.map.setExtent(poly.getExtent(), true);
				});
		    };
		},
		link: function (scope, element, attrs) {
			// scope.searches = [{label: 'For Property', value: 'property'}, {label: 'For Location', value: 'location'}];
			// scope.selectedSearch = scope.searches[0];
		}
	}
});
