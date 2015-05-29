angular.module('imapsNgApp').factory('mapUtils', ['$http', '$q', function($http, $q){
	var service = {loadRaleighBounds:loadRaleighBounds, buffer:buffer}
	return service;
	function loadRaleighBounds (path) {
		var deferred = $q.defer();
		$http({
			method: 'GET',
			url: path
		}).success(deferred.resolve);
		return deferred.promise;
	}

	function buffer (url, geom, wkid, distance, unit) {
		var deferred = $q.defer();
		$http({
			method: 'GET',
			url: url,
			geometries: [geom],
			outSR: wkid,
			distances: [distance],
			unit: unit,
			unionResults: true
		}).success(deferred.resolve);
		return deferred.promise;
	}
}]);
