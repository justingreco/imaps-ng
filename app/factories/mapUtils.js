angular.module('imapsNgApp').factory('mapUtils', ['$http', '$q', function($http, $q){
	var service = {loadRaleighBounds:loadRaleighBounds}
	return service;
	function loadRaleighBounds (path) {
		var deferred = $q.defer();
		$http({
			method: 'GET',
			url: path
		}).success(deferred.resolve);
		return deferred.promise;
	}
}]);
