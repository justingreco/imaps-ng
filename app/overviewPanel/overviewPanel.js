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
			}


			$scope.$watch('map', function (map) {
				if (map) {
					require([
				        "esri/dijit/OverviewMap"
				      ], function (
				        OverviewMap
				      ) {


				        var overviewMapDijit = new OverviewMap({
				          map: map,
				          visible: true,
				          width: '100%'
				        }, "overview");
				        overviewMapDijit.startup();
				      });					
				}

			});


		}, link: function (scope, element, attr) {

		}
	}
});