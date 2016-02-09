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
				$scope.pin = account.pin;
				$scope.reid = account.reid;
				$rootScope.$broadcast('pinUpdate', account.pin);
				angular.forEach($scope.fields, function (f) {
				 	if (f.type === 'currency') {
				 		account[f.field] = $filter('currency')(account[f.field], '$', 0);
				 	}
					$scope.accountInfo.push({field: f.alias, value: account[f.field]});
				});
				$rootScope.accountInfo = $scope.accountInfo;
			};
			var getSepticPermits = function (pin) {
				property.getSepticPermits(pin).then(function (data) {
					if (data.SepticPermits.length > 0) {
						angular.forEach(data.SepticPermits, function (permit) {
							$scope.accountInfo.push({field: 'Septic Permit', value: permit.permitNumber});
						});
/*						$timeout(function() {
							$scope.infoGrid.data = $scope.accountInfo;
						});	*/
					}
					getWellSamples(pin);
				});
			};
			var getWellSamples = function (pin) {
				property.getWellResults(pin).then(function (data) {
					if (data.WellResults.length > 0) {
						$scope.accountInfo.push({field: 'Well Samples', value: pin});
					}
					$timeout(function() {
						$scope.infoGrid.data = $scope.accountInfo;
					});
				});
			};
			if ($scope.account && !$scope.accountInfo) {
				formatAccountInfo($scope.account);
			}
			$scope.$on('accountSelected', function (e, account) {
				$rootScope.account = account;
				formatAccountInfo(account);
				if (account.city === 'RALEIGH')
				{
					//$scope.accountInfo.push({field: 'Crime', value: 'http://www.crimemapping.com/Map/Find/' + account.siteAddress + "," + account.city + ",NC"});
					$scope.accountInfo.push({field: 'Crime', value: 'https://maps.raleighnc.gov/crime?pin=' + account.pin});					
				}
				if (account.pin) {
					getSepticPermits(account.pin);
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
									return React.DOM.a({className: 'ps-link', href:"http://gisasp2.wakegov.com/imaps/RequestedPermit.aspx?permit=" + row.value, target:"_blank"}, row.value + " ", React.DOM.span({className: 'glyphicon glyphicon-new-window'}));
								} else if (row.field === "Well Samples") {
									return React.DOM.a({className: 'ps-link', href:"http://justingreco.github.io/water-analysis/app/index.html#/?pin=" + row.value, target:"_blank"}, "View ", React.DOM.span({className: 'glyphicon glyphicon-new-window'}));
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
