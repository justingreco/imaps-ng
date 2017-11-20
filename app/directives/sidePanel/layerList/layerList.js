angular.module('imapsNgApp')
  .directive('layerList', function ($timeout, $window, $filter, legend, localStorageService, $sce, $rootScope) {
    return {
      templateUrl: 'directives/sidePanel/layerList/layerList.html',
      restrict: 'EA',
      controller: function ($scope) {
        $scope.layerFilterValue = '';
        $scope.$parent.$broadcast('refreshSlider');
        var getLegend = function (l) {
          legend.getLegend(l.url, l.id).then(function (legend) {
            var lyr = $filter('filter')($scope.layers, function (i) {
              return i.id === legend.id;
            })[0];
            angular.forEach(lyr.layerObject.layerInfos, function (subl, j) {
              if (legend.layers[j]) {
                subl.legend = legend.layers[j].legend;
              }
            });
          });
        };
        $scope.featurelayers = [];
        $scope.mapimagelayers = [];
        $scope.grouplayers = [];
        $scope.$watch('webmap', function (webmap) {
          require(["esri/symbols/Symbol", "esri/symbols/SimpleFillSymbol", "esri/symbols/PictureFillSymbol", "esri/symbols/SimpleLineSymbol", "esri/symbols/SimpleMarkerSymbol", "esri/symbols/PictureMarkerSymbol", "esri/symbols/jsonUtils", "dojox/gfx", "dojo/dom"], function (Symbol, SimpleFillSymbol, PictureFillSymbol, SimpleLineSymbol, SimpleMarkerSymbol, PictureFillSymbol, jsonUtils, gfx, dom) {
            if (webmap) {
              var nameArr = [],
                serviceName = null,
                service = null,
                lyr = null;
              $scope.layers = webmap.itemInfo.itemData.operationalLayers;
              var symbols = null;
              angular.forEach($scope.layers, function (l) {

                if (l.layerType === 'ArcGISMapServiceLayer') {
                  lyr = $scope.map.getLayer(l.id);
                  if (lyr.visible) {
                    getLegend(l);
                  }
                  $scope.mapimagelayers.push(lyr);
                } else if (l.layerType === 'ArcGISFeatureLayer') {
                  lyr = $scope.map.getLayer(l.id);
                  lyr.symbols = buildLegend(lyr.renderer, lyr.name, SimpleFillSymbol, PictureFillSymbol, SimpleLineSymbol, SimpleMarkerSymbol, PictureFillSymbol, jsonUtils, gfx, dom);
                  lyr.expanded = lyr.visible;
                  nameArr = l.id.split('_');
                  nameArr.pop();
                  serviceName = nameArr.join(' ');
                  if ($scope.grouplayers.indexOf(serviceName) === -1) {
                    $scope.grouplayers.push(serviceName);
                    $scope.featurelayers.push({
                      title: serviceName,
                      visibility: lyr.visible,
                      opacity: lyr.opacity,
                      sublayers: [lyr]
                    });
                  } else {
                    service = $filter('filter')($scope.featurelayers, function (i) {
                      return i.title === serviceName;
                    });
                    if (service.length > 0) {
                      service[0].sublayers.splice(lyr.id, 0, lyr);
                      if (lyr.visible) {
                        service[0].visibility = true;
                      }
                    }
                  }

                } else if (l.layerType === 'ArcGISTiledMapServiceLayer') {

                }
              });
            }
          });
        });
        buildLegend = function (renderer, title, SimpleFillSymbol, PictureFillSymbol, SimpleLineSymbol, SimpleMarkerSymbol, PictureFillSymbol, jsonUtils, gfx, dom) {
          var symbols = [];
          var symbol = null;
          if (!renderer.infos) {
            symbol = checkSymbol(renderer.symbol, SimpleFillSymbol, PictureFillSymbol, SimpleLineSymbol, SimpleMarkerSymbol, PictureFillSymbol, jsonUtils, gfx, dom);
            if (symbol) {
              if (!symbol.url) {
                symbols.push({
                  label: renderer.label,
                  svg: $sce.trustAsHtml(symbol.toString())
                });

              } else {
                symbols.push({
                  label: renderer.value,
                  image: symbol
                });
              }

            }


          } else {
            angular.forEach(renderer.infos, function (uvi) {
              symbol = checkSymbol(uvi.symbol, SimpleFillSymbol, PictureFillSymbol, SimpleLineSymbol, SimpleMarkerSymbol, PictureFillSymbol, jsonUtils, gfx, dom);
              if (!symbol) {
                debugger;
              }
              if (!symbol.url) {
                symbols.push({
                  label: uvi.value,
                  svg: $sce.trustAsHtml(symbol.toString())
                });

              } else {
                symbols.push({
                  label: uvi.value,
                  image: symbol
                });
              }
            });
          }
          return symbols;
        }

        checkSymbol = function (symbol, SimpleFillSymbol, PictureFillSymbol, SimpleLineSymbol, SimpleMarkerSymbol, PictureFillSymbol, jsonUtils, gfx, dom) {
          var returnSymbol = null;
          var outline = null;
          if (symbol.type === 'esriSFS' || symbol.type === 'simplefillsymbol') {
            symbol.color = new dojo.Color(symbol.color);
            if (symbol.style === "esriSFSSolid") {
              symbol.style = 'solid';
            }

            if (symbol.outline) {
              symbol.outline.color = new dojo.Color(symbol.outline.color);
              outline = new SimpleLineSymbol(symbol.outline.style, new dojo.Color(symbol.outline.color), symbol.outline.width)
            }
            returnSymbol = setLegendSvg(new SimpleFillSymbol(symbol.style, outline, new dojo.Color(symbol.color)), jsonUtils, gfx, dom);
          } else if (symbol.type === 'esriPFS' || symbol.type === 'picturefillsymbol') {
            symbol.color = new dojo.Color(symbol.color);
            if (symbol.outline) {
              symbol.outline.color = new dojo.Color(symbol.outline.color);
              outline = new SimpleLineSymbol(symbol.outline.style, new dojo.Color(symbol.outline.color), symbol.outline.width);
            }
            var pfs = new PictureFillSymbol({outline: outline});
            pfs.setUrl(symbol.url);
            pfs.setWidth(symbol.width);
            pfs.setHeight(symbol.height);
            pfs.setColor(new dojo.Color(symbol.color));
            returnSymbol = setLegendSvg(pfs, jsonUtils, gfx, dom) ;     
          } 
          else if (symbol.type === 'esriSLS' || symbol.type === 'simplelinesymbol') {
            returnSymbol = setLegendSvg(new SimpleLineSymbol(symbol.style, symbol.color, symbol.width), jsonUtils, gfx, dom);
          } else if (symbol.type === 'esriSMS' || symbol.type === 'simplemarkersymbol') {

            if (symbol.style === 'esriSMSCircle') {
              symbol.style = 'circle';
            }
            if (symbol.outline) {
              symbol.outline.color = new dojo.Color(symbol.outline.color);
              outline = new SimpleLineSymbol(symbol.outline.style, symbol.outline.color, symbol.outline.width)
            }
            symbol.color = new dojo.Color(symbol.color);

            returnSymbol = setLegendSvg(new SimpleMarkerSymbol(symbol.style, symbol.size, outline, symbol.color), jsonUtils, gfx, dom);
          } else if (symbol.type === 'esriPMS' || symbol.type === 'picturemarkersymbol') {
            returnSymbol = {
              url: symbol.url,
              width: symbol.width,
              height: symbol.height
            };
          }
          return returnSymbol;
        }
        setLegendSvg = function (symbol, jsonUtils, gfx, dom) {
          console.log(symbol)
          var mySurface = gfx.createSurface(dom.byId("surface"), 30, 30);
          var descriptors = jsonUtils.getShapeDescriptors(symbol);
          if (symbol.url) {
            descriptors.defaultShape  = {
              type: "path",
              path: "M -10,-10 L 10,0 L 10,10 L -10,10 L -10,-10 Z"
            };
            descriptors.fill = {
              type: "pattern",
              width: symbol.width,
              height: symbol.height,
              src: symbol.url
            }
          }
          console.log(descriptors);
          if (!descriptors.stroke) {
            descriptors.stroke = symbol.outline;
          }
          var shape = mySurface.createShape(descriptors.defaultShape)
            .setFill(descriptors.fill)
            .setStroke(descriptors.stroke);
          if (symbol.url) {
          }
          shape.applyTransform({
            dx: 15,
            dy: 15
          });
          return shape.parent.rawNode.outerHTML;

        }




        $scope.filterLayers = function (layer) {
          var retVal = false;
          if ($scope.layerFilterValue.length === 0) {
            retVal = true;
          } else {
            retVal = layer.arcgisProps.title.toLowerCase().indexOf($scope.layerFilterValue.toLowerCase()) > -1;
            if (!retVal && layer.layerInfos) {
              for (var i = 0; i < layer.layerInfos.length; i++) {
                if (layer.layerInfos[i].name.toLowerCase().indexOf($scope.layerFilterValue.toLowerCase()) > -1) {
                  retVal = true;
                }
              }
            }
          }

          return retVal;
        };
        $scope.filterFeatureLayers = function (layer) {
          var retVal = false;
          if ($scope.layerFilterValue.length === 0) {
            retVal = true;
          } else {
            retVal = layer.title.toLowerCase().indexOf($scope.layerFilterValue.toLowerCase()) > -1;
            if (!retVal && layer.sublayers) {
              for (var i = 0; i < layer.sublayers.length; i++) {
                if (layer.sublayers[i].name.toLowerCase().indexOf($scope.layerFilterValue.toLowerCase()) > -1) {
                  retVal = true;
                }
              }
            }
          }

          return retVal;
        };
        $scope.filterFeatureSubLayers = function (sublayer, e) {
          var retVal = false;
          if ($scope.layerFilterValue.length === 0) {
            retVal = true;
          } else {
            retVal = sublayer.name.toLowerCase().indexOf($scope.layerFilterValue.toLowerCase()) > -1;
          }
          return retVal;
        };        
        $scope.clearLayers = function (layers) {
          for (var i = 0; i < layers.length; i++) {
            if (layers[i].title != 'Parcels' && layers[i].title.indexOf('[hidden]') === -1) {
              $scope.map.getLayer(layers[i].id).setVisibility(false);
              layers[i].visibility = false;
            }
          }
          for (var i = 0; i < $scope.featurelayers.length; i++) {
            $scope.featurelayers[i].visibility = false;
          }
        };

        $scope.layerToggle = function (layer, webmap) {
          layer.visibility = !layer.visibility;
          $scope.map.getLayer(layer.id).setVisibility(layer.visibility);
          if (layer.visibility && !layer.layerInfos[0].legend) {
            getLegend(layer);
          }


        };
        $scope.subLayerToggle = function (layer, sublayer, webmap) {
          var visible = [];
          //sublayer.defaultVisibility = !sublayer.defaultVisibility;
          visible = $scope.map.getLayer(layer.id).visibleLayers;

          if (layer.visibleLayers.indexOf(sublayer.id) === -1) {
            visible.push(sublayer.id);
          } else {
            visible.splice(visible.indexOf(sublayer.id), 1);
          }
          if (visible.length === 0) {
            visible = [-1];
          }

          layer.visibleLayers = visible;
          layer._defaultVisibleLayers = visible;

          $scope.webmap.itemInfo.itemData.operationalLayers = $scope.layers;
          $scope.map.getLayer(layer.id).setVisibleLayers(visible);
        };

        $scope.opacityChanged = function (layer, webmap) {
          $scope.map.getLayer(layer.id).setOpacity(layer.opacity);

        };

        $scope.translate = function (value) {
          return (value * 100).toFixed(0) + '%';
        };
        $scope.zoomToLayer = function (layer) {
          if ($scope.map.getScale() > layer.resourceInfo.minScale) {
            $scope.map.setScale(layer.resourceInfo.minScale);
          }
        };
        $scope.zoomToSubLayer = function (minScale) {
          if ($scope.map.getScale() > minScale) {
            $scope.map.setScale(minScale);
          }
        };
        $scope.featLayerToggle = function (layer, webmap) {
          layer.visibility = !layer.visibility;
          var sublayer = null;
          angular.forEach(layer.sublayers, function (sl) {
            sublayer = $scope.map.getLayer(sl.id);
            if (layer.visibility) {
              if ($rootScope.config.map.displayAllServiceNames.indexOf(layer.title) > -1) {
                sublayer.setVisibility(layer.visibility);
              } else {
                sublayer.setVisibility(sl.visibility);
              }
            } else {
              sublayer.setVisibility(false);
            }
          //  sl.expanded = sublayer.visibility;
          });
        };
        $scope.featLayerSubLayerToggle = function (layer, sublayer, webmap) {
          var sl = $scope.map.getLayer(sublayer.id);
          sublayer.visibility = !sublayer.visibility;
          sl.setVisibility(sublayer.visibility);
         // sublayer.expanded = sl.visibility;
          
		};

        $scope.featLayerOpacityChanged = function (sl, webmap) {
		  var sublayer = $scope.map.getLayer(sl.id);
		  sublayer.setOpacity(sl.opacity);
		  sublayer.getNode().style.opacity = sl.opacity;
        };
      },
      link: function (scope, element, attrs) {

      }
    }
  }).factory('legend', ['$http', '$q', function ($http, $q) {
    var service = {
      getLegend: getLegend
    }
    return service;

    function getLegend(url, id) {

      var deferred = $q.defer();

      $http({
        method: 'GET',
        url: url + '/legend',
        params: {
          f: 'json'
        }
      }).success(function (data) {
        data.id = id;
        deferred.resolve(data);
      });
      return deferred.promise;
    }
  }]);
