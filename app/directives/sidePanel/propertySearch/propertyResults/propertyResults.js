angular.module('imapsNgApp')
.directive('propertyResults', function () {
	return {
		templateUrl: 'directives/sidePanel/propertySearch/propertyResults/propertyResults.html',
		restrict: 'E',
		controller: function ($scope, $timeout, $window, $rootScope) {
			$scope.resultHeader = [];
			$scope.accounts = [];
				$scope.$on('accountUpdate', function (e, accounts) {
					
					if (!accounts) {
						accounts = [];
					}
					$scope.accountExports = [];
					var date = null;

					accounts.forEach(function(account) { 
						account.attributes.PIN_FULL  = account.attributes.PIN_NUM;
						$scope.fields.forEach(function (f) {
							if (f.type === 'esriFieldTypeDate' && account.attributes[f.name]) {
								date = new Date(account.attributes[f.name]);
								account.attributes[f.name] = date.getMonth()+1+'/'+date.getDate()+'/'+date.getFullYear();
							}
							if (f.type === 'esriFieldTypeDouble' && account.attributes[f.name]) {
								account.attributes[f.name] = Math.round(account.attributes[f.name] * 100) / 100;
							} 		
							if (f.name === 'PIN_EXT' && account.attributes['PIN_EXT']) {
								if (account.attributes['PIN_EXT'] != '000' ) {
									account.attributes.PIN_FULL = account.attributes.PIN_NUM + ' ' + account.attributes.PIN_EXT;

								}
							}			
						});
						$scope.accountExports.push(account.attributes);
					});
					$scope.accounts = accounts;
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
			  			field: 'attributes.SITE_ADDRESS',
			  			displayName: 'Address'
			  		},
			  		{
			  			field: 'attributes.OWNER',
			  			displayName: 'Owner'
			  		},
			  		{
			  			field: 'attributes.PIN_FULL',
			  			displayName: 'PIN'
			  		}
			  	],
			  	rowClick: function (row) {
			  		$scope.resultClicked (row);
			  	}
			  };
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
