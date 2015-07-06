angular.module('imapsNgApp')
.directive('intersectionSearch', function () {
	return {
		templateUrl: 'directives/sidePanel/locationSearch/intersectionSearch/intersectionSearch.html',
		restrict: 'EA',
		controller: function ($scope, $rootScope) {

		},
		link: function (scope, element, attrs) {
			// scope.searches = [{label: 'For Property', value: 'property'}, {label: 'For Location', value: 'location'}];
			// scope.selectedSearch = scope.searches[0];
		}
	}
});
