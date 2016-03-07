(function() {
  'use strict';

  var app = angular.module('radar.akiProcessMeasures');

  app.directive('akiProcessMeasureTable', function() {
    return {
      scope: {
        data: '='
      },
      templateUrl: 'app/aki-process-measures/aki-process-measure-table.html'
    };
  });
})();
