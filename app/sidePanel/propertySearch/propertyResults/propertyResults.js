angular.module('imapsNgApp')
.directive('propertyResults', function () {
	return {
		templateUrl: 'sidePanel/propertySearch/propertyResults/propertyResults.html',
		restrict: 'E',
		controller: function ($scope, $timeout) {
			$scope.accounts = [];
			$scope.resultOptions = {
				rowHeight: 70,
			    enableRowSelection: true,
			    enableRowHeaderSelection: false,
			    modifierKeysToMultiSelect: false,
			    multiSelect: false,
			    noUnselect: true,
			    enableGridMenu: true,
			    gridMenuShowHideColumns: false,
			    enablePagination: false,
			    paginationPageSizes: 1000,				    
			    columnDefs: [
			      { field: 'siteAddress',
			      	displayName: 'Address',
			      	enableSorting: true, 
			      	enableHiding: false, 
			      	enableColumnMenu: false,
			      	width: '30%',
			      	cellTooltip: function(row){ return row.entity.siteAddress; }, 
        			cellTemplate: '<div class="ui-grid-cell-contents wrap" white-space: normal title="TOOLTIP">{{COL_FIELD CUSTOM_FILTERS}}</div>' },
			      { field: 'owner',
			      	enableSorting: true,
			      	width: '30%', 
			      	enableHiding: false, 
			      	enableColumnMenu: false,
			      	cellTooltip: function(row){ return row.entity.owner; }, 
        			cellTemplate: '<div class="ui-grid-cell-contents wrap" white-space: normal title="TOOLTIP">{{COL_FIELD CUSTOM_FILTERS}}</div>' },
			      { field: 'pin',
			      	displayName: 'PIN',
			      	enableSorting: true,
			      	width: '40%', 
			      	enableColumnMenu: false }
			    ],
			    data: 'accounts',
			    onRegisterApi: function( gridApi ) {
			      $scope.grid1Api = gridApi;
			      gridApi.selection.on.rowSelectionChanged($scope,function(row){
			        $scope.account = row.entity;
			        $scope.tab = $scope.tabs[1];
			        $timeout(function () {
			        	$scope.$broadcast('accountSelected', $scope.account);
			    	});
			      });			      
			    }
			  };
		},
		link: function (scope, element, attrs) {
		
		}
	}
});