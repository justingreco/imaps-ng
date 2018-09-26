angular.module('imapsNgApp')
.directive('streetviewTool', function () {
	return {
		templateUrl: 'directives/toolPanel/streetviewTool/streetviewTool.html',
		restrict: 'E',
		controller: function ($scope, $rootScope, $timeout) {
			$scope.streetviewActive = false;
			var panorama = null;
			$scope.streetviewFull = false;
			var sideOpen = $rootScope.checked;
			$scope.location = '';
			var newtab = null;
			var getStreetview = function (lat, lng) {
				var url = "https://www.google.com/maps/@?api=1&map_action=pano&viewpoint="+ lat+','+lng
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
				//$scope.url = "https://www.google.com/maps/@?map_action=pano&viewpoint="+ lat+','+lng;
				// var loc = new google.maps.LatLng(lat, lng);
				// var streetViewService = new google.maps.StreetViewService();
				// streetViewService.getPanoramaByLocation(loc, 50, function(data, status)
				// {
				//     if (status == google.maps.StreetViewStatus.OK)
				//     {
				//         var nearStreetViewLocation = data.location.latLng;
				// 				var options = {position:data.location.latLng, imageDateControl: true};
				// 				panorama = new google.maps.StreetViewPanorama(document.getElementById('streetview'));
				// 				panorama.setOptions(options);
				// 				$scope.streetviewActive = true;
				// 				$timeout(function () {
				// 					google.maps.event.trigger(streetview, 'resize');
				// 				});
				//     } else {
				//     	$scope.streetviewActive = false;
				//     }
				// });
			};
			var mapClick = function (e) {
				var dd = spToDd(e.mapPoint.x, e.mapPoint.y);
				getStreetview(dd[0], dd[1]);
			};
			var clickHandler = null;
			$scope.$watch('tool', function (tool) {
				require(['dojo/on'], function (on) {
					if (tool.title === 'Streetview') {
						clickHandler = on($scope.map, 'click', mapClick);
						//var dd = spToDd($scope.map.extent.getCenter().x, $scope.map.extent.getCenter().y);
						//getStreetview(dd[0], dd[1]);
					} else {
						if (clickHandler) {
							clickHandler.remove();
						}
					}
				});
			});
			$scope.goFull = function () {
				$("app-header").hide();
				$scope.streetviewFull = true;
				$("#streetview").css("position", "fixed").css("top", 0).css("bottom", 0).css("left", 0).css("right", 0).css("z-index", 10000).css("height", "auto");
				sideOpen = $rootScope.checked;
				$rootScope.checked = false;
				google.maps.event.trigger(panorama, 'resize');
			}
			$scope.minimizeStreetview = function () {
				$("app-header").show();
				$scope.streetviewFull = false;
				$("#streetview").css("position", "relative").css("top", 0).css("bottom", 0).css("left", 0).css("right", 0).css("z-index", 10000).css("height", "240px");
				$rootScope.checked = sideOpen;
				google.maps.event.trigger(panorama, 'resize');
			};
		},
		link: function (scope, element, attrs) {

		}
	}
});
