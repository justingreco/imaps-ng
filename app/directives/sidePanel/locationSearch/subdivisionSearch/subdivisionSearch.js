angular.module('imapsNgApp')
.directive('subdivisionSearch', function () {
	return {
		templateUrl: 'directives/sidePanel/locationSearch/subdivisionSearch/subdivisionSearch.html',
		restrict: 'EA',
		controller: function ($scope, $http, locationFactory, $timeout) {
			$scope.subdivisions = function(subdivision){
		        return locationFactory.getSubdivision(subdivision).then(function (response) {
/*		        	var subdivs = [];
		        	angular.forEach(response.features, function (f) {
		        		subdivs.push(f.attributes.NAME);
		        	});*/
		        	return response.features;
		        });
		    };
		    $scope.subdivisionSelected = function ($item, $model, $label) {
				require(["esri/geometry/Polygon","esri/graphic", "esri/layers/GraphicsLayer", "esri/symbols/SimpleFillSymbol"], function(Polygon, Graphic, GraphicsLayer, SimpleFillSymbol) {
					var poly = new Polygon($item.geometry);					
					poly.spatialReference = $scope.map.spatialReference;
					$scope.map.setExtent(poly.getExtent(), true);
			  		var gl = $scope.map.getLayer('subdivisionGraphics');
					var g = null;
					if (!gl) {
					  gl = new GraphicsLayer({id: 'subdivisionGraphics'});
					  $scope.map.addLayer(gl);
					 }
					gl.clear();					
					var fill = new SimpleFillSymbol({
					  "type": "esriSFS",
					  "style": "esriSFSNull",
						"color": [31,117,254,40],
					    "outline": {
					     "type": "esriSLS",
					     "style": "esriSLSSolid",
							"color": [255,140,0,255],
					     "width": 5
						 }
					});
					g = new Graphic(poly,fill);
					gl.add(g);
					$timeout(function () {
						$scope.selectedSubdivision = $item;
						$scope.$apply();
						console.log($scope.selectedSubdivision);
					});
				});
		    };
		},
		link: function (scope, element, attrs) {
			// scope.searches = [{label: 'For Property', value: 'property'}, {label: 'For Location', value: 'location'}];
			// scope.selectedSearch = scope.searches[0];
		}
	}
});
