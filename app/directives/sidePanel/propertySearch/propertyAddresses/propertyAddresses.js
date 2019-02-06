angular.module('imapsNgApp')
.directive('propertyAddresses', function () {
	return {
		templateUrl: 'directives/sidePanel/propertySearch/propertyAddresses/propertyAddresses.html',
		restrict: 'E',
		controller: function ($scope) {
			$scope.rpid = null;
			$scope.addressExports = [];
			$scope.raleighCols = [
			  		{
			  			field: 'attributes.ADDRESS',
			  			displayName: 'Address'
			  		},
			  		{
			  			field: 'attributes.TYPE',
			  			displayName: 'Type'
			  		},
			  		{
			  			field: 'attributes.STATUS',
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
						if (addresses[0].attributes.TYPE) {
							$scope.addrGrid.columnDefs = $scope.raleighCols;
							$scope.rpid = addresses[0].attributes.RPID_MAP + ' ' + addresses[0].attributes.RPID_LOT; 
							angular.forEach(addresses, function (a) {
								if (a.attributes.SUITE.trim().length > 0) {
									a.attributes.ADDRESS += ', STE ' + a.attributes.SUITE;
								}
							});							
							$scope.addressExports = [{'ADDRESS': 'Address', 'TYPE': 'Type', 'STATUS': 'Status'}];
							addresses.forEach(function (address) {
								$scope.addressExports.push({'ADDRESS': address.attributes.ADDRESS, 'TYPE': address.attributes.TYPE, 'STATUS': address.attributes.STATUS});
							});

						} else {
							$scope.addressExports = [{'ADDRESS': 'Address'}];

							addresses.forEach(function (address) {
								$scope.addressExports.push({'ADDRESS': address.attributes.ADDRESS});
							});
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