(function() {
  'use strict';

  var app = angular.module('radar.akiProcessMeasures');

  function directive(
    adapter, _
  ) {
    return {
      restrict: 'A',
      scope: {},
      templateUrl: 'app/aki-process-measures/aki-process-measure-stats.html',
      link: function(scope) {
        scope.loading = true;

        adapter.get('/aki-process-measure-stats').then(function(response) {
          var data = response.data;

          // Calculate percentages
          _.forEach(data, function(value, key) {
            value.push(100 * value[0] / value[1]);
          });

          scope.data = data;
        });
      }
    };
  }

  directive.$inject = ['adapter', '_'];

  app.directive('akiProcessMeasureStats', directive);
})();
