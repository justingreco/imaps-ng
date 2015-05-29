angular.module('imapsNgApp').factory('property', ['$http', '$q', function($http, $q){

	var service = {getRealEstate:getRealEstate, getPhotos:getPhotos, getDeeds:getDeeds, getAddresses:getAddresses, getGeometryByPins:getGeometryByPins, getSepticPermits:getSepticPermits, getWellResults:getWellResults, getServices:getServices},
		baseUrl = "https://maps.raleighnc.gov/arcgis/rest/services/Parcels/MapServer/exts/PropertySOE/",
		serviceUrl = "http://mapstest.raleighnc.gov/arcgis/rest/services/Services/ServicesIMaps/MapServer",
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
	function getServices (geom, extent, width, height) {
		var deferred = $q.defer();
		$http({
			method: 'POST',
			url: serviceUrl + "/identify",
			data: {
				f: "json",
				geometry: geom,
				geometryType: 'esriGeometryPolygon',
				layers: 'all',
				tolerance: 1,
				mapExtent: extent,
				imageDisplay: width + "," + height + ",96",
				returnGeometry: false
			},
			headers: { 'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8', 'Access-Control-Allow-Origin': '*'}
		}).success(deferred.resolve);
		return deferred.promise;
	}
	function getSepticPermits (pin) {
		var deferred = $q.defer();
		$http({
			method: 'GET',
			url: baseUrl + "SepticPermits",
			params: {
				pin: pin,
				f: "json"
			}
		}).success(deferred.resolve);
		return deferred.promise;
	}
	function getWellResults (pin) {
		var deferred = $q.defer();
		$http({
			method: 'GET',
			url: baseUrl + "WellResults",
			params: {
				pin: pin,
				f: "json"
			}
		}).success(deferred.resolve);
		return deferred.promise;
	}
	function getGeometryByPins (where, wkid) {
		var deferred = $q.defer();
		$http({
			method: 'POST',
			url: propertyLayer + "/0/query",
			params: {
				where: where,
				returnGeometry: true,
				outSR: wkid,
				f: "pjson"
			}
		}).success(deferred.resolve);
		return deferred.promise;
	}
}]);
