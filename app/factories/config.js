angular.module('imapsNgApp').factory('config', ['$http', '$q', function($http, $q){
	var service = {loadConfig:loadConfig}
	return service;
	function loadConfig (path) {
		var deferred = $q.defer();
		$http({
			method: 'GET', 
			url: path
		}).success(deferred.resolve);
		return deferred.promise;
	}
}]);
