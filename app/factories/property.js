angular.module('imapsNgApp').factory('property', ['$http', '$q', function($http, $q){
	var service = {getRealEstate:getRealEstate, getPhotos:getPhotos, getDeeds:getDeeds, getAddresses:getAddresses, getGeometryByPins:getGeometryByPins},
		baseUrl = "https://maps.raleighnc.gov/arcgis/rest/services/Parcels/MapServer/exts/PropertySOE/",
		serviceUrl = "https://maps.raleighnc.gov/arcgis/rest/services/Services/ServicesIMaps/MapServer",
		propertyLayer = "https://maps.raleighnc.gov/arcgis/rest/services/Parcels/MapServer";
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
	function getDeeds (reid) {
		var deferred = $q.defer();
		$http({
			method: 'GET', 
			url: baseUrl + "DeedSearch",
			params: {
				reid: reid,
				f: "json"
			}
		}).success(deferred.resolve);
		return deferred.promise;
	}
	function getAddresses (pin, reid) {
		var deferred = $q.defer();
		$http({
			method: 'GET', 
			url: baseUrl + "AddressSearch",
			params: {
				pin: pin,
				reid: reid,
				f: "json"
			}
		}).success(deferred.resolve);
		return deferred.promise;
	}	
	function getServices (geom) {
		var deferred = $q.defer();
		$http({
			method: 'GET', 
			url: serviceUrl + "/identify",
			params: {
				f: "json"
			}
		}).success(deferred.resolve);
		return deferred.promise;
	}
	function getGeometryByPins (where) {
		var deferred = $q.defer();
		$http({
			method: 'POST', 
			url: propertyLayer + "/0/query",
			params: {
				where: where,
				returnGeometry: true,
				outSR: 2264,
				f: "pjson"
			}
		}).success(deferred.resolve);
		return deferred.promise;		
	}
}]);
