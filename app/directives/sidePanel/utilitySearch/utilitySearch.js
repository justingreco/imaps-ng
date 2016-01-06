angular.module('imapsNgApp')
.directive('utilitySearch', function () {
	return {
		templateUrl: 'directives/sidePanel/utilitySearch/utilitySearch.html',
		restrict: 'E',
		controller: function ($scope, puma) {
			$scope.utilityLayers = [];
			$scope.utilityServices = [
				{title: 'Water Distribution', url: "http://gis.raleighnc.gov/arcgis/rest/services/PublicUtility/WaterDistribution/MapServer"},
				{title: 'Sewer Collection', url: "http://gis.raleighnc.gov/arcgis/rest/services/PublicUtility/SewerCollection/MapServer"},
				{title: 'Reclaimed Distribution', url: "http://gis.raleighnc.gov/arcgis/rest/services/PublicUtility/ReclaimedDistribution/MapServer"}
			];

			$scope.utilityServiceSelected = function (service) {
				puma.getUtilityLayers(service.url).then(function (data) {
					$scope.utilityLayers = data.layers;
				});
			};
			$scope.searchUtilities = function (id) {
				puma.findUtilitiesById($scope.utilityService.url + '/find', $scope.utilityLayer.id, id).then(function (data) {
					$scope.utilityResults = data.results;
					if (data.results.length > 0) {
						zoomToResult(data.results[0].geometry);
					}
					
				});
			};
			$scope.utilityResultClicked = function (geometry) {
				zoomToResult(geometry);
			};

			var zoomToResult = function (geometry) {
			  require(["esri/geometry/Point"], function (Point) {
					$scope.map.centerAndZoom(new Point(geometry), 13);
			  });
			};
		},
		link: function (scope, element, attrs) {

		}
	}
});