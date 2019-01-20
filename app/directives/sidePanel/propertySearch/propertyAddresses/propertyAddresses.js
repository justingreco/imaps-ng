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
			  			field: 'attributes.FEATURETYPE',
			  			displayName: 'Type'
			  		},
			  		{
			  			field: 'attributes.LIFECYCLE',
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
						if (addresses[0].attributes.FEATURETYPE) {
							$scope.addrGrid.columnDefs = $scope.raleighCols;
							$scope.addressExports = [{'ADDRESS': 'Address', 'FEATURETYPE': 'Type', 'LIFECYCLE': 'Status'}];

							addresses.forEach(function (address) {
								$scope.addressExports.push({'ADDRESS': address.attributes.ADDRESS, 'FEATURETYPE': address.attributes.FEATURETYPE, 'LIFECYCLE': address.attributes.LIFECYCLE});
							});
							// $scope.rpid = addresses[0].rpidMap + ' ' + addresses[0].rpidLot;
							// angular.forEach(addresses, function (a) {
							// 	if (a.suite.trim().length > 0) {
							// 		a.address += ', STE ' + a.suite;
							// 	}
							// });
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