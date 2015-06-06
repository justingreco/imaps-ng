angular.module('imapsNgApp')
.directive('mapPanel', function (cfpLoadingBar) {
	return {
		templateUrl: 'mapPanel/mapPanel.html',
		restrict: 'E',
		controller: function ($scope, $rootScope, property, localStorageService, $filter, mapUtils) {
			$scope.property = property;
			var mapUpdating = function () {
				cfpLoadingBar.start();
			};
			var mapUpdated = function () {
				cfpLoadingBar.complete();
			};
			var mapUnloaded = function () {
				localStorageService.set('imaps_webmap', stringify($scope.webmap));//JSON.stringify(JSON.decycle($scope.webmap)));
			};
			var checkInsideRaleigh = function (bounds, point) {
				require(["esri/geometry/Polygon"], function (Polygon) {
					bounds = new Polygon(bounds);
					var inside = bounds.contains(point);
					if ($scope.inRaleigh != inside) {
						$scope.inRaleigh = bounds.contains(point);
						$rootScope.$broadcast('raleighChecked', inside);
					}
				});
			};
			var extentChanged = function (e) {
				var ll = spToDd(e.extent.xmin, e.extent.ymin);
				var tr = spToDd(e.extent.xmax, e.extent.ymax);
				$scope.webmap.itemInfo.item.extent = [ll.reverse(), tr.reverse()];
				if ($scope.raleighBounds) {
					checkInsideRaleigh($scope.raleighBounds, e.extent.getCenter());
				}
			};
			var setRaleighBounds = function () {
				mapUtils.loadRaleighBounds('data/raleigh.json').then(function (bounds) {
					$scope.raleighBounds = bounds;
					checkInsideRaleigh(bounds, $scope.map.extent.getCenter());
				})
			}
			var buildSearch = function () {
				require(["esri/dijit/Search", "esri/layers/FeatureLayer"], function (Search, FeatureLayer){
					var s = new Search({
										enableButtonMode: true, //this enables the search widget to display as a single button
										enableLabel: false,
										enableInfoWindow: false,
										showInfoWindowOnSelect: false,
										map: $scope.map
								}, "search");

					// var sources = s.get("sources");
					// sources.push({
	        //     featureLayer: new FeatureLayer("http://mapstest.raleighnc.gov/arcgis/rest/services/Planning/Subdivisions/MapServer/0"),
	        //     searchFields: ["NAME"],
	        //     displayField: "NAME",
	        //     exactMatch: false,
	        //     outFields: ["NAME"],
	        //     name: "Subdivisions",
	        //     placeholder: "Subdivision",
	        //     maxResults: 5,
	        //     maxSuggestions: 5,
					//
	        //     //Create an InfoTemplate and include three fields
	        //     // infoTemplate: new InfoTemplate("Congressional District", "District ID: ${DISTRICTID}</br>Name: ${NAME}</br>Party Affiliation: ${PARTY}"),
	        //     enableSuggestions: true,
	        //     minCharacters: 0
	        //  });
					//s.set('sources', sources);
					s.startup();
				});

			};
			var webMapLoaded = function (response) {

				require(["esri/layers/GraphicsLayer", "esri/basemaps", "esri/geometry/Extent", "esri/dijit/HomeButton", "esri/dijit/LocateButton", "dojo/on"],
				function (GraphicsLayer, esriBasemaps, Extent, HomeButton, LocateButton, on) {
					$scope.webmap = response;
					$scope.map = response.map;
					setRaleighBounds();
					$scope.selectionMultiple = new GraphicsLayer();
					$scope.selectionSingle = new GraphicsLayer();
					$scope.map.addLayer($scope.selectionMultiple);
					$scope.map.addLayer($scope.selectionSingle);
					$scope.$digest();
					on($scope.map, 'update-start', mapUpdating);
					on($scope.map, 'update-end', mapUpdated);
					on($scope.map, 'extent-change', extentChanged)
					on($scope.map, 'unload', mapUnloaded);
					var basemaps = $scope.config.map.basemaps.streets.layers.concat($scope.config.map.basemaps.images.layers);
					angular.forEach(basemaps, function (basemap) {
						var baselayers = [{url: basemap.url}];
						if (!basemap.labels) {
							baselayers.push({url: $scope.config.map.labels});
						}
						var base = {
							baseMapLayers: baselayers,
							title: basemap.name
						};
						esriBasemaps[basemap.id] = base;
					});

					var basetitle = $scope.webmap.itemInfo.itemData.baseMap.title;
					var basemaps = $filter('filter')($scope.config.map.basemaps.streets.layers, function (layer) {
						return basetitle === layer.name;
					});
					if (basemaps.length > 0) {
						$scope.basemap = basemaps[0];
						$scope.basemapType = "streets";
					} else {
						basemaps = $filter('filter')($scope.config.map.basemaps.images.layers, function (layer) {
							return basetitle === layer.name;
						});
						if (basemaps.length > 0) {
							$scope.basemap = basemaps[0];
							$scope.basemapType = "images";
						}
					}

					buildSearch();
					$('#loading').remove();
					$('#loadingBackground').remove();

					var home = new HomeButton({map: $scope.map}, 'homeButton').startup();
				//	var locate = new LocateButton({map: $scope.map}, 'locateButton').startup();

				});
			}
			$rootScope.$watch('config', function (config) {
				if (config) {
					$scope.config = config;
					require(["esri/map", "esri/arcgis/utils", "esri/config", "dojo/domReady!"], function(Map, arcgisUtils, esriConfig) {
						esriConfig.defaults.io.proxyUrl = "http://maps.raleighnc.gov/parklocator/proxy.ashx";
						esriConfig.defaults.io.alwaysUseProxy = false;
						var input = config.map.id;
						if (localStorageService.get('imaps_webmap')) {
							var webmap = {};
							webmap.item = localStorageService.get('imaps_webmap').itemInfo.item;
							webmap.itemData = localStorageService.get('imaps_webmap').itemInfo.itemData;
							input = webmap;
						}
						arcgisUtils.createMap(input,"map", {
							geometryServiceURL: "http://maps.raleighnc.gov/arcgis/rest/services/Utilities/Geometry/GeometryServer",
							mapOptions: {fadeOnZoom: true,
								logo: false,
								showAttribution: false,
								sliderPosition: "bottom-left",
								sliderOrientation: "horizontal",
								sliderStyle: "small"}
							}).then(webMapLoaded, function (err) {
								console.log(err);
							});
						});
					}
				});
				var addGeometriesToMap = function (features, gl, color) {
					require(["esri/graphic", "esri/graphicsUtils", "esri/SpatialReference"], function (Graphic, graphicsUtils, SpatialReference) {
						var g = null;
						gl.clear();
						$scope.selectionSingle.clear();
						if (features.length === 1) {
							$scope.geometry = features[0].geometry;
						}
						angular.forEach(features, function (f) {
							f.geometry.spatialReference = {wkid: $scope.config.map.wkid};
							g = new Graphic({geometry: f.geometry,
								symbol:{color:[0,0,0,0],outline:{color:color,
									width:3,type:"esriSLS",style:"esriSLSSolid"},
									type:"esriSFS",style:"esriSFSSolid"}});

									gl.add(g);
								});
								$scope.map.setExtent(graphicsUtils.graphicsExtent(gl.graphics), true);
							});
						}
						$scope.$on('accountUpdate', function (e, accounts) {
							var pins = [];
							if (accounts) {
								angular.forEach(accounts, function (a) {
									pins.push("'" + a.pin + "'");
								});
								$scope.property.getGeometryByPins("PIN_NUM in (" + pins.toString() + ")", $scope.config.map.wkid).then(function (data) {
									addGeometriesToMap(data.features, $scope.selectionMultiple, [255,255,0]);
								});
							}
						});
						$scope.$on('pinUpdate', function (e, pin) {
							$scope.property.getGeometryByPins("PIN_NUM = '" + pin + "'", $scope.config.map.wkid ).then(function (data) {
								addGeometriesToMap(data.features, $scope.selectionSingle, [255,0,0]);
							});
						});
					},
					link: function (scope, element, attrs) {
					}
				}
			});
