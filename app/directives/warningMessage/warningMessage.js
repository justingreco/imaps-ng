angular.module('imapsNgApp')
.directive('warningMessage', function () {
	return {
		templateUrl: 'directives/warningMessage/warningMessage.html',
		restrict: 'E',
		controller: function ($scope, $rootScope) {
      $scope.$watch('config', function () {
        if ($scope.config) {
          if ($scope.config.alert.show) {
            $("warning-message .modal").modal('show');
          }
        }
      });
		}
	}
});
