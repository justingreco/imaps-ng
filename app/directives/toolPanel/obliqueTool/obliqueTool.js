angular.module('imapsNgApp')
.directive('obliqueTool', function () {
	return {
		templateUrl: 'directives/toolPanel/obliqueTool/obliqueTool.html',
		restrict: 'E',
		controller: function ($scope, $rootScope, $timeout) {
			var oblique = null;
			$scope.obliqueFull = false;
			var sideOpen = $rootScope.checked;
			var newtab = null;
			var getOblique = function (lat, lng) {
				var url = "https://www.google.com/maps/@?api=1&map_action=map&basemap=satellite&tilt=45&zoom=19&center="+ lat+','+lng;
				if (!newtab) {
					newtab = window.open(url);
				} else {
					if (newtab.closed) {
						newtab = window.open(url);
					} else {
						newtab.location = url; 
						newtab.focus();
					}
				}			
			}
				//var loc = new google.maps.LatLng(lat, lng);
				// var streetViewService = new google.maps.StreetViewService();
				// streetViewService.getPanoramaByLocation(loc, 50, function(data, status)
				// {
				//     if (status == google.maps.StreetViewStatus.OK)
				//     {
				//         var nearStreetViewLocation = data.location.latLng;
				// 				var options = {position:data.location.latLng, imageDateControl: true};
				// 				panorama = new google.maps.StreetViewPanorama(document.getElementById('streetview'));
				// 				panorama.setOptions(options);
				//     }
				// });
        // var options = {
        //   center: loc,
        //   zoom: 18,
        //   mapTypeId: google.maps.MapTypeId.SATELLITE,
        //   heading: 0,
        //   tilt: 45,
        //   overviewMapControl: false,
        //   streetViewControl: false,
        //   mapTypeControl: false
        // };
       // oblique = new google.maps.Map(document.getElementById('obliqueMap'), options);
			// 	$timeout(function () {
			// 		google.maps.event.trigger(oblique, 'resize');
			// 	})
			// };
			var mapClick = function (e) {
				var dd = spToDd(e.mapPoint.x, e.mapPoint.y);
				getOblique(dd[0], dd[1]);
			};
			var clickHandler = null;
			$scope.$watch('tool', function (tool) {
				require(['dojo/on'], function (on) {
					if (tool.title === 'Satellite') {
						clickHandler = on($scope.map, 'click', mapClick);
						var dd = spToDd($scope.map.extent.getCenter().x, $scope.map.extent.getCenter().y);
						//getOblique(dd[0], dd[1]);
					} else {
						if (clickHandler) {
							clickHandler.remove();
						}
					}
				});
			});
			// $scope.goFullOblique = function () {
			// 	$("app-header").hide();
			// 	$scope.obliqueFull = true;
			// 	$("#obliqueMap").css("position", "fixed").css("top", 0).css("bottom", 0).css("left", 0).css("right", 0).css("z-index", 10000).css("height", "auto");
			// 	sideOpen = $rootScope.checked;
			// 	$rootScope.checked = false;
			// 	google.maps.event.trigger(oblique, 'resize');
			// }
			// $scope.minimizeOblique = function () {
			// 	$("app-header").show();
			// 	$scope.obliqueFull = false;
			// 	$("#obliqueMap").css("position", "relative").css("top", 0).css("bottom", 0).css("left", 0).css("right", 0).css("z-index", 10000).css("height", "240px");
			// 	$rootScope.checked = sideOpen;
			// 	google.maps.event.trigger(oblique, 'resize');
			// };
		},
		link: function (scope, element, attrs) {

		}
	}
});
