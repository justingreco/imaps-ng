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

			var openFeedback = function () {

			};

			var openAbout = function () {

			};

			var openDisclaimer = function () {

			};

			$scope.headerClick = function (item) {
				switch (item) {
					case 'Feedback':
						openFeedback();
					break;
					case 'About':
						openAbout();
					break;
					case 'Disclaimer':
						openDisclaimer();
					break;
				}
			};

			$scope.btnClick = function () {
				$rootScope.checked = !$rootScope.checked;
/*				if (!$rootScope.checked) {
					$("base-map-panel").css('right', 0);
				} else {
					$("base-map-panel").css('right', 300);
				}*/

			};
			$scope.titleClick = function () {
				this.title = this.$root.config.title;
			};

		}
	}
});
