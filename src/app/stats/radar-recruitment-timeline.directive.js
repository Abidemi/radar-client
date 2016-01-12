(function() {
  'use strict';

  var app = angular.module('radar.stats');

  app.directive('radarRecruitmentTimeline', ['adapter', function(adapter) {
    return {
      scope: {},
      template: '<div loading="loading"><div recruitment-graph title="RaDaR" data="data" class="graph"></div></div>',
      link: function(scope) {
        scope.loading = true;

        adapter.get('/recruitment-timeline').then(function(response) {
          scope.loading = false;
          scope.data = response.data.points;
        });
      }
    };
  }]);
})();