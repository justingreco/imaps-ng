angular.module('imapsNgApp')
.directive('layerList', function ($timeout, $window, $filter, legend, localStorageService) {
	return {
		templateUrl: 'directives/sidePanel/layerList/layerList.html',
		restrict: 'EA',
		controller: function ($scope) {
			var getLegend = function (l) {
				legend.getLegend(l.url, l.id).then(function (legend) {
					var lyr = $filter('filter')($scope.layers, function (i) {
						return i.id === legend.id;
					})[0];
					angular.forEach(lyr.resourceInfo.layers, function (subl, j) {
						if (legend.layers[j]) {
							subl.legend = legend.layers[j].legend;
						}
					});
				});
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

			$scope.layerToggle = function (layer, webmap) {
				layer.visibility = !layer.visibility;
				$scope.map.getLayer(layer.id).setVisibility(layer.visibility);
				if (layer.visibility && !layer.resourceInfo.layers[0].legend) {
					getLegend(layer);
				}

			};
			$scope.subLayerToggle = function (layer, sublayer, webmap) {
				var visible = [];
				sublayer.defaultVisibility = !sublayer.defaultVisibility;
				visible = $scope.map.getLayer(layer.id).visibleLayers;

				if (sublayer.defaultVisibility) {
					visible.push(sublayer.id);
				} else {
					visible.splice(visible.indexOf(sublayer.id), 1);
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
