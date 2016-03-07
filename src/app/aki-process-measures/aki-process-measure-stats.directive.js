(function() {
  'use strict';

  var app = angular.module('radar.akiProcessMeasures');

  function directive(
    adapter, _, hospitalStore, sortHospitals
  ) {
    return {
      restrict: 'A',
      scope: {},
      templateUrl: 'app/aki-process-measures/aki-process-measure-stats.html',
      link: function(scope) {
        var data = {
          loading1: true,
          loading2: false,
          hospital: null,
          hospitals: []
        };

        scope.data = data;

        hospitalStore.findMany().then(function(hospitals) {
          hospitals = sortHospitals(hospitals);

          data.hospitals = hospitals;

          if (hospitals.length > 0) {
            data.hospital = hospitals[0];
          }

          data.loading1 = false;

          scope.$watch('data.hospital', update);
        });

        function update(hospital) {
          data.loading2 = true;

          var params = {};
          var title;

          if (hospital) {
            params.group = hospital;
            title = hospital.shortName;
          } else {
            title = 'All';
          }

          adapter.get('/aki-process-measure-stats', params).then(function(response) {
            var stats = response.data;

            // Calculate percentages
            _.forEach(stats, function(value, key) {
              var percent = 100 * value[0] / value[1];
              value.push(percent);
            });

            data.title = title;
            data.data = stats;
            data.loading2 = false;
          });
        }
      }
    };
  }

  directive.$inject = ['adapter', '_', 'hospitalStore', 'sortHospitals'];

  app.directive('akiProcessMeasureStats', directive);
})();
