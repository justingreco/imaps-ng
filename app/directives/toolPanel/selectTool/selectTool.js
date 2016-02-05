angular.module('imapsNgApp')
.directive('selectTool', function () {
	return {
		templateUrl: 'directives/toolPanel/selectTool/selectTool.html',
		restrict: 'E',
		controller: function ($scope, $rootScope, property, mapUtils) {
			$scope.selectBufferDist = 0;
			$scope.bufferProperty = function () {
				bufferShape($scope.geometry, "esriGeometryPolygon");
			}
			var bufferShape = function (geom, type) {
				require(['esri/geometry/geometryEngine', 'esri/geometry/Polygon', 'esri/graphic', 'esri/graphicsUtils'], function (GeometryEngine, Polygon, Graphic, graphicsUtils) {
					if  (!geom.type) {
							geom = new  Polygon(geom);
					}
					var buffer = GeometryEngine.buffer(geom, parseInt($scope.selectBufferDist), 9002, true);
					$scope.bufferGraphics.clear();
					var g = new Graphic({geometry: buffer,
						symbol:{color:[0,0,0,0],outline:{color:[0,0,0,100],
							width:3,type:"esriSLS",style:"esriSLSSolid"},
							type:"esriSFS",style:"esriSFSSolid"}});					
					$scope.bufferGraphics.add(g);
					$scope.map.setExtent(graphicsUtils.graphicsExtent($scope.bufferGraphics.graphics), true);
					searchForProperties(buffer, "esriGeometryPolygon", $scope.map.spatialReference.wkid);
				});
			};
			var searchForProperties = function (geometry, type, wkid) {
				property.getPropertiesByGeometry(geometry, type, 0, wkid).then(function (result) {
					property.getPropertiesByGeometry(geometry, type, 1, wkid).then(function (result2) { 
						result.features = result.features.concat(result2.features);
						var pins = [];
						angular.forEach(result.features, function (feature) {
							pins.push(feature.attributes.PIN_NUM);
						});
						property.getRealEstate('pin', pins).then(function (data) {
							$scope.account = null;
							$scope.$parent.account = null;
							$scope.geometry = null;
							$scope.fields = data.Fields;
							$scope.accounts = data.Accounts;
							$rootScope.zoomTo = false;
							$rootScope.$broadcast('accountUpdate', data.Accounts);
						});
					});
				});
			}
			require(['esri/toolbars/draw', 'dojo/on'], function (Draw, on) {
				var toolbar = null;
				var shapeDrawn = function (e) {
					//toolbar.deactivate();
					//$scope.selectType = '';
					//$scope.map.enableMapNavigation();
					var type = '';
					switch (e.geometry.type) {
						case 'point':
							type = 'esriGeometryPoint';
							break;
						case 'polygon':
							type = 'esriGeometryPolygon';
							break;
						case 'polyline':
							type = 'esriGeometryPolyline';
							break;
						case 'multipoint':
							type = 'esriGeometryMultipoint';
							break;
						default:

					}
					e.geometry.spatialReference = $scope.map.spatialReference;
					if ($scope.selectBufferDist > 0) {
						bufferShape (e.geometry, type);
					} else {
						searchForProperties(e.geometry, type, $scope.map.spatialReference.wkid);
					}
				};
				$scope.selectTypeChanged = function (type) {
					if ($scope.freehand && type.indexOf('point') === -1) {
						type = 'freehand' + type;
						$scope.map.disableMapNavigation();
					}
					toolbar.activate(type);
				};
				$scope.$watch('geometry', function (geometry) {
					if ($scope.tool.title === 'Property Select') {
						$scope.tool.height = (geometry) ? 290 : 240;
					}
				});
				$scope.$watch('tool', function (tool) {
					if (tool.title === 'Property Select') {
						tool.height = ($scope.geometry) ? 290 : 240;
						if (!toolbar) {
							toolbar = new Draw($scope.map);
							on(toolbar, 'draw-end', shapeDrawn);
						}
						$scope.selectType = 'point';
						$scope.selectTypeChanged('point');
					} else {
						if (toolbar) {
							toolbar.deactivate();
							$scope.selectType = '';
						}
					}
				});
			});
		},
		link: function (scope, element, attrs) {

		}
	}
});
