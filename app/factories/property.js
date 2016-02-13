angular.module('imapsNgApp').factory('property', ['$http', '$q', function($http, $q){

	var service = {getRealEstate:getRealEstate, getPhotos:getPhotos, getDeeds:getDeeds, getAddresses:getAddresses, getGeometryByPins:getGeometryByPins, getPropertiesByGeometry:getPropertiesByGeometry, getSepticPermits:getSepticPermits, getWellResults:getWellResults, getServices:getServices},
		baseUrl = "https://maps.raleighnc.gov/arcgis/rest/services/Parcels/MapServer/exts/PropertySOE/",
		serviceUrl = "https://maps.raleighnc.gov/arcgis/rest/services/Services/ServicesIMaps/MapServer",
		propertyLayer = "https://maps.raleighnc.gov/arcgis/rest/services/Parcels/MapServer";
	return service;
	function getRealEstate (type, values) {
		var deferred = $q.defer();
		$http({
			method: 'POST',
			url: baseUrl + "RealEstateSearch",
			data: $.param({
				type: type,
				values: JSON.stringify(values),
				f: "json"
			}),
        headers: {'Content-Type': 'application/x-www-form-urlencoded'}
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
			data: $.param({
				f: "json",
				geometry: stringify(geom),
				geometryType: 'esriGeometryPolygon',
				layers: 'all',
				tolerance: 1,
				mapExtent: stringify(extent),
				imageDisplay: width + "," + height + ",96",
				returnGeometry: false
			}),
			headers: { 'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8'}
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
	function getGeometryByPins (where, lid, wkid) {
		var deferred = $q.defer();
		$http({
			method: 'POST',
			url: propertyLayer + "/" + lid + "/query",
			data: $.param({
				where: where,
				returnGeometry: true,
				outFields: 'PIN_NUM,SITE_ADDRESS,OWNER',
				outSR: wkid,
				geometryPrecision: 0,
				f: "json"
			}),
        headers: {'Content-Type': 'application/x-www-form-urlencoded'}
		}).success(deferred.resolve);
		return deferred.promise;
	}
	function getPropertiesByGeometry (geom, type, lid, wkid) {
		var deferred = $q.defer();
		$http({
			method: 'POST',
			url: propertyLayer + "/" + lid + "/query",
			data: $.param({
				where: '1=1',
				geometry: stringify(geom),
				returnGeometry: false,
				outFields: 'PIN_NUM',
				geometryType: type,
				geometryPrecision: 0,
				outSR: wkid,
				f: "json"
			}),
        headers: {'Content-Type': 'application/x-www-form-urlencoded'}

		}).success(deferred.resolve);
		return deferred.promise;
	}
}]);
