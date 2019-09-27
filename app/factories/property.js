angular.module('imapsNgApp').factory('property', ['$http', '$q', function($http, $q){

	var service = {getRealEstate:getRealEstate, getPhotos:getPhotos, getDeeds:getDeeds, getAddresses:getAddresses, getGeometryByPins:getGeometryByPins, getPropertiesByGeometry:getPropertiesByGeometry, getSepticPermits:getSepticPermits, getWellResults:getWellResults, getServices:getServices, getPinFromAddress:getPinFromAddress},
		baseUrl = "https://maps.raleighnc.gov/arcgis/rest/services/Parcels/MapServer/exts/PropertySOE/",
		serviceUrl = "https://maps.raleighnc.gov/arcgis/rest/services/Services/ServicesIMaps/MapServer",
		propertyLayer = "https://maps.raleighnc.gov/arcgis/rest/services/Parcels/MapServer",
		propertyService = "https://maps.raleighnc.gov/arcgis/rest/services/Property/Property/MapServer/",
		addressService = "https://maps.raleighnc.gov/arcgis/rest/services/Energov/DataMap_Energov/MapServer/1/query";

	return service;
	function getRealEstate (type, values) {
		var deferred = $q.defer();
		var where = "(";
		values.forEach(function (value, i) {
			if (i < values.length - 1) {
				where += "'" + value + "',";
			} else {
				where += "'" + value + "')";
			}
		});
		var field = "";
		switch(type) {
			case "address":
				field = "SITE_ADDRESS";
				break;
			case "pin":
				field = "PIN_NUM";
				break;
			case "reid":
				field = "REID";
				break;
			case "owner":
				field = "OWNER";
				break;
			case "street name":
				field = "FULL_STREET_NAME";
				break;																
		}
		where = field + " IN " + where;
		
		if (type === 'street name') {
			where = field + " LIKE '%" + values[0] + "'";
		} else {
			debugger
			if(where.substr(where.length - 1) != ")"){
				return deferred.promise;
			}
		}
		var orderByFields = field;
		if (field === 'PIN_NUM') {
			orderByFields = 'PIN_NUM,PIN_EXT';
		}

		$http({
			method: 'POST',
			url: propertyService + "1/query",
			data: $.param({
				outFields: "*",
				orderByFields: orderByFields,
				where: "(PARCEL_STATUS in ('ACT', 'ASSB') or PARCEL_STATUS IS NULL) AND " + where,
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
			url: propertyService + "2/query",
			params: {
				outFields: '*',
				orderByFields: 'DATECREATED DESC',
				where: "PARCEL = '" + reid + "'",
				f: "json"
			}
		}).success(deferred.resolve);
		return deferred.promise;
	}
	function getDeeds (reid) {
		var deferred = $q.defer();
		$http({
			method: 'GET',
			url: propertyService + "3/query",
			params: {
				outFields: '*',
				orderByFields: 'DEED_DATE DESC',				
				where: "REID = '" + reid + "'",
				f: "json"
			}
		}).success(deferred.resolve);
		return deferred.promise;
	}
	function getAddresses (pin, reid, raleigh) {
		var deferred = $q.defer();
		//if (!raleigh) {
			$http({
				method: 'GET',
				url: propertyService + "4/query",
				params: {
					where: "PIN_NUM = '" + pin + "' AND ADDR_LIST = 'Yes'",
					outFields: '*',
					orderByFields: 'ADDRESS',	
					f: "json"
				}
			}).success(deferred.resolve);
		// } else {
		// 	$http({
		// 		method: 'GET',
		// 		url: propertyService + "5/query",
		// 		params: {
		// 			outFields: '*',
		// 			orderByFields: 'ADDRESS,SUITE',	
		// 			where: "PIN_NUM = '" + pin + "'",
		// 			f: "json"
		// 		}
		// 	}).success(deferred.resolve);		
		// }

		return deferred.promise;
	}
	function getPinFromAddress (address) {
		var deferred = $q.defer();
		$http({
			method: 'GET',
			url: propertyService + "4/query",
			params: {
				where: "ADDRESS = '" + address + "'",
				outFields: 'PIN_NUM',
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
			url: "https://maps.raleighnc.gov/arcgis/rest/services/Environmental/SepticTanks/MapServer/0/query",
			params: {
				outFields: 'CURRENT_PIN', 
				returnGeometry: false,
				where: "CURRENT_PIN = '" + pin + "'",
				f: "json"
			}
		}).success(deferred.resolve);
		return deferred.promise;
	}
	function getWellResults (pin) {
		var deferred = $q.defer();
		$http({
			method: 'GET',
			url: "https://maps.raleighnc.gov/arcgis/rest/services/Environmental/Wells/MapServer/0/query",
			params: {
				outFields: 'PIN_NUM', 
				returnGeometry: false,
				where: "PIN_NUM = '" + pin + "'",
				f: "json"
			}
		}).success(deferred.resolve);
		return deferred.promise;
	}	
	// function getWellResults (pin) {
	// 	var deferred = $q.defer();
	// 	$http({
	// 		method: 'GET',
	// 		url: baseUrl + "WellResults",
	// 		params: {
	// 			pin: pin,
	// 			f: "json"
	// 		}
	// 	}).success(deferred.resolve);
	// 	return deferred.promise;
	// }
	function getGeometryByPins (where, lid, wkid) {
		var deferred = $q.defer();
		$http({
			method: 'POST',
			url: propertyService + "/" + lid + "/query",
			data: $.param({
				where: "TAXABLE_STATUS = 'ACTIVE' AND " + where,
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
			url: propertyService + "/" + lid + "/query",
			data: $.param({
				where: '1=1',
				geometry: stringify(geom),
				returnGeometry: false,
				outFields: 'PIN_NUM',
				geometryType: type,
				geometryPrecision: 2,
				outSR: wkid,
				f: "json"
			}),
        headers: {'Content-Type': 'application/x-www-form-urlencoded'}

		}).success(deferred.resolve);
		return deferred.promise;
	}
}]);
