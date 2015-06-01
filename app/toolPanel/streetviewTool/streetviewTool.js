angular.module('imapsNgApp')
.directive('streetviewTool', function () {
	return {
		templateUrl: 'toolPanel/streetviewTool/streetviewTool.html',
		restrict: 'E',
		controller: function ($scope) {
			var mapClick = function (e) {
				var dd = spToDd(e.mapPoint.x, e.mapPoint.y);
				var loc = new google.maps.LatLng(dd[0], dd[1]);
				var options = {position:loc, imageDateControl: true};
				var panorama = new google.maps.StreetViewPanorama(document.getElementById('streetview'));
				panorama.setOptions(options);

			};
			var clickHandler = null;
			$scope.$watch('tool', function (tool) {
				require(['dojo/on'], function (on) {
					if (tool.title === 'Streetview') {
						clickHandler = on($scope.map, 'click', mapClick);
					} else {
						if (clickHandler) {
							clickHandler.remove();
						}
					}
				});
			});
		},
		link: function (scope, element, attrs) {

		}
	}
});
