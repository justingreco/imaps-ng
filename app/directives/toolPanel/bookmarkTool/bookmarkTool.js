angular.module('imapsNgApp')
.directive('bookmarkTool', function () {
	return {
		templateUrl: 'directives/toolPanel/bookmarkTool/bookmarkTool.html',
		restrict: 'E',
		controller: function ($scope, localStorageService) {
			$scope.bookmarkName = "";
			var storeBookmarks = function () {
				if ($scope.config) {
					localStorageService.set('bookmarks', $scope.config.tools.bookmarks);
				}
			};

			if (localStorageService.get('bookmarks')) {
				if ($scope.config) {
					$scope.config.tools.bookmarks = localStorageService.get('bookmarks');
				}
			} else {
				storeBookmarks();
			}

			$scope.bookmarkDisabled = function () {
				return $scope.bookmarkName.length < 1;
			};

			$scope.goToBookmark = function (bookmark) {
				require(['esri/geometry/Extent'], function (Extent) {
					var extent = new Extent(bookmark.extent);
					$scope.map.setExtent(extent, true);
				});
			};

			$scope.addBookmark = function (name) {
				var bm = {"name": name,
					"extent":{"xmin": $scope.map.extent.xmin,
					"ymin": $scope.map.extent.ymin,
					"xmax": $scope.map.extent.xmax,
					"ymax": $scope.map.extent.ymax,
					"spatialReference":{"wkid": $scope.map.spatialReference.wkid}}
				};
				$scope.config.tools.bookmarks.push(bm);
				$scope.bookmarkName = '';
				storeBookmarks();
			};

			$scope.deleteBookmark = function (index) {
				$scope.config.tools.bookmarks.splice(index, 1);
				storeBookmarks();
			};

		},
		link: function (scope, element, attrs) {

		}
	}
});
