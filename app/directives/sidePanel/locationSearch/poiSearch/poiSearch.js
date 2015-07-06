angular.module('imapsNgApp')
.directive('poiSearch', function () {
	return {
		templateUrl: 'directives/sidePanel/locationSearch/poiSearch/poiSearch.html',
		restrict: 'EA',
		controller: function ($scope, locationFactory) {
			$scope.places = [];
			$scope.placeTypes = [];
			locationFactory.getPlaceTypes().then(function (response) {
				$scope.placeTypes = [];
				angular.forEach(response.features, function (f) {
					$scope.placeTypes.push(f.attributes.ICON);
				})
			});
			$scope.placeTypeSelected = function (type) {
				locationFactory.getPlacesByType(type).then(function (response) {
					$scope.places = response.features;			
				});
			};
			$scope.placeSelected = function (place) {
				$scope.map.centerAndZoom(place.geometry, 11);
			}
		},
		link: function (scope, element, attrs) {
			// scope.searches = [{label: 'For Property', value: 'property'}, {label: 'For Location', value: 'location'}];
			// scope.selectedSearch = scope.searches[0];
		}
	}
});
