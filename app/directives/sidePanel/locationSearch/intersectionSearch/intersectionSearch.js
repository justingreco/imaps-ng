angular.module('imapsNgApp')
.directive('intersectionSearch', function () {
	return {
		templateUrl: 'directives/sidePanel/locationSearch/intersectionSearch/intersectionSearch.html',
		restrict: 'EA',
		controller: function ($scope, $http, locationFactory) {
			$scope.primaryStreet = null;
			$scope.primaryStreets = function(street){
		        return locationFactory.getStreets(street).then(function (response) {
		        	return response.features;
		        });
		    };
		    $scope.primaryStreetSelected = function ($item, $model, $label) {
				locationFactory.getIntersectingStreets($item.geometry).then(function (response) {
					$scope.intersectingStreets = response.features;
				});
		    };
		    $scope.intersectionSelected = function () {
				locationFactory.geocodeAddress($scope.primaryStreet.attributes.CARTONAME + ' & ' +$scope.intersectingStreet.attributes.CARTONAME).then(function (response) {
					if (response.candidates.length > 0) {
						$scope.map.centerAndZoom(response.candidates[0].location, 10);
					}
				});
		    };
		},
		link: function (scope, element, attrs) {
			// scope.searches = [{label: 'For Property', value: 'property'}, {label: 'For Location', value: 'location'}];
			// scope.selectedSearch = scope.searches[0];
		}
	}
});
