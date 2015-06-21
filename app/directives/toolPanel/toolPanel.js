angular.module('imapsNgApp')
.directive('toolPanel', function ($timeout) {
	return {
		templateUrl: 'directives/toolPanel/toolPanel.html',
		restrict: 'E',
		controller: function ($scope, $rootScope) {
			$rootScope.toolsChecked = false;

			$rootScope.$watch('toolsChecked', function (checked) {
				$scope.toolsChecked = checked;
				$timeout(function () {
					if ($('tool-panel').overlaps($('base-map-panel')).length > 0) {
						$('base-map-panel').hide();
					} else {
						$('base-map-panel').show();
					}
				}, 500);

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
					if (tool.title === 'Identify') {
						$scope.webmap.clickEventHandle = on($scope.map, 'click', $scope.webmap.clickEventListener);
					} else {
						$scope.webmap.clickEventHandle.remove();
					}
				});
			}

		}, link: function (scope, element, attr) {
			scope.tools = [
				{icon: 'info-sign', title:'Identify', highlighted: true, height: 60, width: 300},
				{icon: 'hand-up', title:'Property Select', highlighted: false, height: 180, width: 280},
				{icon: 'road', title:'Streetview', highlighted: false, height: 300, width: 320},
				{icon: 'picture', title:'Oblique', highlighted: false, height: 300, width: 320},
				{icon: 'resize-horizontal', title:'Measure', highlighted: false, height: 200, width: 300},
				{icon: 'bookmark', title:'Bookmarks', highlighted: false, height: 240, width: 300},
				{icon: 'pencil', title:'Draw', highlighted: false, height: 200, width: 300},
				{icon: 'print', title:'Print', highlighted: false, height: 270, width: 300},
				{icon: 'trash', title:'Clear Map', highlighted: false, height: 34, width: 300}
			];
			scope.tool = scope.tools[0];
		}
	}
});
