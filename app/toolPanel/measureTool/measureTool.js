angular.module('imapsNgApp')
.directive('measureTool', function () {
	return {
		templateUrl: 'toolPanel/measureTool/measureTool.html',
		restrict: 'E',
		controller: function ($scope, $filter) {
			var fill, line, marker, gl;

			var init = function () {
				require(["esri/toolbars/draw", "esri/layers/GraphicsLayer", "esri/symbols/SimpleMarkerSymbol", "esri/symbols/SimpleFillSymbol", "esri/symbols/SimpleLineSymbol"], function (Draw, GraphicsLayer, SimpleMarkerSymbol, SimpleFillSymbol, SimpleLineSymbol) {
					gl = new GraphicsLayer();
					$scope.map.addLayer(gl);
					fill = new SimpleFillSymbol({
					  "type": "esriSFS",
					  "style": "esriSFSSolid",
						"color": [31,117,254,40],
					    "outline": {
					     "type": "esriSLS",
					     "style": "esriSLSSolid",
							"color": [31,117,254,200],
					     "width": 3
						 }
					});
					line = new SimpleLineSymbol({
						"type": "esriSLS",
						"style": "esriSLSSolid",
						"color": [31,117,254,255],
						"width": 3
					});
					marker = new SimpleMarkerSymbol({
					"type": "esriSMS",
					 "style": "esriSMSSquare",
					 "color": [76,115,0,255],
					 "size": 8,
					 "angle": 0,
					 "xoffset": 0,
					 "yoffset": 0,
					 "outline":
					  {
					  "color": [152,230,0,255],
					   "width": 1
					  }
					});

					draw = new Draw($scope.map);
					draw.setFillSymbol(fill);
					draw.setLineSymbol(line);
					draw.setMarkerSymbol(marker);
				});
			}

			$scope.$watch('map', function (map) {
				if (map) {
					init();
				}
			});


			$scope.units = [
				{label: 'Feet', name: 'FEET', type: 'length', active: true},
				{label: 'Miles', name: 'MILES', type: 'length', active: false},
				{label: 'Meters', name: 'METERS', type: 'length', active: false},
				{label: 'Kilometers', name: 'KILOMETERS', type: 'length', active: false},
				{label: 'Yards', name: 'YARDS', type: 'length', active: false},
				{label: 'Square Feet', name: 'SQUARE_FEET', type: 'area', active: true},
				{label: 'Acres', name: 'ACRES', type: 'area', active: false},
				{label: 'Square Miles', name: 'SQUARE_MILES', type: 'area', active: false},
				{label: 'Square Meters', name: 'SQUARE_METERS', type: 'area', active: false},
				{label: 'Square Kilometers', name: 'KILOMETERS', type: 'area', active: false},
				{label: 'Square Yards', name: 'SQUARE_YARDS', type: 'area', active: false},
				{label: 'Decimal Degrees', name: 'DECIMAL_DEGREES', type: 'coordinates', active: true},
				{label: 'Degrees Minutes Seconds', name: 'DEGREE_MINUTE_SECONDS', type: 'coordinates', active: false},
				{label: 'Feet', name: 'FEET', type: 'coordinates', active: false}
			];

			$scope.filterUnits = function (unit) {
				if ($scope.measureType) {
					return unit.type === $scope.measureType.type;
				}
			};

			$scope.$watch('measureType', function (type) {
				if (type) {
					var matches = $filter('filter')($scope.units, function (u) {
						return u.type === type && u.active;
					});
					if (matches.length > 0) {
						$scope.unit = matches[0];
					}
					draw.activate(type.shape);
				}
			});

			$scope.unitChanged = function (unit) {
				var units = $filter('filter')($scope.units, function (u) {
					return $scope.measureType.type === u.type;
				});
				angular.forEach(units, function (u) {
					u.active = false;
				});

				unit.active = true;
			};
		},
		link: function (scope, element, attrs) {

		}
	}
});
