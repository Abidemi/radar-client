import angular from 'angular';

import {
  akiProcessMeasuresPermissionFactory,
  akiProcessMeasuresControllerFactory,
  akiProcessMeasuresComponent
} from './aki-process-measures-component.directive';


import templateUrl from './aki-process-measures.html';

function config($stateProvider, storeProvider) {
  storeProvider.registerMixin('aki-process-measures', 'SourceModelMixin');

  $stateProvider.state('patient.akiProcessMeasures', {
    url: '/aki-process-measures',
    templateUrl: templateUrl
  });
}

config.$inject = ['$stateProvider', 'storeProvider'];

export default angular.module('radar.patients.akiProcessMeasures', [])
  .config(config)
  .factory('AkiProcessMeasuresController', akiProcessMeasuresControllerFactory)
  .factory('AkiProcessMeasuresPermission', akiProcessMeasuresPermissionFactory)
  .directive('akiProcessMeasuresComponent', akiProcessMeasuresComponent)
  .name;
