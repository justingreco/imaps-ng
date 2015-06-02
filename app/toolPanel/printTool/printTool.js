angular.module('imapsNgApp')
.directive('printTool', function (cfpLoadingBar) {
	return {
		templateUrl: 'toolPanel/printTool/printTool.html',
		restrict: 'E',
		controller: function ($scope, $rootScope, $filter) {
			$scope.printTitle = "";
			$scope.printSizes = [
				{value: '8.5x11', label:'8.5"x11"'},
				{value: '11x17', label:'11"x17"'},
				{value: '24x36', label:'24"x36"'},
				{value: '36x48', label:'36"x48"'}
			];
			$scope.printSize = $scope.printSizes[0];
			$scope.printOrients = [
				{value: 'landscape', label:'Landscape'},
				{value: 'portait', label:'Portait'}
			];
			$scope.printOrient = $scope.printOrients[0];

			$scope.printPDF = function (map, layers) {
				$('#printBtn').button('loading');
				cfpLoadingBar.start();
				var layers = "";
				var sublayers = "";
				var opacities = "";
				var layerTypes = "";
				var defExps = "";
				angular.forEach($scope.webmap.itemInfo.itemData.baseMap.baseMapLayers, function (l) {
					var arr = l.url.split("/");
					var id = arr[arr.length - 2];
					console.log(id);
					layers += id +";";
					sublayers += ";";
					opacities += "1;";
					layerTypes += "tiled;";
					defExps += ";";
				});


				var visibleLyrs = $filter('filter')($scope.webmap.itemInfo.itemData.operationalLayers, function (l) {
					return l.visibility === true;
				});
				console.log(visibleLyrs);
				angular.forEach(visibleLyrs, function (l) {
					layers += l.id.split("_")[0] +";";
					opacities += 100 - (l.opacity*100) + ";";
					layerTypes += "dynamic;";
					defExps += ";";
					var visibleSubLyrs = $filter('filter')(l.resourceInfo.layers, function (sl) {
						return sl.defaultVisibility === true;
					});
					for (var i = 0; i < visibleSubLyrs.length; i++) {
						if (i === visibleSubLyrs.length - 1) {
							sublayers += visibleSubLyrs[i].id +";";
						} else {
							sublayers += visibleSubLyrs[i].id +",";
						}
					}
					if (visibleSubLyrs.length === 0) {
						sublayers += ";";
					}
				});

				require(["esri/geometry/scaleUtils", "esri/tasks/Geoprocessor"], function(scaleUtils, Geoprocessor) {
					var gp = new Geoprocessor($scope.config.tools.print.url);
					var params = {
						Title: $scope.printTitle,
						Size: $scope.printSize.value,
						Orientation: $scope.printOrient.value,
						Services: layers,
						Types: layerTypes,
						"Visible_Layers": sublayers,
						"Definition_Expressions": defExps,
						"Transparency_Values": opacities,
						"Extent": $scope.map.extent.xmin +";" + $scope.map.extent.ymin +";" + $scope.map.extent.xmax +";" + $scope.map.extent.ymax +";",
						Scale: scaleUtils.getScale($scope.map)
					};
					console.log(params);
					gp.submitJob(params, function (info) {
						console.log(info);
						gp.getResultData(info.jobId, 'Output_URL', function (data) {
							$('#printBtn').button('reset');
							cfpLoadingBar.complete();
							window.open(data.value);
						})
					});

				});
			};

		},
		link: function (scope, element, attrs) {

		}
	}
});
