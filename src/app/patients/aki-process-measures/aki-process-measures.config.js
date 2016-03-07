(function() {
  'use strict';

  var app = angular.module('radar.patients.akiProcessMeasures');

  app.config(['$stateProvider', function($stateProvider) {
    $stateProvider.state('patient.akiProcessMeasures', {
      url: '/aki-process-measures',
      templateUrl: 'app/patients/aki-process-measures/aki-process-measures.html'
    });
  }]);
})();
