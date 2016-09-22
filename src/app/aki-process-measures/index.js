import angular from 'angular';

import akiProcessMeasureGraph from './aki-process-measure-graph.directive';
import akiProcessMeasureStats from './aki-process-measure-stats.directive';
import akiProcessMeasureTable from './aki-process-measure-table.directive';

import templateUrl from './aki-process-measures.html';

function config($stateProvider) {
  $stateProvider.state('akiProcessMeasures', {
    url: '/aki-process-measures',
    templateUrl: templateUrl
  });
}

config.$inject = ['$stateProvider'];

export default angular.module('radar.akiProcessMeasures', [])
  .config(config)
  .directive('akiProcessMeasureGraph', akiProcessMeasureGraph)
  .directive('akiProcessMeasureStats', akiProcessMeasureStats)
  .directive('akiProcessMeasureTable', akiProcessMeasureTable)
  .name;
