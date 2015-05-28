angular.module('imapsNgApp')
.directive('baseMapPanel', function ($timeout) {
	return {
		templateUrl: 'baseMapPanel/baseMapPanel.html',
		restrict: 'E',
		controller: function ($scope, $rootScope) {
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
				if (!$scope.insideRaleigh && $scope.basemap.name != '2013') {
					$scope.basemap =  $scope.config.map.basemaps.images.layers[1];
					$scope.basemapChanged($scope.basemap, "images");
				}
			});
			$scope.basemapTypeClicked = function (type) {
				if ($scope.basemapType != type) {
					if (type === 'streets') {
						$scope.basemap = $scope.streetMap;
					} else if (type === 'images') {
						if ($scope.imageMap) {
							$scope.basemap = $scope.imageMap;
						} else {
							$scope.basemap = $scope.config.map.basemaps.images.layers[0];
							$scope.imageMap = $scope.basemap;
						}
					}
				}
				$scope.basemapChanged($scope.basemap, type);
				$scope.basemapType = type;
			}
			$scope.basemapChanged = function (basemap, basemapType) {
				require(["esri/basemaps",], function (esriBasemaps) {
					if (!baseloaded) {
						if ($scope.map.getLayer("base0")) {
							$scope.map.getLayer("base0").setVisibility(false)
						}
						if ($scope.map.getLayer("base1")) {
							$scope.map.getLayer("base1").setVisibility(false)
						}
						if ($scope.map.getLayer("BaseMapMobile_48")) {
							$scope.map.getLayer("BaseMapMobile_48").setVisibility(false)
						}
					}
					$scope.map.setBasemap(basemap.id);
					if (basemapType === 'streets') {
						$scope.streetMap = basemap;
					} else if (basemapType === 'images') {
						$scope.imageMap = basemap;
					}
					$scope.webmap.itemInfo.itemData.baseMap = esriBasemaps[basemap.id];
				});
			}
		}, link: function (scope, element, attr) {
		}
	}
});
