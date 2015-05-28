angular.module('imapsNgApp')
.directive('propertyServices', function () {
	return {
		templateUrl: 'sidePanel/propertySearch/propertyServices/propertyServices.html',
		restrict: 'E',
		controller: function ($scope, property) {
			$scope.$on('servicesClicked', function (e, geometry) {
				require([

				    "esri/graphic"
				], function(Graphic) {
					//var newgeom = geometryEngine.buffer($scope.geometry, -2, 9102, true);
					//console.log(newgeom);
					var jsonConv = new esriConverter();
					var gj = {type: 'Feature', geometry: jsonConv.toGeoJson($scope.geometry)};
					var newgj = turf.buffer(gj, 2000, 'feet');
					jsonConv = new geoJsonConverter();
					var newgeom = jsonConv.toEsri(newgj);
					newgeom.features[0].symbol = {"color":[0,0,0,64],"outline":{"color":[0,0,0,255],
    "width":1,"type":"esriSLS","style":"esriSLSSolid"},
    "type":"esriSFS","style":"esriSFSSolid"};
		console.log(JSON.stringify(gj));
		console.log(JSON.stringify(newgj));
					var g = new Graphic(newgeom.features[0]);
					$scope.map.graphics.add(g);
					property.getServices(newgeom.features[0].geometry, $scope.map.extent, $scope.map.width, $scope.map.height).then(function (results) {
						console.log(results);
					});
				});
			});
		},
		link: function (scope, element, attrs) {

		}
	}
});
