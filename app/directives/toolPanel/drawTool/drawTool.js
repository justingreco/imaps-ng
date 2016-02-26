angular.module('imapsNgApp')
.directive('drawTool', function () {
	return {
		templateUrl: 'directives/toolPanel/drawTool/drawTool.html',
		restrict: 'E',
		controller: function ($scope) {
			var toolbar, fill, line, marker, textSymbol, gl, color, haloColor;
			$scope.drawText = '';
			$scope.drawColor = '#FF0000';
			$scope.drawFontSize = 12;
			var drawCompleted = function (e) {
				require(["esri/units", "esri/graphic", "esri/symbols/TextSymbol"], function(units, Graphic, TextSymbol)
				{
					var g = new Graphic(e.geometry);
					g.setAttributes({'GraphicsLayer': 'Drawing Graphics Layer'});
					setColor();
					if (e.geometry.type === 'polygon') {
						g.setSymbol(fill);
					} else if (e.geometry.type === 'polyline') {
						g.setSymbol(line);
					} else if (e.geometry.type === 'point') {
						if ($scope.drawType.name === 'Point') {
							g.setSymbol(marker);
						} else if ($scope.drawType.name === 'Text') {
							console.log($scope.drawText);
							var text = $("#drawText").val();
							textSymbol.setText(text);
							g.setSymbol(textSymbol);
							g.setAttributes({'GraphicsLayer': 'Drawing Graphics Layer', 'label': text})
						}
					}
					gl.add(g);
					$scope.map.reorderLayer(gl, $scope.map.layerIds.length - 1);
				});

			};
			var init = function () {
				require(["esri/toolbars/draw", "esri/layers/GraphicsLayer", "dojo/on"], function (Draw, GraphicsLayer, on) {
					gl = new GraphicsLayer({id: 'drawGraphics'});
					$scope.map.addLayer(gl);
					toolbar = new Draw($scope.map);
					setColor();
					

					on(toolbar, 'draw-end', drawCompleted);
				});
			};

			$scope.undo = function () {
				gl.remove(gl.graphics[gl.graphics.length - 1]);
			};

			$scope.$watch('map', function (map) {
				if (map) {
					init();
				}
			});

			$scope.$watch('drawType', function (type) {
				if (type) {
					if (type.shape === 'polyline' || type.shape === 'polygon') {
						toolbar.activate((($scope.freehandDraw) ? 'freehand' : '') + type.shape);
					} else {
						toolbar.activate(type.shape);
					}
					$scope.tool.height = (type.name === 'Text') ? 250 : 165;
					//gl.clear();
				}
			});
			$scope.drawFreehand = function (type) {
				if (type.shape === 'polyline' || type.shape === 'polygon') {
					toolbar.activate((($scope.freehandDraw) ? 'freehand' : '') + type.shape);
				} else {
					toolbar.activate(type.shape);
				}		
			}

			$scope.$watch('tool', function (tool) {
				if (tool.title === 'Draw') {
					if (!toolbar) {
						toolbar = new Draw($scope.map);
					}
					if ($scope.drawType) {
						tool.height = ($scope.drawType.name === 'Text') ? 250 : 165;
					} else {
						tool.height = 165;
					}
				} else {
					if (toolbar) {
						toolbar.deactivate();
						$scope.drawType = null;
					}
				}
			});
			var setColor = function () {
				require(["esri/Color", "esri/symbols/SimpleMarkerSymbol", "esri/symbols/SimpleFillSymbol", "esri/symbols/SimpleLineSymbol", "esri/symbols/TextSymbol"], function (Color,  SimpleMarkerSymbol, SimpleFillSymbol, SimpleLineSymbol, TextSymbol) {
					color = Color.fromHex($scope.drawColor);
					haloColor = ((color.r*0.299 + color.g*0.587 + color.b*0.114) > 186) ? [0, 0, 0] : [255, 255, 255];

					color = color.toRgb();
					fill = new SimpleFillSymbol({
					  "type": "esriSFS",
					  "style": "esriSFSNull",
						"color": color,
					    "outline": {
					     "type": "esriSLS",
					     "style": "esriSLSSolid",
							"color": color,
					     "width": 3
						 }
					});
					line = new SimpleLineSymbol({
						"type": "esriSLS",
						"style": "esriSLSSolid",
						"color": color,
						"width": 3
					});
					marker =  new SimpleMarkerSymbol({
					  "color": color,
					  "size": $scope.drawFontSize,
					  "angle": 0,
					  "xoffset": 0,
					  "yoffset": 0,
					  "type": "esriSMS",
					  "style": "esriSMSCircle",
					  "outline": {
					    "color": haloColor,
					    "width": 1,
					    "type": "esriSLS",
					    "style": "esriSLSSolid"
					  }
					});	
					textSymbol = new TextSymbol(
						{
						     "type": "esriTS",
						     "color": color,
						     "backgroundColor": null,
						     "borderLineColor": null,
						     "verticalAlignment": "bottom",
						     "horizontalAlignment": "left",
						     "rightToLeft": false,
						     "angle": 0,
						     "xoffset": 0,
						     "yoffset": 0,
						     "font": {
							      "family": "Arial",
							      "size": $scope.drawFontSize,
							      "style": "normal",
							      "weight": "bold",
							      "decoration": "none"
								},
						      "haloColor": haloColor,
						      "haloSize": 1
						}
					);						
					toolbar.setFillSymbol(fill);
					toolbar.setLineSymbol(line);
					toolbar.setMarkerSymbol(marker);				
				});
			};
			$scope.$on('colorpicker-closed', function(event, colorObject) {
			    setColor();
			});			
		},
		link: function (scope, element, attrs) {

		}
	}
});
