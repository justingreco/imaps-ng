angular.module('imapsNgApp')
.directive('propertyDeeds', function () {
	return {
		templateUrl: 'sidePanel/propertySearch/propertyDeeds/propertyDeeds.html',
		restrict: 'E',
		controller: function ($scope) {
			console.log($scope.deeds);

		},
		link: function (scope, element, attrs) {
			
		}
	}
});