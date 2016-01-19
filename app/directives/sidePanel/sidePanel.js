angular.module('imapsNgApp')
.directive('sidePanel', function ($timeout, $window, $rootScope) {
	return {
		templateUrl: 'directives/sidePanel/sidePanel.html',
		restrict: 'E',
		controller: function ($scope, $rootScope, $window) {
			$scope.psWidth = "300px"
			if ($window.innerWidth < 321) {
				$scope.psWidth = "280px";
			}
			$scope.checked = true;
			$scope.searchDir = {open: true, overflow: 'none', padding: 30};
			$scope.layersDir = {open: false, overflow: 'auto', padding: 15};
			$scope.searchTypeStatus = {
			    isopen: false
			  };
			$rootScope.$watch('checked', function (checked) {
				$scope.checked = checked;
			});
/*			$timeout(function () {
				$("pageslide").appendTo(".wrapper");
				$(".wrapper").appendTo("body");
			});*/


			$scope.propertySearchSelected = function ($event) {
			    $event.preventDefault();
			    $event.stopPropagation();

				if ($event.target.text === 'For Property') {
					$rootScope.selectedSearch = $rootScope.searches[0];
				} else if ($event.target.text === 'For Location') {
					$rootScope.selectedSearch = $rootScope.searches[1];
				} else if ($event.target.text === 'For Utilities') {
					$rootScope.selectedSearch = $rootScope.searches[2];
				}
			    $scope.searchTypeStatus.isopen = false;	
			    $scope.searchDir.open = true;
			    $scope.layersDir.open = false;			
			}


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
					$scope.$broadcast('refreshSlider');
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

			$rootScope.$on('mapLoaded', function () {
				scope.resetPanel();
			});
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
