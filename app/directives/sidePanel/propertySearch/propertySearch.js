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
			$scope.$on('tabUpdated', function (e, i) {
				$scope.tab = $scope.tabs[i];
				$scope.tabChanged(true);
			});
			//code to handle dragging and dropping of CSV file to initiate property search
			//must be CSV file with headers, one of which needs to include PIN in it.
		    var getPins = function(lines) {
		    	var header = lines[0],
		    		pinIdx = null,
		    		pin = "",
		    		pins = [];
		    	for (var i = 0; i < header.length; i++) {
		    		if (header[i].toUpperCase().indexOf('PIN') > -1) {
		    			pinIdx = i;
		    			break;
		    		}
		    	}
		    	if (!pinIdx) {
			    	for (var i = 1; i < lines.length; i++) {
			    		pin = lines[i][pinIdx];
			    		pins.push(pin);
			    	}
			    	searchForRealEstate('pin', pins);
		    	} else {
		    		alert('CSV must have a field named PIN');
		    	}
		    }
			var processData = function (csv) {
		        var allTextLines = csv.split(/\r\n|\n/);
		        var lines = [];
		        for (var i=0; i<allTextLines.length; i++) {
		            var data = allTextLines[i].split(',');
	                var tarr = [];
	                for (var j=0; j<data.length; j++) {
	                    tarr.push(data[j]);
	                }
	                lines.push(tarr);
		        }
		        if (lines.length === 0) {
		        	alert('Invalid file, please verify that document is a comma separated file.')
		        }
		      getPins(lines);
		    }
			var handleFileSelect = function (evt) {
			    evt.stopPropagation();
			    evt.preventDefault();
      			if (window.FileReader) {   
				    var files = evt.dataTransfer.files
				    var f = evt.dataTransfer.files.item(0);
			 		var reader = new FileReader();
				      reader.onload = (function(theFile) {
				        return function(e) {
				          processData(e.target.result);
				        };
				      })(f);
				    if (f.type === 'text/csv' || f.type === 'text/plain') {
				    	reader.readAsText(f);
				    } else {
				    	alert('Invalid file type, must use a CSV file.')
				    }
				} else {
					alert('FileReader are not supported in this browser.');
				}					    
			}
			var handleDragOver = function (evt) {
				evt.stopPropagation();
				evt.preventDefault();
				evt.dataTransfer.dropEffect = 'copy'; // Explicitly show this is a copy.
			}
			$rootScope.$on('mapLoaded', function (e) {
	    		if ($location.search().pin) {
	    			searchForRealEstate('pin', $location.search().pin.split(','));
	    		}

    			var dropZone = document.getElementById('body');
    			if('draggable' in dropZone) {
      				dropZone.addEventListener('dragover', handleDragOver, false);
    				dropZone.addEventListener('drop', handleFileSelect, false);
				} else {
					alert('Drag and drop not supported in this browser');
				}
			});
			$scope.$on('accountSelected', function (e, account) {
				$location.search('pin', account.pin);
				$scope.tabChanged(false);
				$rootScope.checked = true;
				$scope.searchDir.open = true;
				$scope.layersDir.open = false;
				$rootScope.selectedSearch = $rootScope.searches[0];
				//$scope.$apply();
			});
			$rootScope.$on('accountUpdate', function (e, accounts) {
				$rootScope.checked = true;
				if (accounts.length === 1) {
					$scope.tab = $scope.tabs[1];
					$scope.pin = accounts[0].pin;
					$location.search('pin', $scope.pin);
					$scope.reid = accounts[0].reid;
					$scope.account = accounts[0];
					//$rootScope.$broadcast('pinUpdate', $scope.pin);
						$timeout(function () {
							$scope.$broadcast('accountSelected', accounts[0]);
						});
				} else if (accounts.length === 0) {
					$scope.pin = null;
					$location.search('pin', $scope.pin);
				}
				else {
					$scope.tab = $scope.tabs[0];
					$scope.tabChanged(true);
				}
			});
			var searchForRealEstate = function (type, values) {
				$scope.property.getRealEstate(type, values).then(function (accounts) {
					$scope.account = null;
					//$scope.geometry = null;
					$scope.fields = accounts.Fields;
					$scope.accounts = accounts.Accounts;
					$scope.$parent.account = null;
					$scope.accountsSrc = accounts.Accounts;
					$rootScope.zoomTo = true;
					$rootScope.$broadcast('accountUpdate', $scope.accounts);
				});
			};
			var valueSelected = function (a, b, c) {
				$(".twitter-typeahead>input").blur();
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
			$('#searchInput').on('keyup', function(e) {
			    if(e.which == 13) {
			        $(".tt-highlight").trigger('click');
			    }
			});
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
					//1709.04 63 6109 000 -> 1709636109
					$('.tt-input').on('paste', function (e) {
						$timeout(function () {
							var origPin = $(".tt-input").val();
							if (origPin.length === 19 && origPin.charAt(4) === '.' && origPin.charAt(7) === ' ' & origPin.charAt(10) === ' ' && origPin.charAt(15) === ' ') {
								console.log('YES');
								var tmp1 = origPin.split('.');
								var newPin = tmp1[0].toString();
								var tmp2 = tmp1[1].split(' ');
								newPin += tmp2[1].toString()+tmp2[2].toString();
								$('.tt-input').val(newPin);
								$('.twitterTypeahead').val(newPin);
								searchForRealEstate('pin', [newPin]);
								console.log(newPin);
							} else {
								console.log(origPin);
							}
						});
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
										if (deed.bomDocNum != "0") {
											$scope.plats.push(deed);
										}
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
