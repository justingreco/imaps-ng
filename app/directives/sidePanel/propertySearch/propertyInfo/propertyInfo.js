angular.module('imapsNgApp')
.directive('propertyInfo', function () {
	return {
		templateUrl: 'directives/sidePanel/propertySearch/propertyInfo/propertyInfo.html',
		restrict: 'E',
		controller: function ($scope, $filter, $timeout, $rootScope, property) {
			$scope.accountInfo = [];
			var formatAccountInfo = function (account) {
				$scope.accountInfo = [];
				$scope.tabChanged(false);
				$scope.pin = account.PIN_NUM;
				$scope.reid = account.REID;
				$rootScope.$broadcast('pinUpdate', account.attributes.PIN_NUM);
				var currencyFields = ['LAND_VAL','BLDG_VAL','TOTAL_VALUE_ASSD','TOTSALPRICE'];
				var dateFields = ['DEED_DATE', 'SALE_DATE'];
				var date = null;
				angular.forEach($scope.fields, function (f) {
					if (f.name != "OBJECTID") {
						if (f.type === 'esriFieldTypeDouble') {
							account.attributes[f.name] = Math.round(account.attributes[f.name] * 100) / 100;
						}
						if (currencyFields.indexOf(f.name) > -1) {
							account.attributes[f.name] = $filter('currency')(account.attributes[f.name], '$', 0);
						}
						if (dateFields.indexOf(f.name) > -1) {
						   if (account.attributes[f.name]) {
							   date = new Date(account.attributes[f.name]);
							   account.attributes[f.name] = date.getMonth()+1+'/'+date.getDate()+'/'+date.getFullYear();
						   }
						}
					    if (!account.attributes[f.name]) {
							account.attributes[f.name] = '';
						}

					   $scope.accountInfo.push({field: f.alias, value: account.attributes[f.name]});
					}
				});
				$rootScope.accountInfo = $scope.accountInfo;
				setGrid();
			};
			var getSepticPermits = function (pin) {
				property.getSepticPermits(pin).then(function (data) {
					if (data.features) {
						if (data.features.length > 0) {
							$scope.accountInfo.push({field: 'Septic Permit', value: pin});
						}
					}
					getWellSamples(pin);
				});
			};
			var getWellSamples = function (pin) {
				
				 property.getWellResults(pin).then(function (data) {
					if (data.features) {
						if (data.features.length > 0) {
							$scope.accountInfo.push({field: 'Well Samples', value: pin});
						}
						$timeout(function() {
							
							$scope.infoGrid.data = $scope.accountInfo;
							setGrid();
						});						
					}
				});
				// property.getWellResults(pin).then(function (data) {
				// 	if (data.WellResults) {
				// 		if (data.WellResults.length > 0) {
				// 			$scope.accountInfo.push({field: 'Well Samples', value: pin});
				// 		}
				// 		$timeout(function() {
				// 			$scope.infoGrid.data = $scope.accountInfo;
				// 		});
				// 	}
				// });
			};
			if ($scope.account && !$scope.accountInfo) {
				formatAccountInfo($scope.account);
			}
			$scope.$on('accountSelected', function (e, account) {
				$rootScope.account = account;
				formatAccountInfo(account);
				if (account.attributes.CITY_DECODE === 'RALEIGH')
				{
					$scope.accountInfo.push({field: 'Crime', value: 'https://www.crimemapping.com/map/location/' + account.attributes.SITE_ADDRESS + "," + account.attributes.CITY_DECODE + ",NC"});
				}
				if (account.attributes.PIN_NUM) { 
					getSepticPermits(account.attributes.PIN_NUM);
				}
				$("#infoGrid .ngReactGridViewPort").css({'min-height': $('.tabcontainer').height() - 30 + 'px', 'max-height': $('.tabcontainer').height() - 30 + 'px'});
			});
			var setGrid = function () {
				$scope.infoGrid = {
					data: $scope.accountInfo,
					showGridShowPerPage: false,
					showGridSearch: false,
					pageSize: 100,
					pageSizes: [100],
					height: $('.tabcontainer').height() - 30,
					columnDefs: [
						{
							field: 'field',
							displayName: 'Field',
							sort: false
						},
						{
							field: 'value',
							displayName: 'Value',
							sort: false,
							render: function (row) {
								if (row.field === "Septic Permit") {
									return React.DOM.a({className: 'ps-link', href:"https://maps.wakegov.com/septic/index.html#/?pin=" + row.value, target:"_blank"}, "View ", React.DOM.span({className: 'glyphicon glyphicon-new-window'}));
								} else if (row.field === "Well Samples") {
									return React.DOM.a({className: 'ps-link', href:"https://maps.wakegov.com/water-analysis/index.html#/?pin=" + row.value, target:"_blank"}, "View ", React.DOM.span({className: 'glyphicon glyphicon-new-window'}));
								} else if (row.field === "Crime") {
									return React.DOM.a({className: 'ps-link', href: row.value, target:"_blank"}, "View ", React.DOM.span({className: 'glyphicon glyphicon-new-window'}));
								}
							}
						}
					]
				}
			;};
			setGrid();
			$scope.toggleProperty = function (forward) {
				var current = $scope.accounts.indexOf($scope.account),
					idx = (forward) ? current + 1 : current - 1;
				if (idx === -1) {
					idx = $scope.accounts.length - 1;
				} else if (idx === $scope.accounts.length) {
					idx = 0;
				}
				$scope.account = $scope.accounts[idx];
				$scope.$broadcast('accountSelected', $scope.account);
			};
		},
		link: function (scope, element, attrs) {
		}
	}
});
