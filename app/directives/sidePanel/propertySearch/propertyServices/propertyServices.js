angular.module('imapsNgApp')
.directive('propertyServices', function () {
	return {
		templateUrl: 'directives/sidePanel/propertySearch/propertyServices/propertyServices.html',
		restrict: 'E',
		controller: function ($scope, property, $filter, mapUtils) {
			var writeFields = function (line, atts) {
				var cnt = line.split("[").length - 1;
				var regExp = /\[(.*?)\]/;
				var m = null;
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

			$scope.$on('servicesClicked', function (e, geom) {
				$scope.propertyServices = {categories:[]};

				require(['esri/geometry/geometryEngine', 'esri/geometry/Polygon'], function (GeometryEngine, Polygon) {
					if  (!geom.type) {
							geom = new  Polygon(geom);
					}
					var buffer = GeometryEngine.buffer(geom, -10, 9002, true);
						property.getServices(buffer, $scope.map.extent, $scope.map.width, $scope.map.height).then(function (response) {
							handleResponse(response);
						});
				});
			});
		},
		link: function (scope, element, attrs) {

		}
	}
});
