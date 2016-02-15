angular.module('imapsNgApp')
.directive('baseMapPanel', function ($timeout) {
	return {
		templateUrl: 'directives/baseMapPanel/baseMapPanel.html',
		restrict: 'E',
		controller: function ($scope, $rootScope, $filter, $analytics) {
			var baseloaded = false;
			$scope.insideRaleigh = true;
			$rootScope.mapsChecked = false;
			$scope.basemapType = 'streets';
			$rootScope.$watch('config', function (config) {
				if (config) {
					$scope.basemap = config.map.basemaps.streets.layers[0];
					$scope.streetMap = $scope.basemap;
				}
			});
			$rootScope.$watch('mapsChecked', function (checked) {
				$scope.mapsChecked = checked;
			});
			$scope.showAerial = function (layer) {
				return layer.county && !$scope.insideRaleigh || $scope.insideRaleigh;
			}
			$scope.mapsHeaderClick = function (checked) {
				$rootScope.mapsChecked = !checked;
			}
			$scope.$on('raleighChecked', function (e, inRaleigh) {
				$scope.insideRaleigh = inRaleigh;
				if ($scope.basemapType === 'images') {
					if (!inRaleigh) {
						//in Wake

						if ($scope.lastWakeYear) {
							$scope.basemap = $scope.lastWakeYear;
							$scope.basemapChanged($scope.lastWakeYear, 'images');

						} else {
							var basemaps = $filter('filter')($scope.config.map.basemaps.images.layers, function (basemap) {
								return basemap.county === true;
							});
							$scope.basemap = basemaps[0];
							$scope.basemapChanged($scope.basemap, 'images');
						}

						$scope.lastWakeYear = $scope.basemap;
					} else {
						//in Raleigh
						if ($scope.lastRaleighYear) {
							$scope.basemap = $scope.lastRaleighYear;
							$scope.basemapChanged($scope.lastRaleighYear, 'images');
						} else {
							$scope.basemap = $scope.config.map.basemaps.images.layers[0];
							$scope.basemapChanged($scope.basemap, 'images');
						}
						$scope.lastRaleighYear = $scope.basemap;
					}
				}


				// $scope.insideRaleigh = inRaleigh;
				// if (!inRaleigh && $scope.basemap.name != '2013' && $scope.basemapType === 'images') {
				// 	$scope.basemap =  $scope.config.map.basemaps.images.layers[1];
				// 	$scope.basemapChanged($scope.basemap, "images");
				// } else if (inRaleigh) {
				// 	if ($scope.lastRaleighYear) {
				// 		$scope.basemapChanged($scope.lastRaleighYear, "images");
				// 	}
				// 	$scope.lastRaleighYear = $scope.basemap;
				// }
			});
			$scope.basemapTypeClicked = function (type) {
				if ($scope.basemapType != type) {
					if (type === 'streets') {
						$scope.basemap = $scope.streetMap;
					} else if (type === 'images') {
						if ($scope.imageMap) {
							$scope.basemap = $scope.imageMap;
						} else {
							if ($scope.inRaleigh) {
								$scope.basemap = $scope.config.map.basemaps.images.layers[0];
								$scope.imageMap = $scope.basemap;
							} else {
								var basemaps = $filter('filter')($scope.config.map.basemaps.images.layers, function (basemap) {
									return basemap.county === true;
								});
								$scope.basemap = basemaps[0];
								$scope.imageMap = $scope.basemap;
							}
						}
					}
				}
				$scope.basemapChanged($scope.basemap, type);
				$scope.basemapType = type;
			}
/*			var setParcelColor = function () {
				require(['esri/symbols/SimpleFillSymbol', 'esri/renderers/SimpleRenderer', 'esri/layers/LayerDrawingOptions'], function (SimpleFillSymbol, SimpleRenderer, LayerDrawingOptions) {
					for (var i = 0; i < $scope.map.layerIds.length; i++) {
						if ($scope.map.layerIds[i].indexOf('Parcels') > -1) {
							var color = ($scope.basemap.tone === 'light') ? [0, 0, 0, 255] : [255,255,255,255];
							var layer = $scope.map.getLayer($scope.map.layerIds[i]);
							var fill = new SimpleFillSymbol({
							  "type": "esriSFS",
							  "style": "esriSFSNull",
								"color": color,
							    "outline": {
							     "type": "esriSLS",
							     "style": "esriSLSSolid",
									"color": color,
							     "width": 1
								 }
							});
							var optionsArray = [];
							var options = LayerDrawingOptions();
							var renderer = SimpleRenderer(fill);
							options.renderer = renderer;
							optionsArray[0] = options;
							optionsArray[1] = options;	
							layer.setLayerDrawingOptions(optionsArray);					
						}
					}
				});
			};*/
			$scope.basemapChanged = function (basemap, basemapType, manual) {
				$analytics.eventTrack('Changed', {  category: 'Basemaps', label: basemap.id });
				require(["esri/basemaps",], function (esriBasemaps) {
					//setParcelColor();
					angular.forEach($scope.map.layerIds, function (id) {
						if (id.indexOf('Base') === 0 || id.indexOf('base') === 0) {
							$scope.map.removeLayer($scope.map.getLayer(id));
						}
					});
					angular.forEach($scope.map.basemapLayerIds, function (id) {
						//if (id.indexOf('Base') === 0) {
							$scope.map.removeLayer($scope.map.getLayer(id));
						//}
					});
					$scope.map.setBasemap(basemap.id);
					if (basemapType === 'streets') {
						$scope.streetMap = basemap;
					} else if (basemapType === 'images') {
						$scope.imageMap = basemap;
					}
					$scope.webmap.itemInfo.itemData.baseMap = esriBasemaps[basemap.id];

					if (basemap.county) {
						$scope.lastWakeYear = basemap;
						if (manual) {
							$scope.lastRaleighYear = basemap;
						}
					} else {
						$scope.lastRaleighYear = basemap;
					}
				});
			}
		}, link: function (scope, element, attr) {
		}
	}
});
