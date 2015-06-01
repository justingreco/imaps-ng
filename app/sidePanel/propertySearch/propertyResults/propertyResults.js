angular.module('imapsNgApp')
.directive('propertyResults', function () {
	return {
		templateUrl: 'sidePanel/propertySearch/propertyResults/propertyResults.html',
		restrict: 'E',
		controller: function ($scope, $timeout, $window) {
			$scope.accounts = [];
				$scope.$on('accountUpdate', function (e, accounts) {
					$scope.accounts = accounts;
					$scope.resultGrid.data = accounts;
				});
			  $scope.resultGrid = {
			  	data: $scope.accounts,
			  	showGridShowPerPage: false,
			  	showGridSearch: false,
			  	pageSize: 10000,
			  	pageSizes: [10000],
			  	height: $('.tabcontainer').height() - 70,
			  	columnDefs: [
			  		{
			  			field: 'siteAddress',
			  			displayName: 'Address'
			  		},
			  		{
			  			field: 'owner',
			  			displayName: 'Owner'
			  		},
			  		{
			  			field: 'pin',
			  			displayName: 'PIN'
			  		}
			  	],
			  	rowClick: function (row) {
			  		$scope.resultClicked (row);
			  	}
			  };
			  $scope.$watch('accounts', function (accounts) {
			  });
			  $scope.resultClicked = function (account) {
			  	$scope.account = account;
			  	$scope.tab = $scope.tabs[1];
			  	$scope.$broadcast('accountSelected', account);
			  }
			var w = angular.element($window);
	        $scope.getWindowDimensions = function () {
	            return {
	                'h': w.height(),
	                'w': w.width()
	            };
	        };
	        $scope.$watch($scope.getWindowDimensions, function (newValue, oldValue) {
	            $(".ngReactGridViewPort").css('max-height', $('.tabcontainer').height() - 70);
 				$(".ngReactGridViewPort").css('min-height', $('.tabcontainer').height() - 70);
	        }, true);
	        w.bind('resize', function () {
	            $scope.$apply();
	        });
		},
		link: function (scope, element, attrs) {
		}
	}
});
