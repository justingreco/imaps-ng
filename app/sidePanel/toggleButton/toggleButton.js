angular.module('imapsNgApp')
.directive('toggleButton', function ($window) {
	return {
		templateUrl: 'sidePanel/toggleButton/toggleButton.html',
		restrict: 'E',
		controller: function ($scope, $rootScope) {
			$scope.toggleSidePanel = function () {
				$rootScope.checked = !$rootScope.checked;
			};
		}, link: function (scope, element, attr) {
			var w = angular.element($window);
			var moveToggle = function (newValue) {
				console.log(newValue.h/2 - 52);
				scope.toggleTop = newValue.h/2 - 52;
			};
			scope.getWindowDimensions = function () {
					return {
							'h': w.height(),
							'w': w.width()
					};
			};
			scope.$watch(scope.getWindowDimensions, function (newValue, oldValue) {
					moveToggle(newValue);

			}, true);

			w.bind('resize', function () {
					scope.$apply();
			});
		}
	}
});
