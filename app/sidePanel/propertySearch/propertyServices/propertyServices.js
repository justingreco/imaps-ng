angular.module('imapsNgApp')
.directive('propertyServices', function () {
	return {
		templateUrl: 'sidePanel/propertySearch/propertyServices/propertyServices.html',
		restrict: 'E',
		controller: function ($scope) {
			$scope.$on('servicesClicked', function (e, geometry) {
				require([

				    "esri/geometry/geometryEngine"
				], function(geometryEngine) {
					var newgeom = geometryEngine.buffer($scope.geometry, -1.5, 9001, true);
					console.log(newgeom);
				});
			});
		},
		link: function (scope, element, attrs) {
		
		}
	}
});