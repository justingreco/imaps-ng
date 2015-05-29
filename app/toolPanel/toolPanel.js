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
				angular.forEach($scope.tools, function (t, i) {
					t.highlighted = false;
				});
				tool.highlighted = true;
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
