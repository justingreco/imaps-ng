angular.module('imapsNgApp')
.directive('propertyInfo', function () {
	return {
		templateUrl: 'sidePanel/propertySearch/propertyInfo/propertyInfo.html',
		restrict: 'E',
		controller: function ($scope, $filter) {
			//$scope.accountInfo = [];


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
				//$scope.infoOptions.data = $scope.accountInfo;
			}

			if ($scope.account && !$scope.accountInfo) {
				formatAccountInfo($scope.account);
			}
			$scope.$on('accountSelected', function (e, account) {
				formatAccountInfo(account);
			});			

			$scope.infoOptions = {
			    enableRowSelection: true,
			    enableRowHeaderSelection: false,
			    enableGridMenu: true,
			    modifierKeysToMultiSelect: false,
			    multiSelect: false,
			    noUnselect: true,
			    gridMenuShowHideColumns: false,	
			    enablePagination: false,
			    paginationPageSizes: 1000,			    	
			    columnDefs: [
			      { field: 'field',
			      	displayName: 'Field',
			      	enableSorting: false, 
			      	enableHiding: false, 
			      	enableColumnMenu: false,
			      	cellTooltip: function(row){ 
			      		return row.entity.field; }, 
        			cellTemplate: '<div class="ui-grid-cell-contents wrap" white-space: normal title="TOOLTIP">{{COL_FIELD CUSTOM_FILTERS}}</div>' },
			      { field: 'value',
			      	enableSorting: false,
			      	enableHiding: false, 
			      	enableColumnMenu: false,
			      	cellTooltip: function(row){ 
			      		return row.entity.value; }, 
        			cellTemplate: '<div class="ui-grid-cell-contents wrap" white-space: normal title="TOOLTIP">{{COL_FIELD CUSTOM_FILTERS}}</div>' }
			    ],
			    data: 'accountInfo',
			    onRegisterApi: function( gridApi ) {
			      $scope.grid2Api = gridApi;		      
			    }
			  };			
		},
		link: function (scope, element, attrs) {
		
		}
	}
});