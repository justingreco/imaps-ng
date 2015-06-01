angular.module('imapsNgApp')
.directive('bookmarkTool', function () {
	return {
		templateUrl: 'toolPanel/bookmarkTool/bookmarkTool.html',
		restrict: 'E',
		controller: function ($scope) {
			$scope.goToBookmark = function (bookmark) {
				require(['esri/geometry/Extent'], function (Extent) {
					var extent = new Extent(bookmark.extent);
					$scope.map.setExtent(extent, true);
				});
			}
		},
		link: function (scope, element, attrs) {

		}
	}
});
