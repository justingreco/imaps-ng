angular.module('imapsNgApp')
.directive('feedback', function () {
	return {
		templateUrl: 'directives/appHeader/feedback/feedback.html',
		restrict: 'E',
		controller: function ($scope, $rootScope, $http) {
      $scope.feedbackText = "";
      var closeForm = function () {
        $scope.feedbackText = "";
        $scope.feedbackEmail = "";
        $("feedback .modal").modal('hide');
      };
      $scope.sendFeedback = function (email, text) {
        $http({url: 'https://maps.raleighnc.gov/php/mail.php',
        method: 'GET',
        type: 'jsonp',
        params: {
          fromEmail: email,
          toEmail: 'gis@raleighnc.gov',
          subject: 'iMAPS Feedback',
          message: text,
          from: '',
          to: ''
        }}).success(closeForm).error(closeForm);
      };
		}
	}
});
