angular.module('imapsNgApp')
.directive('exportButton', function () {
	return {
		templateUrl: 'exportButton/exportButton.html',
		restrict: 'E',
		scope: {
			array: '=',
			filename: '@',
			type: '@'
		},
		link: function (scope, element, attrs) {

		}
	}
});
