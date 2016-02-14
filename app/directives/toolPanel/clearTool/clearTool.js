angular.module('imapsNgApp')
.directive('clearTool', function () {
	return {
		templateUrl: 'directives/toolPanel/clearTool/clearTool.html',
		restrict: 'E',
		controller: function ($scope, $rootScope, $timeout) {
			$scope.$watch('tool', function (tool) {
				if (tool.title === 'Clear Map') {
					var layer = null;
					$scope.map.graphics.clear();
					angular.forEach($scope.map.graphicsLayerIds, function (id) {
						layer = $scope.map.getLayer(id).clear();
					});
					$rootScope.$broadcast('accountUpdate', [], false);

			  		$scope.$broadcast('accountSelected', {});
			  		$("#searchInput").typeahead('val', '');
			  					  		//$scope.tab = $scope.tabs[1];
			  		$rootScope.account = null;
			  		$scope.accounts = [];
			  		$scope.geometry = null;
			  		$scope.$broadcast('tabUpdated', 0);
				}
			});
		},
		link: function (scope, element, attrs) {

		}
	}
});
