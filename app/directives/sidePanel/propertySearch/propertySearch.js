angular.module('imapsNgApp')
.directive('propertySearch', function () {
	return {
		templateUrl: 'directives/sidePanel/propertySearch/propertySearch.html',
		restrict: 'E',
		controller: function ($scope, $rootScope, $timeout, property, $analytics, $location) {
			$scope.hiddenOverflow = false;
			$scope.property = property;
			$scope.searchValue = "";

			var url = "https://maps.raleighnc.gov/arcgis/rest/services/Parcels/MapServer/exts/PropertySOE/AutoComplete";
			var autocompleteFilter = function (response) {
				var data = [];
				if (response.Results.length > 0) {
					angular.forEach(response.Results, function (r) {
						data.push({value: r});
					});
				}
				return data;
			};
			var searchByValue = function () {
			}
			$scope.tabChanged = function (disable) {
				angular.forEach($scope.tabs, function (t, i) {
					if (i > 0) {
						t.disabled = disable;
					}
					t.highlighted = false;
				});
				$scope.tab.highlighted = true;
			}

			$rootScope.$on('mapLoaded', function (e) {
	    		if ($location.search().pin) {
	    			searchForRealEstate('pin', $location.search().pin.split(','));
	    		}
			});

			$scope.$on('accountSelected', function (e, account) {
				$scope.tabChanged(false);
				//$scope.$apply();
			});

			$rootScope.$on('accountUpdate', function (e, accounts) {
				if (accounts.length === 1) {
					$scope.tab = $scope.tabs[1];
					$scope.pin = accounts[0].pin;
					$location.search('pin', $scope.pin);
					$scope.reid = accounts[0].reid;
					$scope.account = accounts[0];
					$rootScope.$broadcast('pinUpdate', $scope.pin);
							$timeout(function () {
								$scope.$broadcast('accountSelected', accounts[0]);
						});
				} else {
					$scope.tab = $scope.tabs[0];
					$scope.tabChanged(true);
				}
			});

			searchForRealEstate = function (type, values) {
				$scope.property.getRealEstate(type, values).then(function (accounts) {
					$scope.account = null;
					//$scope.geometry = null;
					$scope.fields = accounts.Fields;
					$scope.accounts = accounts.Accounts;
					$scope.accountsSrc = accounts.Accounts;
					$rootScope.$broadcast('accountUpdate', $scope.accounts);

				});
			};

			var valueSelected = function (a, b, c) {
				c = ((c === 'streetname') ? 'street name':c);
				searchForRealEstate(c, [b.value]);
			}



			var address = new Bloodhound({
				datumTokenizer: function (datum) {
			        return Bloodhound.tokenizers.whitespace(datum.value);
			    },
			    queryTokenizer: Bloodhound.tokenizers.whitespace,
				remote: {
					url: url + "?type=address&f=json",
					filter: autocompleteFilter,
					replace: function(url, uriEncodedQuery) {
						  uriEncodedQuery = uriEncodedQuery.replace(/\'/g, "''").toUpperCase();
					      var newUrl = url + '&input=' + uriEncodedQuery;
					      return newUrl;
					}
				}
			});
			var owner = new Bloodhound({
				datumTokenizer: function (datum) {
			        return Bloodhound.tokenizers.whitespace(datum.value);
			    },
			    queryTokenizer: Bloodhound.tokenizers.whitespace,
				remote: {
					url: url + "?type=owner&f=json",
					filter: autocompleteFilter,
					replace: function(url, uriEncodedQuery) {
						  uriEncodedQuery = uriEncodedQuery.replace(/\'/g, "''").toUpperCase();
					      var newUrl = url + '&input=' + uriEncodedQuery;
					      return newUrl;
					}
				}
			});
			var pin = new Bloodhound({
				datumTokenizer: function (datum) {
			        return Bloodhound.tokenizers.whitespace(datum.value);
			    },
			    queryTokenizer: Bloodhound.tokenizers.whitespace,
				remote: {
					url: url + "?type=pin&f=json&limit=5",
					filter: autocompleteFilter,
					replace: function(url, uriEncodedQuery) {
						  uriEncodedQuery = uriEncodedQuery.replace(/\'/g, "''").toUpperCase();
					      var newUrl = url + '&input=' + uriEncodedQuery;
					      return newUrl;
					}
				}
			});
			var reid = new Bloodhound({
				datumTokenizer: function (datum) {
			        return Bloodhound.tokenizers.whitespace(datum.value);
			    },
			    queryTokenizer: Bloodhound.tokenizers.whitespace,
				remote: {
					url: url + "?type=reid&f=json&limit=5",
					filter: autocompleteFilter,
					replace: function(url, uriEncodedQuery) {
						  uriEncodedQuery = uriEncodedQuery.replace(/\'/g, "''").toUpperCase();
					      var newUrl = url + '&input=' + uriEncodedQuery;
					      return newUrl;
					}
				}
			});
			var street = new Bloodhound({
				datumTokenizer: function (datum) {
			        return Bloodhound.tokenizers.whitespace(datum.value);
			    },
			    queryTokenizer: Bloodhound.tokenizers.whitespace,
				remote: {
					url: url + "?type=street name&f=json&limit=5",
					filter: autocompleteFilter,
					replace: function(url, uriEncodedQuery) {
						  uriEncodedQuery = uriEncodedQuery.replace(/\'/g, "''").toUpperCase();
					      var newUrl = url + '&input=%25' + uriEncodedQuery;
					      return newUrl;
					}
				}
			});
			address.initialize();
			owner.initialize();
			pin.initialize();
			reid.initialize();
			street.initialize();
			$scope.autocomplete = {
				displayKey: 'value',
				source: address.ttAdapter()
			};
			//$scope.searchValue = null;
			$("#searchInput").typeahead({hint: true, highlight: true, minLength: 3},
				{name:'address',
				displayKey:'value',
				source:address.ttAdapter(),
				templates: {
					header: "<h5>Addresses</h5>"
				}},
				{name:'owner',
				displayKey:'value',
				source:owner.ttAdapter(),
				templates: {
					header: "<h5>Owners</h5>"
				}},
				{name:'pin',
				displayKey:'value',
				source:pin.ttAdapter(),
				templates: {
					header: "<h5>PIN</h5>"
				}},
				{name:'reid',
				displayKey:'value',
				source:reid.ttAdapter(),
				templates: {
					header: "<h5>Real Estate ID</h5>"
				}},
				{name:'streetname',
				displayKey:'value',
				source:street.ttAdapter(),
				templates: {
					header: "<h5>Street</h5>"
				}}).on("typeahead:selected", valueSelected);
				$timeout(function () {
					$('.tt-input').keyup(function () {
						$scope.searchValue = $('.tt-input').val();
						$scope.$apply();
					});
				});
				var highlightTab = function (tab) {
					angular.forEach($scope.tabs, function (t) {
						t.highlighted = false;
					});
					tab.highlighted = true;
				}
				var tabAction = function (tab) {
					switch (tab.title) {
						case "Results":
						break;
						case "Info":
						break;
						case "Photos":
							$scope.property.getPhotos($scope.account.reid).then(function (photos) {
								$scope.photos = photos.Photos;
							});
						break;
						case "Deeds":
							$scope.property.getDeeds($scope.account.reid).then(function (deeds) {
								$scope.deeds = deeds.Deeds;
								$scope.plats = [];
								angular.forEach($scope.deeds, function (deed) {
									if (deed.bomDocNum) {
										$scope.plats.push(deed);
									}
								});
							});
						break;
						case "Tax Info":
							window.open("http://services.wakegov.com/realestate/Account.asp?id=" + $scope.account.reid, "_blank");
						break;
						case "Services":
							$scope.$broadcast('servicesClicked', $scope.geometry);
						break;
						case "Addresses":
							$scope.property.getAddresses($scope.account.pin, $scope.account.reid).then(function (addresses) {
								$scope.addresses = addresses.Addresses;
							});
						break;
					}
				}
				$scope.tabClicked = function (tab) {
					if (!tab.disabled) {
							$scope.tab = tab;
							highlightTab(tab);
							tabAction(tab);
					}
				};
				$scope.clearTypeahead = function () {
					$("#searchInput").typeahead('val', '');
					$scope.searchValue = "";
				}
		},
		link: function (scope, element, attrs) {
			scope.tabs = [
				{icon: 'list', title:'Results', highlighted: true, disabled: false, table: true},
				{icon: 'info-sign', title:'Info', highlighted: false, disabled: true, table: true},
				{icon: 'camera', title:'Photos', highlighted: false, disabled: true, table: false},
				{icon: 'file', title:'Deeds', highlighted: false, disabled: true, table: false},
				{icon: 'usd', title:'Tax Info', highlighted: false, disabled: true, table: false},
				{icon: 'flag', title:'Services', highlighted: false, disabled: true, table: false},
				{icon: 'home', title:'Addresses', highlighted: false, disabled: true, table: true}
			];
			scope.tab = scope.tabs[0];
		}
	}
});
