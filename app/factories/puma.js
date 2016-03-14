angular.module('imapsNgApp').factory('puma', ['$http', '$q', function($http, $q){

	var service = {findUtilitiesById:findUtilitiesById, getUtilityLayers:getUtilityLayers},
		sewer = {url: "http://gis.raleighnc.gov/arcgis/rest/services/PublicUtility/SewerCollection/MapServer/find", layers: '0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16'},
		water = {url: "http://gis.raleighnc.gov/arcgis/rest/services/PublicUtility/WaterDistribution/MapServer/find", layers: '0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15'},
		reclaimed = {url: "http://gis.raleighnc.gov/arcgis/rest/services/PublicUtility/ReclaimedDistribution/MapServer/find", layers: '0,1,2,3,4,5,6,7,8,9,10,11'};
	return service;
	function findUtilitiesById (url, id, value, searchFields) {
		var deferred = $q.defer();

		$http({
			method: 'POST',
			url: url,
			data: $.param({
				searchText: value,
				searchFields: searchFields,
				layers: id,
				geometryPrecision: 0,
				contains: 'true',
				returnGeometry: 'true',
				f: "json"
			}),
        headers: {'Content-Type': 'application/x-www-form-urlencoded'}
		}).success(deferred.resolve);
		return deferred.promise;
	}
	function getUtilityLayers (url) {
		var deferred = $q.defer();
		var layer = '';
		$http({
			method: 'POST',
			url: url,
			data: $.param({
				f: "json"
			}),
        headers: {'Content-Type': 'application/x-www-form-urlencoded'}
		}).success(deferred.resolve);
		return deferred.promise;
	}
}]);
