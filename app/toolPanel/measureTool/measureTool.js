angular.module('imapsNgApp')
.directive('measureTool', function () {
	return {
		templateUrl: 'toolPanel/measureTool/measureTool.html',
		restrict: 'E',
		controller: function ($scope, $filter) {

			$scope.units = [
				{label: 'Feet', name: 'FEET', type: 'length', active: true},
				{label: 'Miles', name: 'MILES', type: 'length', active: false},
				{label: 'Meters', name: 'METERS', type: 'length', active: false},
				{label: 'Kilometers', name: 'KILOMETERS', type: 'length', active: false},
				{label: 'Yards', name: 'YARDS', type: 'length', active: false},
				{label: 'Square Feet', name: 'SQUARE_FEET', type: 'area', active: true},
				{label: 'Acres', name: 'ACRES', type: 'area', active: false},
				{label: 'Square Miles', name: 'SQUARE_MILES', type: 'area', active: false},
				{label: 'Square Meters', name: 'SQUARE_METERS', type: 'area', active: false},
				{label: 'Square Kilometers', name: 'KILOMETERS', type: 'area', active: false},
				{label: 'Square Yards', name: 'SQUARE_YARDS', type: 'area', active: false},
				{label: 'Decimal Degrees', name: 'DECIMAL_DEGREES', type: 'coordinates', active: true},
				{label: 'Degrees Minutes Seconds', name: 'DEGREE_MINUTE_SECONDS', type: 'coordinates', active: false},
				{label: 'Feet', name: 'FEET', type: 'coordinates', active: false}
			];

			$scope.filterUnits = function (unit) {
				if ($scope.measureType) {
					return unit.type === $scope.measureType;
				}
			};

			$scope.$watch('measureType', function (type) {
				if (type) {
					var matches = $filter('filter')($scope.units, function (u) {
						return u.type === type && u.active;
					});
					if (matches.length > 0) {
						$scope.unit = matches[0];
					}
				}
			});

			$scope.unitChanged = function (unit) {
				var units = $filter('filter')($scope.units, function (u) {
					return $scope.measureType === u.type;
				});
				angular.forEach(units, function (u) {
					u.active = false;
				});

				unit.active = true;
			};
		},
		link: function (scope, element, attrs) {

		}
	}
});
