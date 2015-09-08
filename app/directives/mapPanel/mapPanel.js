angular.module('imapsNgApp')
.directive('mapPanel', function (cfpLoadingBar) {
	return {
		templateUrl: 'directives/mapPanel/mapPanel.html',
		restrict: 'E',
		controller: function ($scope, $rootScope, property, localStorageService, $filter, mapUtils) {
			$scope.property = property;
			var oldItemInfo = null;
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


			var setLayerVisibleLayers = function () {
				angular.forEach($scope.map.layerIds, function (id) {
					var itemInfo = null;
					if (oldItemInfo) {
						itemInfo = oldItemInfo;
					} else {
						if (localStorageService.get('imaps_webmap')) {
							itemInfo = localStorageService.get('imaps_webmap').itemInfo
						}
					}
					if (itemInfo) {
						var layer = $scope.map.getLayer(id);
						if (layer.visibleLayers) {
							var opLyr = $filter('filter')(itemInfo.itemData.operationalLayers, function (l) {
								return layer.id  === l.id;
							});
							if (opLyr.length > 0) {
								opLyr = opLyr[0];
								layer.setVisibleLayers(opLyr.layerObject.visibleLayers);
							}
						}
					}
				});
			};

			var compareVisibleLayers = function (response, oldItemInfo) {
				angular.forEach(response.itemInfo.itemData.operationalLayers, function (layer) {
					var opLyr = $filter('filter')(oldItemInfo.itemData.operationalLayers, function (l) {
						return layer.id === l.id;
					});
					if (opLyr.length > 0) {
						opLyr = opLyr[0];
						angular.forEach(layer.resourceInfo.layers, function (r) {
							if (opLyr.layerObject.visibleLayers.indexOf(r.id) > -1) {
								r.defaultVisibility = true;
							} else {
								r.defaultVisibility = false;
							}
						});
					}
				});
				return response;
			}

			var addGraphicsLayers = function (GraphicsLayer) {
				$scope.selectionMultiple = new GraphicsLayer();
				$scope.selectionSingle = new GraphicsLayer();
				$scope.bufferGraphics = new GraphicsLayer();
				$scope.map.addLayer($scope.selectionMultiple);
				$scope.map.addLayer($scope.selectionSingle);
				$scope.map.addLayersu($scope.bufferGraphics);
			};

			var webMapLoaded = function (response) {

				require(["esri/layers/GraphicsLayer", "esri/basemaps", "esri/geometry/Extent", "esri/dijit/HomeButton", "esri/dijit/LocateButton", "dojo/on"],
				function (GraphicsLayer, esriBasemaps, Extent, HomeButton, LocateButton, on) {
					if (oldItemInfo) {
						response = compareVisibleLayers(response, oldItemInfo);
					}					
					if (localStorageService.get('imaps_webmap')) {
						$scope.webmap = localStorageService.get('imaps_webmap');
						$scope.webmap.clickEventHandle = response.clickEventHandle;
						$scope.webmap.clickEventListener = response.clickEventListener;
					} else {
						$scope.webmap = response;
					}
					$scope.map = response.map;
					setRaleighBounds();
					addGraphicsLayers(GraphicsLayer);
					$scope.$digest();
					on($scope.map, 'update-start', mapUpdating);
					on($scope.map, 'update-end', mapUpdated);
					on($scope.map, 'extent-change', extentChanged)
					on($scope.map, 'unload', mapUnloaded);

					setLayerVisibleLayers();
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

					$('#loading').remove();
					$('#loadingBackground').remove();

					$rootScope.$broadcast('mapLoaded');



					var home = new HomeButton({map: $scope.map}, 'homeButton').startup();
				//	var locate = new LocateButton({map: $scope.map}, 'locateButton').startup();

				});
			}

			var compareOpLayers = function (itemInfo, storedInfo) {
				var storedLayer = null;
				angular.forEach(itemInfo.itemData.operationalLayers, function (l) {
					storedLayer = $filter('filter')(storedInfo.itemData.operationalLayers, function (sl) {
						return l.id === sl.id;
					});
					if (storedLayer.length > 0) {
						storedLayer  = storedLayer[0];
						l.opacity = storedLayer.opacity;
						l.visibility = storedLayer.visibility;
					}					
				});
			};

			$rootScope.$watch('config', function (config) {
				if (config) {
					$scope.config = config;
					require(["esri/map", "esri/arcgis/utils", "esri/config", "dojo/domReady!"], function(Map, arcgisUtils, esriConfig) {
						esriConfig.defaults.io.proxyUrl = "http://maps.raleighnc.gov/parklocator/proxy.ashx";
						esriConfig.defaults.io.alwaysUseProxy = false;
						var input = config.map.id;
						
						var itemDeferred = arcgisUtils.getItem(config.map.id);

						itemDeferred.addCallback(function (itemInfo) {
							var input =  itemInfo;
							if (localStorageService.get('imaps_webmap')) {
								if (itemInfo.item.modified === localStorageService.get('imaps_webmap').itemInfo.item.modified) {
									var webmap = {};
									webmap.item = localStorageService.get('imaps_webmap').itemInfo.item;
									webmap.itemData = localStorageService.get('imaps_webmap').itemInfo.itemData;
									input = webmap;
								} else {
									itemInfo.item.extent = localStorageService.get('imaps_webmap').itemInfo.item.extent;
									itemInfo.itemData.baseMap = localStorageService.get('imaps_webmap').itemInfo.itemData.baseMap;
									itemInfo = compareOpLayers(itemInfo, localStorageService.get('imaps_webmap').itemInfo);
									oldItemInfo = localStorageService.get('imaps_webmap').itemInfo;
									localStorageService.remove('imaps_webmap');

								}		
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
								if (gl.graphics.length > 0) {
									$scope.map.setExtent(graphicsUtils.graphicsExtent(gl.graphics), true);
								}
							});
						}
						$scope.$on('accountUpdate', function (e, accounts) {
							var pins = [];
							if (accounts.length > 0) {
								angular.forEach(accounts, function (a) {
									//pins.push("'" + a.pin + "'");
									pins.push ("PIN_NUM = '" + a.pin + "'")
								});
								//$scope.property.getGeometryByPins("PIN_NUM in (" + pins.toString() + ")", $scope.config.map.wkid).then(function (data) {
								$scope.property.getGeometryByPins(pins.toString().replace(/,/g, ' OR '), $scope.config.map.wkid).then(function (data) {									
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
