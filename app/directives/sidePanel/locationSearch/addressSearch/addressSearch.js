angular.module('imapsNgApp')
.directive('addressSearch', function () {
	return {
		templateUrl: 'directives/sidePanel/locationSearch/addressSearch/addressSearch.html',
		restrict: 'EA',
		controller: function ($scope, locationFactory) {
			$scope.geocodeAddress = function () {
				locationFactory.geocodeAddress($scope.streetAddress).then(function (response) {
					if (response.candidates.length > 0) {
						$scope.map.centerAndZoom(response.candidates[0].location, 10);
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
