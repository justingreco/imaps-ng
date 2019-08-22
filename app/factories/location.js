angular.module('imapsNgApp').factory('locationFactory', ['$http', '$q', function($http, $q){
	var service = {getSubdivision:getSubdivision, getStreets:getStreets, getIntersectingStreets:getIntersectingStreets, geocodeAddress:geocodeAddress, getPlaceTypes:getPlaceTypes, getPlacesByType:getPlacesByType},
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
				outFields: '*',
				returnGeometry: true,
				geometryPrecision: 0,
				f: "json"
			}		
		}).success(deferred.resolve);
		return deferred.promise;
	};
	function getStreets (street) {
		var deferred = $q.defer();
		$http({
			method: 'GET',
			url: 'https://maps.raleighnc.gov/arcgis/rest/services/StreetsDissolved/MapServer/0/query',
			params: {
				where: "UPPER(CARTONAME) LIKE '%" + street.toUpperCase() + "%'",
				orderByFields: 'CARTONAME',
				outFields: 'CARTONAME',
				returnGeometry: true,
				geometryPrecision: 0,
				f: "json"
			}		
		}).success(deferred.resolve);
		return deferred.promise;
	};	
	function getIntersectingStreets (geom) {
		var deferred = $q.defer();
		$http({
			method: 'POST',
			url: 'https://maps.raleighnc.gov/arcgis/rest/services/StreetsDissolved/MapServer/0/query',
			data: $.param({
				geometry: JSON.stringify(geom),
				geometryType: 'esriGeometryPolyline',
				returnGeometry: false,
				outFields: 'CARTONAME',
				orderByFields: 'CARTONAME',
				geometryPrecision: 0,
				f: "json"
			}),
        	headers: {'Content-Type': 'application/x-www-form-urlencoded'}
		}).success(deferred.resolve);
		return deferred.promise;
	};
	function geocodeAddress (address) {
		var deferred = $q.defer();
		$http({
			method: 'GET',
			url: 'https://maps.raleighnc.gov/arcgis/rest/services/Locators/CompositeLocator/GeocodeServer/findAddressCandidates',
			params: {
				'SingleLine': address,
				returnGeometry: true,
				f: "json"
			}		
		}).success(deferred.resolve);
		return deferred.promise;
	};
	function getPlaceTypes () {
		var deferred = $q.defer();
		$http({
			method: 'GET',
			url: 'https://services.arcgis.com/v400IkDOw1ad7Yad/arcgis/rest/services/Places_Of_Interest/FeatureServer/0/query',
			params: {
				where: '1=1',
				outFields: 'ICON',
				returnDistinctValues: true,
				orderByFields: 'ICON',
				returnGeometry: false,
				f: "json"
			}		
		}).success(deferred.resolve);
		return deferred.promise;
	};
	function getPlacesByType (type) {
		var deferred = $q.defer();
		$http({
			method: 'GET',
			url: 'https://services.arcgis.com/v400IkDOw1ad7Yad/arcgis/rest/services/Places_Of_Interest/FeatureServer/0/query',
			params: {
				where: "ICON = '" + type + "'",
				outFields: '*',
				orderByFields: 'NAME',
				returnGeometry: true,
				f: "json"
			}		
		}).success(deferred.resolve);
		return deferred.promise;
	};			
}]);
