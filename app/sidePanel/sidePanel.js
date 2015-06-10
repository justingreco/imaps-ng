angular.module('imapsNgApp')
.directive('sidePanel', function ($timeout, $window) {
	return {
		templateUrl: 'sidePanel/sidePanel.html',
		restrict: 'E',
		controller: function ($scope, $rootScope) {
			$scope.checked = true;
			$scope.searchDir = {open: true, overflow: 'none', padding: 30};
			$scope.layersDir = {open: false, overflow: 'auto', padding: 15};

			$rootScope.$watch('checked', function (checked) {
				$scope.checked = checked;
			});
			$timeout(function () {
				//$("pageslide").appendTo(".wrapper");
			//	$(".wrapper").appendTo("body");
			});

			$scope.$watch('searchDir.open', function (open) {
				if (open) {
					$scope.layersDir.open = false;
					$scope.resetPanel();
				}
			});

			$scope.$watch('layersDir.open', function (open) {
				if (open) {
					$scope.searchDir.open = false;
					$scope.resetPanel();
				}
			});
		}, link: function (scope, element, attr) {
			scope.resetPanel = function () {
				var headings = document.getElementsByClassName('panel-heading');
				var body = document.getElementsByClassName('panel-body')
				if (headings.length > 0) {
					var height = $window.innerHeight;
					height -= headings.length * headings[0].offsetHeight;
					var dir = null;
					if (scope.searchDir.open) {
						dir = scope.searchDir;
					} else if (scope.layersDir.open) {
						dir = scope.layersDir;
					}
					if (dir) {
						scope.accordionHeight = {'height': height - $('pageslide').position().top - dir.padding + 'px', overflow: dir.overflow};
					}
				}
			};
			$timeout(scope.resetPanel.bind(element), 500);
/*			var w = angular.element($window)
			angular.element($window).bind('resize', resetPanel.bind(element));*/

	        var w = angular.element($window);
	        scope.getWindowDimensions = function () {
	            return {
	                'h': w.height(),
	                'w': w.width()
	            };
	        };
	        scope.$watch(scope.getWindowDimensions, function (newValue, oldValue) {
	            scope.resetPanel();

	        }, true);

	        w.bind('resize', function () {
	            scope.$apply();
	        });
		}
	}
});
