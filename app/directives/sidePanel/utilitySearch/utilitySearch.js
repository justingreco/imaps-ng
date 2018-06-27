angular.module('imapsNgApp')
.directive('utilitySearch', function () {
	return {
		templateUrl: 'directives/sidePanel/utilitySearch/utilitySearch.html',
		restrict: 'E',
		controller: function ($scope, puma) {
			$scope.utilityLayers = [];
			$scope.utilityServices = [
				{title: 'Water Distribution', url: "https://gis.raleighnc.gov/arcgis/rest/services/PublicUtility/WaterDistribution/MapServer",
				searchFields: 'FACILITYID', displayField: 'Facility Identifier'},
				{title: 'Sewer Collection', url: "https://gis.raleighnc.gov/arcgis/rest/services/PublicUtility/SewerCollection/MapServer",
				searchFields: 'FACILITYID', displayField: 'Facility Identifier'},
				{title: 'Reclaimed Distribution', url: "https://gis.raleighnc.gov/arcgis/rest/services/PublicUtility/ReclaimedDistribution/MapServer",
				searchFields: 'FACILITYID', displayField: 'Facility Identifier'},
				{title: 'CIP Projects', url: "https://gis.raleighnc.gov/arcgis/rest/services/PublicUtility/RPUD_Projects/MapServer",
				searchFields: 'PROJECT_NUMBER,PROJECT_NAME', displayField: 'Project Name'}
			];

			$scope.utilityServiceSelected = function (service) {
				puma.getUtilityLayers(service.url).then(function (data) {
					$scope.utilityLayers = data.layers;
				});
			};
			$scope.searchUtilities = function (id) {
				puma.findUtilitiesById($scope.utilityService.url + '/find', $scope.utilityLayer.id, id, $scope.utilityService.searchFields).then(function (data) {
					$scope.utilityResults = [];
					for (var i = 0;i < data.results.length;i++) {
						$scope.utilityResults.push({geometry: data.results[i].geometry, display: data.results[i].attributes[$scope.utilityService.displayField]})
					}
					if (data.results.length > 0) {
						zoomToResult(data.results[0].geometry);
					}

				});
			};
			$scope.utilityResultClicked = function (geometry) {
				zoomToResult(geometry);
			};

			var zoomToResult = function (geometry) {
			  require(["esri/geometry/Point", "esri/geometry/Polyline", "esri/geometry/Polygon", "esri/symbols/SimpleMarkerSymbol", "esri/symbols/SimpleLineSymbol", "esri/symbols/SimpleFillSymbol", "esri/layers/GraphicsLayer", "esri/graphic"], function (Point, Polyline, Polygon, SimpleMarkerSymbol, SimpleLineSymbol, SimpleFillSymbol, GraphicsLayer, Graphic) {
					var gl = $scope.map.getLayer('pumaGraphics');
					var g = null;
					if (!gl) {
						gl = new GraphicsLayer({id: 'pumaGraphics'});
						$scope.map.addLayer(gl);
					 }
					gl.clear();
					if (geometry.x) {
						$scope.map.centerAndZoom(new Point(geometry), 13);
						g = new Graphic(new Point(geometry), new SimpleMarkerSymbol({
						  "color": [0, 230, 255, 200],
						  "size": 12,
						  "angle": -30,
						  "xoffset": 0,
						  "yoffset": 0,
						  "type": "esriSMS",
						  "style": "esriSMSCircle",
						  "outline": {
						    "color": [255,255,255, 200],
						    "width": 1,
						    "type": "esriSLS",
						    "style": "esriSLSSolid"
						  }
						}));
						gl.add(g);
					} else if (geometry.paths) {
						$scope.map.setExtent(new Polyline(geometry).getExtent(), true);
						g = new Graphic(new Polyline(geometry), new SimpleLineSymbol({
						 "type": "esriSLS",
						 "style": "esriSLSSolid",
						 "color": [0, 230, 255, 200],
						 "width": 5
					 	}));
						gl.add(g);
					} else if (geometry.rings) {
						$scope.map.setExtent(new Polygon(geometry).getExtent(), true);
						g = new Graphic(geometry, new SimpleFillSymbol({
						  "type": "esriSFS",
						  "style": "esriSFSNull",
							"color": [0, 90, 100, 40],
						    "outline": {
						     "type": "esriSLS",
						     "style": "esriSLSSolid",
								 "color": [0, 90, 100, 40],
						     "width": 5
							 }
						}));
					}

			  });
			};
		},
		link: function (scope, element, attrs) {

		}
	}
});
