angular.module('imapsNgApp')
.directive('propertyServices', function () {
	return {
		templateUrl: 'sidePanel/propertySearch/propertyServices/propertyServices.html',
		restrict: 'E',
		controller: function ($scope, property, $filter) {
			var writeFields = function (line, atts) {
				var cnt = line.split("[").length - 1;
				var regExp = /\[(.*?)\]/;
				for (var i = 0;i < cnt;i++) {
					m = regExp.exec(line);
					if (m[0].indexOf(":proper") > - 1) {
						m[1] = m[1].replace(/:proper/g, "");
						line = line.replace(m[0], $filter('titleCase')(atts[m[1]]).replace("Nc", "NC"));
					} else {
						line = line.replace(m[0], atts[m[1]]);
					}
				}
				return line;
			};

			var getService = function (results, layerId) {
				return $filter('filter')(results, function (result) {
					return result.layerId === layerId;
				});
			};
			var handleResponse = function (response) {
				var label = "";
				angular.forEach($scope.config.services.categories, function (category) {
					var c = {title: category.title, services:[]};
					angular.forEach(category.services, function (service) {
						var results = getService(response.results, service.layerId);
						if (results.length > 0) {
							var s = {title: writeFields(service.title, results[0].attributes), items:[]};
							angular.forEach(results, function (result) {
								var lines = service.labels.split(';');
								angular.forEach(lines, function (line) {
									var label = writeFields(line, result.attributes) + "<br/>";
									if (s.items.indexOf(label) === -1) {
										s.items.push(label);
									}

								});
							});
							if (s.items.length > 0) {
								c.services.push(s);
							}
						}
					})
					if (c.services.length > 0) {
						$scope.propertyServices.categories.push(c);
					}
				});
			};

			$scope.$on('servicesClicked', function (e, geometry) {
				$scope.propertyServices = {categories:[]};
				require([
				    "esri/graphic"
				], function(Graphic) {
		// 			var jsonConv = new esriConverter();
		// 			var gj = {type: 'Feature', geometry: jsonConv.toGeoJson($scope.geometry)};
		// 			var newgj = turf.buffer(gj, 2000, 'feet');
		// 			jsonConv = new geoJsonConverter();
		// 			var newgeom = jsonConv.toEsri(newgj);
		// 			newgeom.features[0].symbol = {"color":[0,0,0,64],"outline":{"color":[0,0,0,255],
    // "width":1,"type":"esriSLS","style":"esriSLSSolid"},
    // "type":"esriSFS","style":"esriSFSSolid"};
		// console.log(JSON.stringify(gj));
		// console.log(JSON.stringify(newgj));
		// 			var g = new Graphic(newgeom.features[0]);
					property.getServices($scope.geometry, $scope.map.extent, $scope.map.width, $scope.map.height).then(function (response) {
						handleResponse(response);
					});
				});
			});
		},
		link: function (scope, element, attrs) {

		}
	}
});
