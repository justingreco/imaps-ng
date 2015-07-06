angular.module('imapsNgApp').factory('locationFactory', ['$http', '$q', function($http, $q){

	var service = {getSubdivision:getSubdivision},
		baseUrl = "http://maps.raleighnc.gov/arcgis/rest/services/Parcels/MapServer/exts/PropertySOE/",
		serviceUrl = "http://maps.raleighnc.gov/arcgis/rest/services/Services/ServicesIMaps/MapServer",
		propertyLayer = "http://maps.raleighnc.gov/arcgis/rest/services/Parcels/MapServer";
	return service;
	function getSubdivision (subdivision) {
		var deferred = $q.defer();
		$http({
			method: 'GET',
			url: 'https://maps.raleighnc.gov/arcgis/rest/services/Planning/Subdivisions/MapServer/0/query',
			params: {
				where: "NAME LIKE '" + subdivision.toUpperCase() + "%'",
				orderByFields: 'NAME',
				outFields: 'NAME',
				returnGeometry: true,
				f: "json"
			}		
		}).success(deferred.resolve);
		return deferred.promise;
	}
}]);
