angular.module('imapsNgApp')
.directive('propertyAddresses', function () {
	return {
		templateUrl: 'directives/sidePanel/propertySearch/propertyAddresses/propertyAddresses.html',
		restrict: 'E',
		controller: function ($scope) {
			$scope.rpid = null;
			$scope.raleighCols = [
			  		{
			  			field: 'address',
			  			displayName: 'Address'
			  		},
			  		{
			  			field: 'type',
			  			displayName: 'Type'
			  		},
			  		{
			  			field: 'status',
			  			displayName: 'Status'
			  		}
			  	];
			$scope.wakeCols = [
		  		{
		  			field: 'attributes.ADDRESS',
		  			displayName: 'Address'
		  		}
			]
			$scope.addrGrid = {
			  	data: [],
			  	showGridShowPerPage: false,
			  	showGridSearch: false,
			  	pageSize: 10000,
			  	pageSizes: [10000],
			  	height: $('.tabcontainer').height() - 62,
			  	columnDefs: $scope.raleighCols
			  };
			$scope.$watch('addresses', function (addresses) {
				if (addresses) {
					if (addresses.length > 0) {
						$scope.addrGrid.data = addresses;
						if (addresses[0].rpidMap) {
							$scope.addrGrid.columnDefs = $scope.raleighCols;
							$scope.rpid = addresses[0].rpidMap + ' ' + addresses[0].rpidLot;
							angular.forEach(addresses, function (a) {
								if (a.suite.trim().length > 0) {
									a.address += ', STE ' + a.suite;
								}
							});
						} else {
							$scope.addrGrid.columnDefs = $scope.wakeCols;
							$scope.rpid = null;
						}
						$("#addrGrid .ngReactGridViewPort").css({'min-height': $('.tabcontainer').height() - 30 + 'px', 'max-height': $('.tabcontainer').height() - 62 + 'px'});
					}
				}
			});
		},
		link: function (scope, element, attrs) {
		}
	}
});