angular.module('imapsNgApp').factory('mapUtils', ['$http', '$q', function($http, $q){
	var service = {loadRaleighBounds:loadRaleighBounds, buffer:buffer, project:project}
	return service;
	function loadRaleighBounds (path) {
		var deferred = $q.defer();
		$http({
			method: 'GET',
			url: path
		}).success(deferred.resolve);
		return deferred.promise;
	}

	function buffer (url, geoms, wkid, distance, unit, type) {
		//geoms = {geometryType: type, geometries: geoms};
		var deferred = $q.defer();
		$http({
			method: 'POST',
			url: url+ '/buffer',
			data: {
				geometries: stringify(geoms),
				inSR: wkid,
				outSR: wkid,
				bufferSR: wkid,
				distances: distance,
				unit: unit,
				unionResults: true,
				f: 'json'
			},
        headers: {'Content-Type': 'application/x-www-form-urlencoded'}
		}).success(deferred.resolve);
		return deferred.promise;
	};
	function project (url, geometries, inSR, outSR) {
		var deferred = $q.defer();
		$http({
			method: 'POST',
			url: url+ '/project',
			data: $.param({
				geometries: stringify(geometries),
				inSR: inSR,
				outSR: outSR,
				f: 'json'
			}),
        headers: {'Content-Type': 'application/x-www-form-urlencoded'}
		}).success(deferred.resolve);
		return deferred.promise;		
	}
}]);
