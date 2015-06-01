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

			$scope.toolChanged = function (tool) {
				require(['dojo/on'], function (on) {
					angular.forEach($scope.tools, function (t, i) {
						t.highlighted = false;
					});
					tool.highlighted = true;
					$scope.tool = tool;
					$scope.map.setInfoWindowOnClick(false);
					if (tool.title === 'Identify') {
						$scope.webmap.clickEventHandle = on($scope.map, 'click', $scope.webmap.clickEventListener);
					} else {
						$scope.webmap.clickEventHandle.remove();
					}
				});
			}

		}, link: function (scope, element, attr) {
			scope.tools = [
				{icon: 'info-sign', title:'Identify', highlighted: true},
				{icon: 'hand-up', title:'Property Select', highlighted: false},
				{icon: 'road', title:'Streetview', highlighted: false},
				{icon: 'resize-horizontal', title:'Measure', highlighted: false},
				{icon: 'bookmark', title:'Bookmarks', highlighted: false},
				{icon: 'pencil', title:'Draw', highlighted: false},
				{icon: 'print', title:'Print', highlighted: false},
				{icon: 'trash', title:'Clear Map', highlighted: false}
			];
			scope.tool = scope.tools[0];
		}
	}
});
