angular.module('imapsNgApp').factory('property', ['$http', '$q', function($http, $q){
	var service = {getRealEstate:getRealEstate, getPhotos:getPhotos},
		baseUrl = "https://maps.raleighnc.gov/arcgis/rest/services/Parcels/MapServer/exts/PropertySOE/";
	return service;
	function getRealEstate (type, values) {
		var deferred = $q.defer();
		$http({
			method: 'GET', 
			url: baseUrl + "RealEstateSearch",
			params: {
				type: type,
				values: JSON.stringify(values),
				f: "json"
			}
		}).success(deferred.resolve);
		return deferred.promise;
	}
	function getPhotos (reid) {
		var deferred = $q.defer();
		$http({
			method: 'GET', 
			url: baseUrl + "PhotoSearch",
			params: {
				reid: reid,
				f: "json"
			}
		}).success(deferred.resolve);
		return deferred.promise;
	}
}]);
