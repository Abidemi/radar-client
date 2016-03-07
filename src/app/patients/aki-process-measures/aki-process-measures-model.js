(function() {
  'use strict';

  var app = angular.module('radar.patients.akiProcessMeasures');

  app.config(['storeProvider', function(storeProvider) {
    storeProvider.registerMixin('aki-process-measures', 'SourceModelMixin');
  }]);
})();
