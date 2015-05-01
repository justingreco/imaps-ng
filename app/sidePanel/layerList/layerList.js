angular.module('imapsNgApp')
.directive('layerList', function ($timeout, $window) {
	return {
		templateUrl: 'sidePanel/layerList/layerList.html',
		restrict: 'E',
		controller: function ($scope) {
			$scope.$watch('map', function (map) {
				if (map) {
					map.on('load', function (map) {
						
					});
					$scope.layers = $scope.webmap.itemInfo.itemData.operationalLayers;

					console.log($scope.layers);

				}
			});

			$scope.layerToggle = function (layer) {
				layer.visibility = !layer.visibility;
				$scope.map.getLayer(layer.id).setVisibility(layer.visibility);
			};
			$scope.subLayerToggle = function (layer, sublayer) {
				var visible = [];
				sublayer.defaultVisibility = !sublayer.defaultVisibility;
				visible = $scope.map.getLayer(layer.id).visibleLayers;

				if (sublayer.defaultVisibility) {
					visible.push(sublayer.id);
				} else {
					visible.splice(visible.indexOf(sublayer.id), 1);
				}
				$scope.map.getLayer(layer.id).setVisibleLayers(visible);
			};

			$scope.opacityChanged = function (layer) {
				$scope.map.getLayer(layer.id).setOpacity(layer.opacity);
			}
		},
		link: function (scope, element, attrs) {
			var resetPanel = function () {
				var headings = document.getElementsByClassName('panel-heading');
				var body = document.getElementsByClassName('panel-body') 
				if (headings.length > 0) {
					var height = $window.innerHeight;
					height -= headings.length * headings[0].offsetHeight;
					scope.accordionHeight = {'height': height - element.parent().parent().parent().position().top - 30 + 'px', overflow: 'auto'};
					console.log(scope.accordionHeight);
				}
			};
			$timeout(resetPanel.bind(element), 0);
			angular.element($window).bind('resize', resetPanel.bind(element));


		}
	}
});