angular.module('imapsNgApp')
.directive('printTool', function (cfpLoadingBar) {
	return {
		templateUrl: 'directives/toolPanel/printTool/printTool.html',
		restrict: 'E',
		controller: function ($scope, $rootScope, $filter, $http, $analytics, $timeout) {
			var gl = null;
			$scope.printing = false;
			$scope.printAtts = false;
			$scope.printTitle = "";
			$scope.printFormats = [
				{value: 'PDF', label: 'PDF'},
				{value: 'JPG', label: 'Image'}
			];
			$scope.printFormat = $scope.printFormats[0];
			$scope.printSizes = [
				{
					value: '85x11',
					label:'8.5"x11"',
					dpi: 200,
					mapframe: {
						landscape: {
							attributes: {
								width: 7.5,
								height: 7.5
							},
							width: 10,
							height: 6.7
						},
						portrait: {
							attributes: {
								width: 7.5,
								height: 7.5
							},
							width: 7.5,
							height: 7.5
						}
					}
				},
				{
					value: '11x17',
					label:'11"x17"',
					dpi: 200,
					mapframe: {
						landscape: {
							attributes: {
								width: 13,
								height: 10
							},
							width: 16,
							height: 9
						},
						portrait: {
							attributes: {
								width: 10,
								height: 13
							},
							width: 10,
							height: 13
						}
					}
				},
				{
					value: '24x36',
					label:'24"x36"',
					dpi: 96,
					mapframe: {
						landscape: {
							attributes: {
								width: 28,
								height: 23
							},
							width: 35,
							height: 21
						},
						portrait: {
							attributes: {
								width: 23,
								height: 29
							},
							width: 23,
							height: 29
						}
					}
				}/*,
				{value: '36x48', label:'36"x48"'}*/
			];
			$scope.printSize = $scope.printSizes[0];
			$scope.printOrients = [
				{value: 'landscape', label:'Landscape'},
				{value: 'portrait', label:'Portrait'}
			];
			$scope.printOrient = $scope.printOrients[0];
			$scope.printScales = [
				{label: 'Current Scale', value: 0, current: true},
				{label: '1" = ' + "50'" , value: 600},
				{label: '1" = ' + "100'" , value: 1200},
				{label: '1" = ' + "200'" , value: 2400},
				{label: '1" = ' + "400'" , value: 4800},
				{label: '1" = ' + "800'" , value: 9600},
				{label: '1" = ' + "1,600'" , value: 17200},
				{label: '1" = ' + "3,200'" , value: 38400},
				{label: '1" = ' + "6,400'" , value: 76800},
				{label: '1" = ' + "12,800'" , value: 153600},
				{label: '1" = ' + "25,600'" , value: 307200},
				{label: 'Custom', value: undefined, custom: true}
			];
			$scope.printScale = $scope.printScales[0];
			var getAttributes = function () {
				var atts = "";
				if ($scope.$parent.accountInfo && $scope.printAtts) {
					angular.forEach($scope.$parent.accountInfo, function (info) {
						if (info.field != 'Crime' && info.field != 'Septic Permit' && info.field != 'Well Samples') {
							atts += info.field + ': ' + info.value + '\r\n';
						}
					});
				}
				return atts;
			};
			var getPins = function () {
				var pins = "";
				if ($scope.$parent.account) {
					pins += $scope.$parent.account.pin + ";";
				}
				if ($scope.accounts) {
					angular.forEach($scope.accounts, function (a, i) {
						if (i < $scope.accounts.length - 1) {
							pins += a.pin + ",";
						} else {
							pins += a.pin;
						}
					});
				}
				return pins;
			};
			var getScale = function (scaleUtils) {
				var scale = $scope.printScale.value;
				if ($scope.printScale.current) {
					scale = parseInt(scaleUtils.getScale($scope.map));
				} else if ($scope.printScale.custom) {
					scale = scale * 12;
				}
				return scale;
			};
			$scope.exportMap = function (map) {
				require(["esri/tasks/PrintTask", "esri/tasks/PrintParameters", "esri/tasks/PrintTemplate"], function(PrintTask, PrintParameters, PrintTemplate) {
					var printTask = new PrintTask($scope.config.tools.export.url);
					var template = new PrintTemplate();
					template.format = 'JPG';
					template.layout = 'MAP_ONLY';
					  template.exportOptions = {
					    width: map.width,
					    height: map.height,
					    dpi: 96
					  };
					var params = new PrintParameters();
					params.map = map;
					params.template = template;
					cfpLoadingBar.start();
					$scope.printing = true;
					$scope.printMessage = "Generating Image...";
 					$analytics.eventTrack('Export Image');
					printTask.execute(params, function (result) {
						window.open(result.url);
						cfpLoadingBar.complete();
						$scope.printing = false;
					}, function (error) {
						cfpLoadingBar.complete();
						$scope.printing = false;
					});
				});
			};
			$scope.printPDF = function (map) {
				require(["esri/tasks/PrintTask", "esri/tasks/PrintParameters", "esri/tasks/PrintTemplate", "esri/geometry/scaleUtils"], function (PrintTask, PrintParameters, PrintTemplate, scaleUtils) {
					var printTask = new PrintTask("http://maps.raleighnc.gov/arcgis/rest/services/Geoprocessing/ExportWebMap/GPServer/Export%20Web%20Map", {async: true});
					var params = new PrintParameters();
					var attributes = getAttributes();
					params.map = map;
					var template = new PrintTemplate();
					template.format = "PDF";
					template.layout = $scope.printSize.value + "_" + $scope.printOrient.value + (($scope.$parent.accountInfo && $scope.printAtts) ? '_attributes': '' );
					template.layoutOptions = {
						titleText : $scope.printTitle,
						scalebarUnit: 'Feet',
						customTextElements: [
							{"title": $scope.printTitle},
							{"Fields": attributes}
						]
					};
					template.exportOptions = {
						dpi: $scope.printSize.dpi
					};
					template.preserveScale = true;
					template.outScale = getScale(scaleUtils);
					params.template = template;
					cfpLoadingBar.start();
					$scope.printing = true;
					$scope.printMessage = "Generating PDF...";
 					$analytics.eventTrack('Export PDF', {category: 'size', label: $scope.printSize.value});
 					$analytics.eventTrack('Export PDF', {category: 'layout', label: $scope.printOrient.value});
 					$analytics.eventTrack('Export PDF', {category: 'attributes', label: attributes != ""});
 					gl.setVisibility(false);
					printTask.execute(params, function (result) {
						window.open(result.url);
						cfpLoadingBar.complete();
						$scope.printing = false;
					}, function (error) {
						cfpLoadingBar.complete();
						$scope.printing = false;
						console.log(error);
					});
					gl.setVisibility(true);
				});
			};
			$scope.printFormatChanged = function (format) {
				if (format === 'PDF') {
					$scope.tool.height = 325;
					gl.setVisibility(true);
				} else if (format === 'Image') {
					$scope.tool.height = 150;
					gl.setVisibility(false);
				}
			};
			var displayFrameGraphic = function (width, height, Extent, Graphic, GraphicsLayer, SimpleFillSymbol) {

				var xmin = $scope.map.extent.getCenter().x - (width / 2);
				var xmax = $scope.map.extent.getCenter().x + (width / 2);
				var ymin = $scope.map.extent.getCenter().y - (height / 2);
				var ymax = $scope.map.extent.getCenter().y + (height / 2);
				var extent = new Extent(xmin, ymin, xmax, ymax);
				extent.spatialReference = $scope.map.spatialReference;

		  		gl = $scope.map.getLayer('printFrame');
				var g = null;
				if (!gl) {
				  gl = new GraphicsLayer({id: 'printFrame'});
				  $scope.map.addLayer(gl);
				 }
				gl.clear();
				frameColor = ($scope.basemap.tone  === 'light') ? [0, 0, 0, 80] : [255, 255, 255, 80];
				var fill = new SimpleFillSymbol({
				  "type": "esriSFS",
				  "style": "esriSFSSolid",
					"color": frameColor,
				    "outline": {
				     "type": "esriSLS",
				     "style": "esriSLSNull",
						"color": [255,140,0,255],
				     "width": 5
					 }
				});
				g = new Graphic(extent,fill);
				gl.add(g);
			};
			$scope.displayFrame = function () {
				if ($scope.map && $scope.tool.title === 'Print') {
					var orient = $scope.printOrient.value,
						hasAtts = ($scope.$parent.accountInfo && $scope.printAtts),
						mapframe = $scope.printSize.mapframe[orient];
						width = 0,
						height = 0;
					if (hasAtts) {
						mapframe = mapframe.attributes;
					}
					require(["esri/geometry/Extent","esri/graphic", "esri/layers/GraphicsLayer", "esri/symbols/SimpleFillSymbol", "esri/geometry/scaleUtils"], function(Extent, Graphic, GraphicsLayer, SimpleFillSymbol, scaleUtils) {
						width = (getScale(scaleUtils) / 12) * mapframe.width;
						height = (getScale(scaleUtils)  / 12) * mapframe.height;
						displayFrameGraphic(width, height, Extent, Graphic, GraphicsLayer, SimpleFillSymbol);
					});
				}
			};
			var extentEvent = null;
			var frameColor = [0, 0, 0, 80]
			$scope.$watch('basemap', function (basemap) {
				if (basemap) {
					frameColor = (basemap.tone === 'light') ? [0, 0, 0, 80] : [255, 255, 255, 80];
					$scope.displayFrame();
				}
			});
			$scope.$watch('tool', function (tool) {
				if (tool.title === 'Print') {
					$timeout($scope.displayFrame);
					require(['dojo/on'], function (on) {
						extentEvent = on($scope.map, 'extent-change', function () {
							$scope.displayFrame();
						});
					});
				} else {
					if (extentEvent) {
						extentEvent.remove();
						if (gl) {
						  gl.clear();
						}						
					}
				}
			});
		},
		link: function (scope, element, attrs) {
		}
	}
});