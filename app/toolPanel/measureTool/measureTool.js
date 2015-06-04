angular.module('imapsNgApp')
.directive('measureTool', function () {
	return {
		templateUrl: 'toolPanel/measureTool/measureTool.html',
		restrict: 'E',
		controller: function ($scope, $filter) {
			var fill, line, marker, gl, toolbar;

			var drawCompleted = function (e) {
				var wkid = $scope.unit.wkid;
				require(["esri/geometry/geometryEngine", "esri/units", "esri/graphic"], function(geometryEngine, units, Graphic)
				{
					var g = new Graphic(e.geometry);
					if (e.geometry.type === 'polygon') {
						console.log(geometryEngine.planarArea(e.geometry, wkid));
						g.setSymbol(fill);

					} else if (e.geometry.type === 'polyline') {
						console.log(geometryEngine.planarLength(e.geometry, wkid));
						g.setSymbol(line);
					} else if (e.geometry.type === 'point') {

					}
					gl.clear();
					gl.add(g);
				});

			};

			var init = function () {
				require(["esri/toolbars/draw", "esri/layers/GraphicsLayer", "esri/symbols/SimpleMarkerSymbol", "esri/symbols/SimpleFillSymbol", "esri/symbols/SimpleLineSymbol", "dojo/on"], function (Draw, GraphicsLayer, SimpleMarkerSymbol, SimpleFillSymbol, SimpleLineSymbol, on) {
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

					toolbar = new Draw($scope.map);
					toolbar.setFillSymbol(fill);
					toolbar.setLineSymbol(line);
					toolbar.setMarkerSymbol(marker);
					on(toolbar, 'draw-end', drawCompleted);
				});
			}

			$scope.$watch('map', function (map) {
				if (map) {
					init();
				}
			});


			$scope.units = [
				{label: 'Feet', name: 'FEET', wkid: 9002,type: 'length', active: true, multiplier: 3.28084},
				{label: 'Miles', name: 'MILES', wkid: 9035,type: 'length', active: false, multiplier: 0.000621371},
				{label: 'Meters', name: 'METERS', wkid: 9001,type: 'length', active: false, multiplier: 1},
				{label: 'Kilometers', name: 'KILOMETERS', wkid: 9036,type: 'length', active: false, multiplier: 0.001},
				{label: 'Yards', name: 'YARDS', wkid: 109002,type: 'length', active: false, multiplier: 1.09361},
				{label: 'Square Feet', name: 'SQUARE_FEET', wkid: 109405,type: 'area', active: true, multiplier: 10.7639},
				{label: 'Acres', name: 'ACRES', wkid: 109403,type: 'area', active: false, multiplier: 0.000247105},
				{label: 'Square Miles', name: 'SQUARE_MILES', wkid: 109413,type: 'area', active: false, multiplier: 0.000000386102},
				{label: 'Square Meters', name: 'SQUARE_METERS', wkid: 109404,type: 'area', active: false, multiplier: 1},
				{label: 'Square Kilometers', name: 'KILOMETERS', wkid: 109414,type: 'area', active: false, multiplier: 0.000001},
				{label: 'Square Yards', name: 'SQUARE_YARDS', wkid: 109443,type: 'area', active: false},
				{label: 'Decimal Degrees', name: 'DECIMAL_DEGREES',type: 'coordinates', active: true},
				{label: 'Degrees Minutes Seconds', name: 'DEGREE_MINUTE_SECONDS',type: 'coordinates', active: false},
				{label: 'Feet', name: 'FEET',type: 'coordinates', active: false}
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
					toolbar.activate(type.shape);
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

			$scope.$watch('tool', function (tool) {
				if (tool.title === 'Measure') {
					//tool.height = ($scope.geometry) ? 250 : 180;
					if (!toolbar) {
						toolbar = new Draw($scope.map);
					}
				} else {
					if (toolbar) {
						toolbar.deactivate();
						//$scope.selectType = '';
					}
				}
			});
		},
		link: function (scope, element, attrs) {

		}
	}
});
