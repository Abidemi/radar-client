(function() {
  'use strict';

  var app = angular.module('radar.patients.familyHistory');

  app.config(['$stateProvider', function($stateProvider) {
    $stateProvider.state('patient.familyHistory', {
      url: '/family-history/:cohortId',
      templateUrl: 'app/patients/family-history/family-history.html',
      controller: ['$scope', 'cohort', function($scope, cohort) {
        $scope.cohort = cohort;
      }],
      resolve: {
        cohort: ['$stateParams', 'store', function($stateParams, store) {
          return store.findOne('cohorts', $stateParams.cohortId, true);
        }]
      }
    });
  }]);
})();
