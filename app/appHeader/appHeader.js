angular.module('imapsNgApp')
.directive('appHeader', function () {
	return {
		templateUrl: 'appHeader/appHeader.html',
		restrict: 'E',
		controller: function ($scope, $rootScope) {
			$("app-header").appendTo('body');
			$rootScope.checked = true;
			$rootScope.$watch('config', function (config) {
				if (config) {
					$scope.title = config.title;
				}

			});

			var openFeedback = function () {
				$("feedback .modal").modal('show');
			};

			var openAbout = function () {
				$("about .modal").modal('show');
			};

			var openDisclaimer = function () {
				$("disclaimer .modal").modal('show');
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
