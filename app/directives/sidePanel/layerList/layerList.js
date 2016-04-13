angular.module('imapsNgApp')
.directive('layerList', function ($timeout, $window, $filter, legend, localStorageService) {
	return {
		templateUrl: 'directives/sidePanel/layerList/layerList.html',
		restrict: 'EA',
		controller: function ($scope) {
			$scope.layerFilterValue = '';
			$scope.$parent.$broadcast('refreshSlider');
			var getLegend = function (l) {
				legend.getLegend(l.url, l.id).then(function (legend) {
					var lyr = $filter('filter')($scope.layers, function (i) {
						return i.id === legend.id;
					})[0];
					var sublyrs = $filter('filter')(lyr.resourceInfo.layers, function (i) {
						return !i.subLayerIds;
					});
					angular.forEach(sublyrs, function (subl, j) {
						if (legend.layers[j]) {
							subl.legend = legend.layers[j].legend;
						}
					});
				});
			};
			$scope.showSublayer = function (layer, sublayer, sublayers) {
				var show = false;
				if (layer.visibility) {
					show = true;
				}
				if (sublayer.parentLayerId > -1) {
					show = sublayers[sublayer.parentLayerId].defaultVisibility;
				}
				return show;
			};
			$scope.$watch('webmap', function (webmap) {
				if (webmap) {
					$scope.layers = webmap.itemInfo.itemData.operationalLayers;
					angular.forEach($scope.layers, function (l) {
						if (l.visibility) {
							getLegend(l);

						}
					});
				}
			});

			$scope.filterLayers = function (layer) {
				var retVal = false;
				if ($scope.layerFilterValue.length === 0) {
					retVal = true;
				} else {
					retVal = layer.title.toLowerCase().indexOf($scope.layerFilterValue.toLowerCase()) > -1;
					if (!retVal && layer.resourceInfo.layers) {
						for (var i = 0; i < layer.resourceInfo.layers.length;i++) {
							if (layer.resourceInfo.layers[i].name.toLowerCase().indexOf($scope.layerFilterValue.toLowerCase()) > -1) {
								retVal = true;
							}
						}
					}
				}

				return retVal;
			};

			$scope.clearLayers = function (layers) {
				for (var i = 0; i < layers.length; i++) {
					if (layers[i].title != 'Parcels' && layers[i].title.indexOf('[hidden]') === -1) {
						$scope.map.getLayer(layers[i].id).setVisibility(false);
						layers[i].visibility = false;
					}
				}
			};

			$scope.layerToggle = function (layer, webmap) {

				layer.visibility = !layer.visibility;
				$scope.map.getLayer(layer.id).setVisibility(layer.visibility);
				if (layer.visibility && !layer.resourceInfo.layers[0].legend) {
					getLegend(layer);
				}

			};
			$scope.subLayerToggle = function (layer, sublayer, webmap, sublayers) {
				console.log(layer);
				console.log(sublayer);
				var visible = [];
				sublayer.defaultVisibility = !sublayer.defaultVisibility;
				visible = $scope.map.getLayer(layer.id).visibleLayers;

				if (sublayer.defaultVisibility) {
					if (!sublayer.subLayerIds) {
						visible.push(sublayer.id);
					} else {
						for (var i = 0; i < sublayer.subLayerIds.length; i++) {
							if (sublayers[sublayer.subLayerIds[i]].defaultVisibility) {
								visible.push(sublayer.subLayerIds[i]);
							}
						}
					}
				} else {
					visible.splice(visible.indexOf(sublayer.id), 1);
					if (sublayer.subLayerIds) {
						for (var i = 0; i < sublayer.subLayerIds.length; i++) {
							visible.splice(visible.indexOf(sublayer.subLayerIds[i]), 1);
						}
					}
				}
				if (visible.length === 0) {
					visible = [-1];
				}

				layer.layerObject.visibleLayers = visible;
				layer.layerObject._defaultVisibleLayers = visible;

				$scope.webmap.itemInfo.itemData.operationalLayers = $scope.layers;
				$scope.map.getLayer(layer.id).setVisibleLayers(visible);
			};

			$scope.opacityChanged = function (layer, webmap) {
				$scope.map.getLayer(layer.id).setOpacity(layer.opacity);

			};

			$scope.translate = function(value) {
			    return (value * 100).toFixed(0) + '%';
		  	};
		  	$scope.zoomToLayer = function (layer) {
/*		  		require(['esri/geometry/Extent'], function (Extent){
					$scope.map.setExtent(new Extent(layer.resourceInfo.initialExtent), true);
		  		});*/
	  			if ($scope.map.getScale() > layer.resourceInfo.minScale) {
					$scope.map.setScale(layer.resourceInfo.minScale);
				}
		  	};
		  	$scope.zoomToSubLayer = function (sublayer) {
	  			if ($scope.map.getScale() > sublayer.minScale) {
					$scope.map.setScale(sublayer.minScale);
				}
		  	};

		},
		link: function (scope, element, attrs) {

		}
	}
}).factory('legend', ['$http', '$q', function($http, $q){
	var service = {getLegend:getLegend}
	return service;
	function getLegend (url, id) {
		var deferred = $q.defer();
		$http({
			method: 'GET',
			url: url + '/legend',
			params: {f: 'json'}
		}).success(function (data) {
			data.id = id;
			deferred.resolve(data);
		});
		return deferred.promise;
	}
}]);
