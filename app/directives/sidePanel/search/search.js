angular.module('imapsNgApp')
.directive('search', function () {
	return {
		templateUrl: 'directives/sidePanel/search/search.html',
		restrict: 'EA',
		controller: function ($scope, $rootScope) {
			$rootScope.searches = [{label: 'For Property', value: 'property'}, {label: 'For Location', value: 'location'}];
			if ($rootScope.configName === 'puma') {
				$rootScope.searches.push({label: 'For Utilities', value: 'utilities'});
			}
			$rootScope.selectedSearch = $rootScope.searches[0];
		},
		link: function (scope, element, attrs) {
			// scope.searches = [{label: 'For Property', value: 'property'}, {label: 'For Location', value: 'location'}];
			// scope.selectedSearch = scope.searches[0];
		}
	}
});
