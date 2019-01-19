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
          
          if (getNth() === '1st thursday' && new Date().getHours() >= 20 && new Date().getHours() < 22) {
            $scope.config.alert.message = 'Due to scheduled database maintenance, iMAPS may be unavailable between 8:00 PM and 10:00 PM tonight.';         
            $("warning-message .modal").modal('show');  
          }
        }
      });
      function getNth(dat) {
        var days = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday','saturday'],
            nth  = ['st', 'nd', 'rd', 'th', 'th'],
            d    = dat ? dat instanceof Date ? dat : new Date(dat) : new Date(),
            date = d.getDate(),
            day  = d.getDay(),
            n    = Math.ceil(date / 7);
        
        return n + nth[n-1] + ' ' + days[day];
      }
		}
	}
});
