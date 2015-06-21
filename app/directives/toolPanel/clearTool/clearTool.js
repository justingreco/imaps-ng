angular.module('imapsNgApp')
.directive('clearTool', function () {
	return {
		templateUrl: 'directives/toolPanel/clearTool/clearTool.html',
		restrict: 'E',
		controller: function ($scope) {
			$scope.$watch('tool', function (tool) {
				if (tool.title === 'Clear Map') {
					var layer = null;
					$scope.map.graphics.clear();
					angular.forEach($scope.map.graphicsLayerIds, function (id) {
						layer = $scope.map.getLayer(id).clear();
					});
				}
			});
		},
		link: function (scope, element, attrs) {

		}
	}
});
