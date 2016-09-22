import _ from 'lodash';

import templateUrl from './aki-process-measure-stats.html';

function akiProcessMeasureStats(adapter, hospitalStore, sortHospitals) {
  return {
    restrict: 'A',
    scope: true,
    templateUrl: templateUrl,
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
        data.loading1 = false;
      });

      scope.$watch('data.hospital', update);

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
            var x = value[0];
            var y = value[1];

            var percent = y === 0 ? 0 : 100 * x / y;
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

akiProcessMeasureStats.$inject = ['adapter', 'hospitalStore', 'sortHospitals'];

export default akiProcessMeasureStats;
