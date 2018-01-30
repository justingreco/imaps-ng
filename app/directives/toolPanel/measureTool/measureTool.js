angular.module('imapsNgApp')
.directive('measureTool', function () {
	return {
		templateUrl: 'directives/toolPanel/measureTool/measureTool.html',
		restrict: 'E',
		controller: function ($scope, $filter, $timeout) {
			var fill, line, marker, gl, toolbar, measureGeom,
				totalLength = 0,
				currentSegment = 0,
				lastSegment = 0,
				clickPt = null,
				clickHandle = null,
				moveHandle = null,
				coordHandle = null,
				current = null,
				mouseDown = null;
			$scope.measurement = '--';
			$scope.currentCoords = '';

			var getCoordinate = function (x, y, unit) {
				var dd = spToDd(x, y),
					text = "";
				if (unit === 'FEET') {
					text = y.toFixed(2) + " N " + x.toFixed(2) + " E";
				} else if (unit === 'DECIMAL_DEGREES') {
					text = "Lat: " + dd[0].toFixed(6) + " Lng: " + dd[1].toFixed(6);
				} else if (unit === 'DEGREE_MINUTE_SECONDS') {
					var point = new GeoPoint(dd[1], dd[0]);
					text = point.getLatDeg() + " " + point.getLonDeg();
				}
				return text;
			};

			var measure = function (geometry, unit) {
				require(["esri/geometry/geometryEngine"], function (geometryEngine) {
					var measurement = null;
					measureGeom = geometry;
					if (geometry.type === 'polygon') {
						measurement = geometryEngine.planarArea(geometry, unit).toFixed(2);
					} else if (geometry.type === 'polyline') {
						measurement = geometryEngine.planarLength(geometry, unit).toFixed(2);
						stopLengthMeasure();
					} else if (geometry.type === 'point') {
						measurement = getCoordinate(geometry.x, geometry.y, unit);
					}
					$timeout(function () {
						$scope.measurement = measurement;
					});
				});
			};

			var drawCompleted = function (e) {
				var wkid = $scope.unit.wkid;
				require(["esri/units", "esri/graphic"], function(units, Graphic)
				{
					var g = new Graphic(e.geometry);
					if (e.geometry.type === 'polygon') {
						measure(e.geometry, wkid);
						g.setSymbol(fill);

					} else if (e.geometry.type === 'polyline') {
						measure(e.geometry, wkid);
						g.setSymbol(line);
					} else if (e.geometry.type === 'point') {
						measure(e.geometry, wkid);
						g.setSymbol(marker);
					}
					gl.clear();
					gl.add(g);
					mouseDown = $scope.map.on('mouse-down', drawStarted);
				});


			};

			var drawStarted = function () {
				if (gl.graphics.length > 0) {
					gl.remove(gl.graphics[0]);
				}
				mouseDown.remove();
			}

			var stopLengthMeasure = function () {
				if (moveHandle) {
					moveHandle.remove();
					moveHandle = null;
				}

				clickPt = null;
				totalLength = 0;
				currentSegment = 0;
				lastSegment = 0;
			};

			var lengthClick = function (e) {
				require(['dojo/on'], function (on) {

						clickPt = e.mapPoint;

						lastSegment += currentSegment;

				if (!moveHandle) {
					moveHandle = on($scope.map, 'mouse-move', lengthMouseMove);
				}
			});
			}

			var updateLength = function (mapPoint) {
				require(["esri/geometry/Polyline", "esri/geometry/geometryEngine"], function (Polyline, GeometryEngine) {
					var pl = new Polyline($scope.map.spatialReference);
					pl.addPath([clickPt, mapPoint]);
					currentSegment = GeometryEngine.planarLength(pl, $scope.unit.wkid);
					totalLength = lastSegment + currentSegment;
					//currentSegment = GeometryEngine.distance(clickPt, e.mapPoint, $scope.unit.wkid);
					$timeout(function () {
						$scope.measurement = totalLength.toFixed(2);
					});
				});

			};

			var convertLengths = function (unit, oldUnit) {
				try {
					var qty = new Qty(totalLength + oldUnit.abbr);
					totalLength = qty.to(unit.abbr).scalar;
					qty = new Qty(currentSegment + oldUnit.abbr);
					currentSegment = qty.to(unit.abbr).scalar;
					qty = new Qty(lastSegment + oldUnit.abbr);
					lastSegment = qty.to(unit.abbr).scalar;
				} catch (err) {
					
				}
			};

			var lengthMouseMove = function (e) {
					updateLength(e.mapPoint);
			};

			var startLengthMeasure = function () {
				require(['dojo/on'], function (on) {
					clickHandle = on($scope.map, 'click', lengthClick);
				});
			};

			var updateCurrentCoordinate = function (pt, unit) {
				var coord = getCoordinate(pt.x, pt.y, unit);
				$timeout(function () {
					$scope.currentCoords = coord;
				});
			};

			var stopDisplayCoordinates = function () {
				if (coordHandle) {
					coordHandle.remove();
					coordHandle = null;
					current = null;
				}
			};

			var startDisplayingCoordinates = function () {
				require(['dojo/on'], function (on) {
					var coord = '';
					coordHandle = on($scope.map, 'mouse-move', function (e) {
						current = e.mapPoint;
						updateCurrentCoordinate(e.mapPoint, $scope.unit.wkid);
					});
				});
			};

			var init = function () {
				require(["esri/toolbars/draw", "esri/layers/GraphicsLayer", "esri/symbols/PictureMarkerSymbol", "esri/symbols/SimpleFillSymbol", "esri/symbols/SimpleLineSymbol", "dojo/on"], function (Draw, GraphicsLayer, PictureMarkerSymbol, SimpleFillSymbol, SimpleLineSymbol, on) {
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
					marker =  new PictureMarkerSymbol({
				    "url":"images/esriGreenPin16x26.png",
				    "height":26,
				    "width":16,
				    "type":"esriPMS"
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
				{label: 'Feet', name: 'FEET', wkid: 9002,type: 'length', active: true, multiplier: 3.28084, abbr: 'ft'},
				{label: 'Miles', name: 'MILES', wkid: 9035,type: 'length', active: false, multiplier: 0.000621371, abbr: 'mi'},
				{label: 'Meters', name: 'METERS', wkid: 9001,type: 'length', active: false, multiplier: 1, abbr: 'm'},
				{label: 'Kilometers', name: 'KILOMETERS', wkid: 9036,type: 'length', active: false, multiplier: 0.001, abbr: 'km'},
				{label: 'Yards', name: 'YARDS', wkid: 109002,type: 'length', active: false, multiplier: 1.09361, abbr: 'yd'},
				{label: 'Square Feet', name: 'SQUARE_FEET', wkid: 109405,type: 'area', active: true, multiplier: 10.7639, abbr: 'ft²'},
				{label: 'Acres', name: 'ACRES', wkid: 109403,type: 'area', active: false, multiplier: 0.000247105, abbr: 'acre'},
				{label: 'Square Miles', name: 'SQUARE_MILES', wkid: 109413,type: 'area', active: false, multiplier: 0.000000386102, abbr: 'mi²'},
				{label: 'Square Meters', name: 'SQUARE_METERS', wkid: 109404,type: 'area', active: false, multiplier: 1, abbr: 'm²'},
				{label: 'Square Kilometers', name: 'KILOMETERS', wkid: 109414,type: 'area', active: false, multiplier: 0.000001, abbr: 'km²'},
				{label: 'Square Yards', name: 'SQUARE_YARDS', wkid: 109443,type: 'area', active: false, abbr: 'yd²'},
				{label: 'Decimal Degrees', wkid: 'DECIMAL_DEGREES',type: 'coordinates', active: true},
				{label: 'Degrees Minutes Seconds', wkid: 'DEGREE_MINUTE_SECONDS',type: 'coordinates', active: false},
				{label: 'Feet', wkid: 'FEET',type: 'coordinates', active: false}
			];

			$scope.filterUnits = function (unit) {
				if ($scope.measureType) {
					return unit.type === $scope.measureType.type;
				}
			};

			$scope.$watch('measureType', function (type) {
				if ($scope.tool.title === "Measure") {
				if (type) {
						$scope.tool.height = 270;
						var matches = $filter('filter')($scope.units, function (u) {
							return u.type === type.type && u.active;
						});
						if (matches.length > 0) {
							$scope.unit = matches[0];
						}
						if (type.shape === 'polygon' || type.shape === 'polyline') {
							toolbar.activate((($scope.freehandMeasure) ? 'freehand': '')+type.shape);
						} else {
							toolbar.activate(type.shape);
						}
						
						if (type.shape === 'polyline') {
							startLengthMeasure();
						} else {
							stopLengthMeasure();
							if (clickHandle) {
								clickHandle.remove();
								clickHandle = null;
							}
						}
						if (type.type === 'coordinates') {
							startDisplayingCoordinates();
						} else {
							stopDisplayCoordinates();
						}
						measureGeom = null;
						$scope.measurement = '--';
						gl.clear();
					} else {
					  $scope.tool.height = 130;
					}
				}
			});

			$scope.$watch("unit", function (unit, oldUnit) {
				if ($scope.measureType) {
					var units = $filter('filter')($scope.units, function (u) {
						return $scope.measureType.type === u.type;
					});
					angular.forEach(units, function (u) {
						u.active = false;
					});

					unit.active = true;
					if (measureGeom) {
						measure(measureGeom, $scope.unit.wkid);
					}

					if ($scope.measureType.shape === 'polyline' && oldUnit) {
						convertLengths(unit, oldUnit);
					}
					if ($scope.measureType.type === 'coordinates') {
						if (current) {
							updateCurrentCoordinate(current, $scope.unit.wkid);
						}
					}
				}


			});

			$scope.measureFreehand = function (measureType) {
				toolbar.activate((($scope.freehandMeasure) ? 'freehand' : '') + measureType.shape);
			};

			$scope.$watch('tool', function (tool) {
				if (tool.title === 'Measure') {
					//tool.height = ($scope.geometry) ? 250 : 180;
					if (!toolbar) {
						toolbar = new Draw($scope.map);
					}
					if ($scope.measureType) {
						tool.height = 270;
					} else {
						tool.height = 130;
					}
				} else {
					if (toolbar) {
						toolbar.deactivate();
						$scope.measureType = null;
						stopLengthMeasure();
						stopDisplayCoordinates();
						if (clickHandle) {
							clickHandle.remove();
							clickHandle = null;
						}
					}
				}
			});
		},
		link: function (scope, element, attrs) {

		}
	}
});
