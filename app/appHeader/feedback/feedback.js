angular.module('imapsNgApp')
.directive('feedback', function () {
	return {
		templateUrl: 'appHeader/feedback/feedback.html',
		restrict: 'E',
		controller: function ($scope, $rootScope, $http) {
      $scope.feedbackText = "";
      $scope.sendFeedback = function (email, text) {
        $http({url: 'http://maps.raleighnc.gov/php/mail.php',
        method: 'GET',
        type: 'jsonp',
        params: {
          fromEmail: email,
          toEmail: 'gis@raleighnc.gov',
          subject: 'iMAPS 3.0 Beta Feedback',
          message: text,
          from: '',
          to: ''
        }});
      };

		}
	}
});
