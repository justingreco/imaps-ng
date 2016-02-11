angular.module('imapsNgApp')
.directive('propertyResults', function () {
	return {
		templateUrl: 'directives/sidePanel/propertySearch/propertyResults/propertyResults.html',
		restrict: 'E',
		controller: function ($scope, $timeout, $window, $rootScope) {
			$scope.resultHeader = [];
			$scope.accounts = [];
				$scope.$on('accountUpdate', function (e, accounts) {
					$rootScope.accounts = accounts;
					$scope.resultGrid.data = accounts;
					$scope.resultHeader = [];
					angular.forEach($scope.fields, function (f) {
						$scope.resultHeader.push(f.alias);
					});
					$("#resultGrid .ngReactGridViewPort").css({'min-height': $('.tabcontainer').height() - 50 + 'px', 'max-height': $('.tabcontainer').height() - 50 + 'px'});

				});
			  $scope.resultGrid = {
			  	data: $scope.accounts,
			  	showGridShowPerPage: false,
			  	showGridSearch: false,
			  	pageSize: 10000,
			  	pageSizes: [10000],
			  	height: $('.tabcontainer').height() ,
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
			  						$rootScope.zoomTo = true;

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
	            $(".ngReactGridViewPort").css('max-height', $('.tabcontainer').height() - 50);
 				$(".ngReactGridViewPort").css('min-height', $('.tabcontainer').height() - 50);
	        }, true);
	        w.bind('resize', function () {
	            $scope.$apply();
	        });
		},
		link: function (scope, element, attrs) {
		}
	}
});
