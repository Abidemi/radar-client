(function() {
  'use strict';

  var app = angular.module('radar.akiProcessMeasures');

  app.config(['$stateProvider', function($stateProvider) {
    $stateProvider.state('akiProcessMeasures', {
      url: '/aki-process-measures',
      templateUrl: 'app/aki-process-measures/aki-process-measures.html'
    });
  }]);
})();
