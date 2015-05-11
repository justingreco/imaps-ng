angular.module('imapsNgApp')
.directive('exportButton', function () {
	return {
		templateUrl: 'exportButton/exportButton.html',
		restrict: 'E',
		scope: {
			array: '=',
			filename: '@'
		},
		link: function (scope, element, attrs) {

		}
	}
});