angular.module('imapsNgApp')
.directive('poiSearch', function () {
  return {
    templateUrl: 'directives/sidePanel/locationSearch/poiSearch/poiSearch.html',
    restrict: 'EA',
    controller: function ($scope, locationFactory) {
      $scope.places = [];
      $scope.placeTypes = [];
      locationFactory.getPlaceTypes().then(function (response) {
        $scope.placeTypes = [];
        angular.forEach(response.features, function (f) {
          $scope.placeTypes.push(f.attributes.ICON);
        })
      });
      $scope.placeTypeSelected = function (type) {
        locationFactory.getPlacesByType(type).then(function (response) {
          $scope.places = response.features;			
        });
      };
      $scope.placeSelected = function (place) {
        
        require([
          "esri/geometry/Point", "esri/layers/GraphicsLayer", "esri/graphic", "esri/symbols/PictureMarkerSymbol"
        ], function(Point, GraphicsLayer, Graphic, PictureMarkerSymbol) {
          var gl = $scope.map.getLayer('locationGraphics');
          var g = null;
          if (!gl) {
            gl = new GraphicsLayer({id: 'locationGraphics'});
            $scope.map.addLayer(gl);
          }
          gl.clear();
          var symbol =  new PictureMarkerSymbol({
            "url":"images/esriGreenPin16x26.png",
            "height":26,
            "width":16,
            "type":"esriPMS"
          });							  
          gl.add(new Graphic(new Point({"x": place.geometry.x, "y": place.geometry.y, "spatialReference": {"wkid": $scope.map.spatialReference.latestWkid } }), symbol));
          
          $scope.map.centerAndZoom(place.geometry, 11);
        });									
      }
    },
    link: function (scope, element, attrs) {
      // scope.searches = [{label: 'For Property', value: 'property'}, {label: 'For Location', value: 'location'}];
      // scope.selectedSearch = scope.searches[0];
    }
  }
});
