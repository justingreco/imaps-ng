angular.module('imapsNgApp')
.directive('mapCoordinates', function () {
	return {
		templateUrl: 'directives/mapPanel/mapCoordinates/mapCoordinates.html',
		restrict: 'E',
		controller: function ($scope, $rootScope, $timeout){
			var current = null;
			$scope.coordUnits = [
			{value:'DECIMAL_DEGREES', label: 'Decimal Degrees'},
			{value: 'DEGREE_MINUTE_SECONDS', label: 'Degrees Minutes Seconds'},
			{value: 'FEET', label: 'State Plane Feet'}];
			$scope.coordUnit = $scope.coordUnits[0];
			var updateCurrentCoordinate = function (pt, unit) {
				var coord = getCoordinate(pt.x, pt.y, $scope.coordUnit.value);
				$timeout(function () {
					$scope.currentCoords = coord;
				});
			};
			var getCoordinate = function (x, y, unit) {
				var dd = spToDd(x, y),
					text = "";
				if (unit === 'FEET') {
					text = y.toFixed(4) + " N " + x.toFixed(4) + " E";
				} else if (unit === 'DECIMAL_DEGREES') {
					text = "Lat: " + dd[0].toFixed(6) + " Lng: " + dd[1].toFixed(6);
				} else if (unit === 'DEGREE_MINUTE_SECONDS') {
					var point = new GeoPoint(dd[1], dd[0]);
					text = point.getLatDeg() + " " + point.getLonDeg();
				}
				return text;
			};
			var stopDisplayCoordinates = function () {
				if (coordHandle) {
					coordHandle.remove();
					coordHandle = null;
					current = null;
				}
			};

			var startDisplayingCoordinates = function () {
				require(['dojo/on'], function (on) {
					var coord = '';
					coordHandle = on($scope.map, 'mouse-move', function (e) {
						current = e.mapPoint;
						updateCurrentCoordinate(e.mapPoint, $scope.coordUnit.value);
					});
				});
			};
			$scope.coordUnitSelected = function ($index) {
				$scope.coordUnit = $scope.coordUnits[$index];
			    updateCurrentCoordinate(current, $scope.coordUnit.value);		
			}			
			$rootScope.$on('mapLoaded', function () {
				startDisplayingCoordinates();
			});
			
		},
		link: function (scope, element, attrs) {
		}
	}
});			