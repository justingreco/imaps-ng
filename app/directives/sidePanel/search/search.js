angular.module('imapsNgApp')
.directive('search', function () {
	return {
		templateUrl: 'directives/sidePanel/search/search.html',
		restrict: 'EA',
		controller: function ($scope) {

		},
		link: function (scope, element, attrs) {
			scope.searches = [{label: 'For Property', value: 'property'}, {label: 'For Location', value: 'location'}];
			scope.selectedSearch = scope.searches[0];
		}
	}
});
