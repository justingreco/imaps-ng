angular.module('imapsNgApp')
.directive('toolPanel', function ($timeout) {
	return {
		templateUrl: 'toolPanel/toolPanel.html',
		restrict: 'E',
		controller: function ($scope, $rootScope) {
			$rootScope.toolsChecked = false;

			$rootScope.$watch('toolsChecked', function (checked) {
				$scope.toolsChecked = checked;
			});

			$scope.toolHeaderClick = function (checked) {
				$rootScope.toolsChecked = !checked;				
			}
		}, link: function (scope, element, attr) {

		}
	}
});