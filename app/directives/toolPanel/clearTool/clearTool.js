angular.module('imapsNgApp')
.directive('clearTool', function () {
	return {
		templateUrl: 'directives/toolPanel/clearTool/clearTool.html',
		restrict: 'E',
		controller: function ($scope, $rootScope) {
			$scope.$watch('tool', function (tool) {
				if (tool.title === 'Clear Map') {
					var layer = null;
					$scope.map.graphics.clear();
					angular.forEach($scope.map.graphicsLayerIds, function (id) {
						layer = $scope.map.getLayer(id).clear();
					});
					$rootScope.$broadcast('accountUpdate', []);
			  		//$scope.tab = $scope.tabs[1];
			  		$scope.$broadcast('accountSelected', {});
			  		$("#searchInput").typeahead('val', '');
				}
			});
		},
		link: function (scope, element, attrs) {

		}
	}
});
