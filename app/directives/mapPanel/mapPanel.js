angular.module('imapsNgApp')
.directive('mapPanel', function (cfpLoadingBar) {
	return {
		templateUrl: 'directives/mapPanel/mapPanel.html',
		restrict: 'E',
		controller: function ($scope, $rootScope, $timeout, property, localStorageService, $filter, mapUtils) {
			$scope.property = property;

			var oldItemInfo = null;
			var mapUpdating = function () {
				cfpLoadingBar.start();
			};
			var mapUpdated = function () {
				cfpLoadingBar.complete();
			};
			var mapUnloaded = function () {
				var storage = (($rootScope.configName ? $rootScope.configName + '_webmap' : 'imaps_webmap'));
				localStorageService.set(storage, stringify($scope.webmap));//JSON.stringify(JSON.decycle($scope.webmap)));
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
				$scope.scale = $scope.map.getScale();
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
					var storage = (($rootScope.configName ? $rootScope.configName + '_webmap' : 'imaps_webmap'));
					if (oldItemInfo) {
						itemInfo = oldItemInfo;
					} else {
						if (localStorageService.get(storage)) {
							itemInfo = localStorageService.get(storage).itemInfo
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
								if (opLyr.layerObject) {
									layer.setVisibleLayers(opLyr.layerObject.visibleLayers);
								}
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
				$scope.bufferGraphics = new GraphicsLayer({id: 'bufferGraphics'});
				$scope.selectionMultiple = new GraphicsLayer({id: 'selectedProperties'});
				$scope.map.graphics.enableMouseEvents();
				$scope.selectionMultiple.on("graphic-node-add", function (evt) {
					$(evt.node).attr('title', evt.graphic.attributes.SITE_ADDRESS+"<br/>" + evt.graphic.attributes.OWNER);
					$(evt.node).attr('data-toggle', 'tooltip');
					$(evt.node).tooltip({
						'container': 'map-panel', 
						html: true,
						placement: 'mouse',
						trigger: 'hover'});

				});

				$scope.map.on('pan', function (e) {
					$('.tooltip').hide();
				});

				$scope.selectionMultiple.on("mouse-move", function (e) {
					$('.tooltip').css('top', (e.clientY + 10) + 'px');
					$('.tooltip').css('left', (e.clientX + 10) + 'px');
				});

				$scope.selectionSingle = new GraphicsLayer({id: 'selectedProperty'});
				$scope.map.addLayer($scope.bufferGraphics);
				$scope.map.addLayer($scope.selectionMultiple);
				$scope.map.addLayer($scope.selectionSingle);

			};

			var webMapLoaded = function (response) {

				require(["esri/layers/GraphicsLayer", "esri/basemaps", "esri/geometry/Extent", "esri/dijit/HomeButton", "esri/SpatialReference", "esri/dijit/LocateButton", "dojo/on"],
				function (GraphicsLayer, esriBasemaps, Extent, HomeButton, SpatialReference, LocateButton, on) {
					if (oldItemInfo) {
						response = compareVisibleLayers(response, oldItemInfo);
					}
					var storage = (($rootScope.configName ? $rootScope.configName + '_webmap' : 'imaps_webmap'));
					if (localStorageService.get(storage)) {
						$scope.webmap = localStorageService.get(storage);
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


					on($scope.map, 'basemap-change', function (e) {
						for (var i = 0;i < e.current.layers.length; i++){
							e.current.layers[i].setMaxScale(0);
						}
					});
					$scope.map.setBasemap($scope.basemap.id);
					$('#loading').remove();
					$('#loadingBackground').remove();
					$scope.scale = $scope.map.getScale();
					$rootScope.$broadcast('mapLoaded');



					var home = new HomeButton({map: $scope.map, extent: new Extent(1948652, 608444, 2249012, 862044, new SpatialReference({wkid: 2264}))}, 'homeButton').startup();
					var locate = new LocateButton({map: $scope.map, scale: 2400, highlightLocation: true}, 'locateButton').startup();

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
					require(["esri/map", "esri/arcgis/utils", "esri/config", "esri/tasks/GeometryService", "dojo/domReady!"], function(Map, arcgisUtils, esriConfig, GeometryService) {
						esriConfig.defaults.io.proxyUrl = "http://maps.raleighnc.gov/parklocator/proxy.ashx";
						esriConfig.defaults.io.alwaysUseProxy = false;
						esriConfig.defaults.geometryService = new GeometryService("https://maps.raleighnc.gov/arcgis/rest/services/Utilities/Geometry/GeometryServer");
						var input = config.map.id;
						
						var itemDeferred = arcgisUtils.getItem(config.map.id);

						itemDeferred.addCallback(function (itemInfo) {
							var input =  itemInfo;
							var storage = (($rootScope.configName ? $rootScope.configName + '_webmap' : 'imaps_webmap'));
							if (localStorageService.get(storage)) {
								if (itemInfo.item.modified === localStorageService.get(storage).itemInfo.item.modified) {
									var webmap = {};
									webmap.item = localStorageService.get(storage).itemInfo.item;
									webmap.itemData = localStorageService.get(storage).itemInfo.itemData;
									input = webmap;
								} else {
									itemInfo.item.extent = localStorageService.get(storage).itemInfo.item.extent;
									itemInfo.itemData.baseMap = localStorageService.get(storage).itemInfo.itemData.baseMap;
									itemInfo = compareOpLayers(itemInfo, localStorageService.get(storage).itemInfo);
									oldItemInfo = localStorageService.get(storage).itemInfo;
									localStorageService.remove(storage);

								}		
							}
							arcgisUtils.createMap(input,"map", {
								geometryServiceURL: "https://maps.raleighnc.gov/arcgis/rest/services/Utilities/Geometry/GeometryServer",
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
						$scope.map.reorderLayer($scope.bufferGraphics, $scope.map.layerIds.length - 3);
						$scope.map.reorderLayer($scope.selectionMultiple, $scope.map.layerIds.length - 2);
						$scope.map.reorderLayer($scope.selectionSingle, $scope.map.layerIds.length - 1);
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
									type:"esriSFS",style:"esriSFSSolid"}, attributes: f.attributes});

									gl.add(g);
						});
						if (gl.graphics.length > 0) {
							if ($rootScope.zoomTo) {
								$scope.map.setExtent(graphicsUtils.graphicsExtent(gl.graphics), true);
							}
						}
					});
				};
				$scope.$on('accountUpdate', function (e, accounts) {
					var pins = [];
					if (accounts.length > 0) {
						angular.forEach(accounts, function (a) {
							//pins.push("'" + a.pin + "'");
							pins.push ("PIN_NUM = '" + a.pin + "'")
						});
						//$scope.property.getGeometryByPins("PIN_NUM in (" + pins.toString() + ")", $scope.config.map.wkid).then(function (data) {
						$scope.property.getGeometryByPins(pins.toString().replace(/,/g, ' OR '), 0, $scope.config.map.wkid).then(function (data) {									
							$scope.property.getGeometryByPins(pins.toString().replace(/,/g, ' OR '), 1, $scope.config.map.wkid).then(function (data2) {
								addGeometriesToMap(data.features.concat(data2.features), $scope.selectionMultiple, [255,255,0]);
							});
							
						});
					}
				});
				$scope.$on('pinUpdate', function (e, pin) {
					$scope.property.getGeometryByPins("PIN_NUM = '" + pin + "'", 0, $scope.config.map.wkid ).then(function (data) {
						$scope.property.getGeometryByPins("PIN_NUM = '" + pin + "'", 1, $scope.config.map.wkid ).then(function (data2) {
							$timeout(function (){ 
								addGeometriesToMap(data.features.concat(data2.features), $scope.selectionSingle, [255,0,0]);
							});
						});
					});
				});
			},
			link: function (scope, element, attrs) {
			}
		}
	});
