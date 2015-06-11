angular.module('imapsNgApp')
.directive('selectTool', function () {
	return {
		templateUrl: 'toolPanel/selectTool/selectTool.html',
		restrict: 'E',
		controller: function ($scope, $rootScope, property, mapUtils) {
			$scope.selectBufferDist = 0;
			$scope.bufferProperty = function () {
				bufferShape($scope.geometry, "esriGeometryPolygon");
			}
			var bufferShape = function (geom, type) {
				mapUtils.buffer($scope.config.map.geometryServiceUrl, [geom], 2264, parseInt($scope.selectBufferDist), 9002, type).then(function (data) {
					if (data.geometries.length > 0) {
						searchForProperties(data.geometries[0], "esriGeometryPolygon", $scope.map.spatialReference.wkid);
					}
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
					toolbar.deactivate();
					$scope.selectType = '';
					$scope.map.enableMapNavigation();
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
						$scope.tool.height = (geometry) ? 250 : 180;
					}
				});
				$scope.$watch('tool', function (tool) {
					if (tool.title === 'Property Select') {
						tool.height = ($scope.geometry) ? 250 : 180;
						if (!toolbar) {
							toolbar = new Draw($scope.map);
							on(toolbar, 'draw-end', shapeDrawn);
						}
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
