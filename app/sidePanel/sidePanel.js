angular.module('imapsNgApp')
.directive('sidePanel', function ($timeout) {
	return {
		templateUrl: 'sidePanel/sidePanel.html',
		restrict: 'E',
		controller: function ($scope, $rootScope) {
			$scope.checked = true;

			$rootScope.$watch('checked', function (checked) {
				$scope.checked = checked;
			});
			$timeout(function () {
				//$("pageslide").appendTo(".wrapper");
				$("app-header").appendTo("body");
			});
		}, link: function (scope, element, attr) {

		}
	}
});
