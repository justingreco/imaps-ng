angular.module('imapsNgApp')
.directive('locationSearch', function () {
	return {
		templateUrl: 'directives/sidePanel/locationSearch/locationSearch.html',
		restrict: 'E',
		controller: function ($scope) {

		},
		link: function (scope, element, attrs) {
			scope.locationSearchTypes = [
				{label: 'Address', value: 'address'},
				{label: 'Intersection', value: 'intersection'},
				{label: 'Place of Interest', value: 'poi'},
				{label: 'Subdivision', value: 'subdivision'},	
				{label: 'Coordinate', value: 'coordinate'}																
			];
			scope.locationSearchType = scope.locationSearchTypes[0];
		}
	}
});