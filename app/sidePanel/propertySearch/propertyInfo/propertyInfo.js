angular.module('imapsNgApp')
.directive('propertyInfo', function () {
	return {
		templateUrl: 'sidePanel/propertySearch/propertyInfo/propertyInfo.html',
		restrict: 'E',
		controller: function ($scope, $filter, $timeout) {
			$scope.accountInfo = [];
			var formatAccountInfo = function (account) {
				$scope.accountInfo = [];
				$scope.tabChanged(false);
				$scope.pin = account.pin;
				$scope.reid = account.reid;
				angular.forEach($scope.fields, function (f) {
					if (f.type === 'currency') {
						account[f.field] = $filter('currency')(account[f.field], '$', 0);
					}
					$scope.accountInfo.push({field: f.alias, value: account[f.field]});
				});
				$timeout(function() {
					$scope.infoGrid.data = $scope.accountInfo;
				});
			}

			if ($scope.account && !$scope.accountInfo) {
				formatAccountInfo($scope.account);
			}
			$scope.$on('accountSelected', function (e, account) {
				console.log(account);
				formatAccountInfo(account);
			});	

			  $scope.infoGrid = {
			  	data: $scope.accountInfo,
			  	showGridShowPerPage: false,
			  	showGridSearch: false,
			  	pageSize: 100,
			  	pageSizes: [100],
			  	height: $('.tabcontainer').height() - 70,
			  	columnDefs: [
			  		{
			  			field: 'field',
			  			displayName: 'Field',
			  			sort: false
			  		},
			  		{
			  			field: 'value',
			  			displayName: 'Value', 
			  			sort: false
			  		}
			  	]
			  };		

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