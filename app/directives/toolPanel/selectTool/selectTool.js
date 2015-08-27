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
				require(['esri/geometry/geometryEngine', 'esri/geometry/Polygon', 'esri/graphic'], function (GeometryEngine, Polygon, Graphic) {
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

					searchForProperties(buffer, "esriGeometryPolygon", $scope.map.spatialReference.wkid);
				});
			};
			var searchForProperties = function (geometry, type, wkid) {
				property.getPropertiesByGeometry(geometry, type, wkid).then(function (result) {
					var pins = [];
					angular.forEach(result.features, function (feature) {
						pins.push(feature.attributes.PIN_NUM);
					});
					property.getRealEstate('pin', pins).then(function (data) {
						$scope.account = null;
						$scope.geometry = null;
						$scope.fields = data.Fields;
						$scope.accounts = data.Accounts;
						$rootScope.$broadcast('accountUpdate', data.Accounts);
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
					if ($scope.selectBufferDist > 0) {
						bufferShape (e.geometry, type);
					} else {
						searchForProperties(e.geometry, type, $scope.map.wkid);
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
						$scope.tool.height = (geometry) ? 270 : 220;
					}
				});
				$scope.$watch('tool', function (tool) {
					if (tool.title === 'Property Select') {
						tool.height = ($scope.geometry) ? 270 : 220;
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
