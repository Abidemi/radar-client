(function() {
  'use strict';

  var app = angular.module('radar.akiProcessMeasures');

  app.directive('akiProcessMeasureGraph', ['Highcharts', '_', function(Highcharts, _) {
    var PROCESS_MEASURES = [
      ['dipstickUrinalysis', 'Urine tested within 24 hours?'],
      ['medicationReview', 'Medications reviewed?'],
      ['uss', 'Ultrasound scan within 24 hours?'],
      ['seniorReview', 'Senior review within 12 hours?'],
      ['selfManagement', 'Self-management information provided?'],
      ['physiologicalMonitoring', 'Physiological monitoring plan decided?'],
      ['ueAdmission', 'U&Es performed at admission?'],
      ['ueRepeated', 'U&Es repeated within 24 hours?'],
      ['cqs', 'Composite Quality Score (CQS)'],
      ['acs', 'Appropriate Care Score (ACS)'],
    ];

    var PROCESS_MEASURE_KEYS = _.map(PROCESS_MEASURES, function(x) {
      return x[0];
    });

    var PROCESS_MEASURE_NAMES = _.map(PROCESS_MEASURES, function(x) {
      return x[1];
    });

    return {
      scope: {
        title: '=',
        data: '='
      },
      link: function(scope, element) {
        scope.$watch('data', load);

        function load() {
          var data = scope.data;

          if (!data) {
            return;
          }

          var graphData = [];

          _.forEach(PROCESS_MEASURE_KEYS, function(key) {
            graphData.push(data[key][2]);
          });

          var options = {
            chart: {
              type: 'bar',
              renderTo: element.get(0)
            },
            title: {
              text: 'AKI Process Measures'
            },
            xAxis: {
              categories: PROCESS_MEASURE_NAMES,
              title: {
                text: null
              }
            },
            yAxis: {
              min: 0,
              max: 100,
              title: {
                text: null,
              },
              labels: {
                format: '{value}%'
              }
            },
            tooltip: {
              pointFormat: '{series.name}: <b>{point.y:.2f}%</b>'
            },
            series: [
              {
                name: scope.title,
                data: graphData
              }
            ]
          };

          new Highcharts.Chart(options);
        }
      }
    };
  }]);
})();
