angular.module('imapsNgApp')
.directive('printTool', function () {
	return {
		templateUrl: 'toolPanel/printTool/printTool.html',
		restrict: 'E',
		controller: function ($scope) {
			$scope.printSizes = [
				{value: '8.5x11', label:'8.5"x11"'},
				{value: '11x17', label:'11"x17"'},
				{value: '24x36', label:'24"x36"'},
				{value: '36x48', label:'36"x48"'}
			];
			$scope.printSize = $scope.printSizes[0];
		},
		link: function (scope, element, attrs) {

		}
	}
});
