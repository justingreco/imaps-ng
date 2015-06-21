angular.module('imapsNgApp')
.directive('exportButton', function () {
	return {
		templateUrl: 'directives/exportButton/exportButton.html',
		restrict: 'E',
		scope: {
			array: '=',
			headers: '=',
			filename: '@',
			type: '@'
		},
		link: function (scope, element, attrs) {

		}
	}
});
