angular.module('imapsNgApp')
.directive('overviewPanel', function ($timeout) {
	return {
		templateUrl: 'overviewPanel/overviewPanel.html',
		restrict: 'E',
		controller: function ($scope, $rootScope) {
			$rootScope.overviewChecked = false;

			$rootScope.$watch('overviewChecked', function (checked) {
				$scope.overviewChecked = checked;
			});

			$scope.overviewHeaderClick = function (checked) {
				$rootScope.overviewChecked = !checked;
				(checked) ? $scope.overview.hide() : $scope.overview.show();
			}


			$scope.$watch('map', function (map) {
				if (map) {
					require([
				        "esri/dijit/OverviewMap"
				      ], function (
				        OverviewMap
				      ) {


				        $scope.overview = new OverviewMap({
				          map: map,
				          visible: true,
				          width: 180,
									height: 180
				        }, "overview");
								$scope.overview.startup();
				      });
				}

			});


		}, link: function (scope, element, attr) {

		}
	}
});
