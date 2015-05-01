angular.module('imapsNgApp')
.directive('appHeader', function () {
	return {
		templateUrl: 'appHeader/appHeader.html',
		restrict: 'E',
		controller: function ($scope, $rootScope) {
			$rootScope.checked = true;
			$rootScope.$watch('config', function (config) {
				if (config) {
					$scope.title = config.title;
				}
				
			});
			$scope.btnClick = function () {
				$rootScope.checked = !$rootScope.checked;
			}
			$scope.titleClick = function () {
				console.log(this.$root.config);
				this.title = this.$root.config.title;
			}

		}
	}
});