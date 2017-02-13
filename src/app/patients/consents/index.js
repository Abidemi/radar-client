import angular from 'angular';

import {
  patientConsentPermissionFactory,
  patientConsentsControllerFactory,
  patientConsentsComponent
} from './consents-component.directive';

import templateUrl from './consents.html';

function config($stateProvider, storeProvider) {
  //storeProvider.registerMixin('patient-consents', 'SourceModelMixin');

  $stateProvider.state('patient.consents', {
    url: '/consents',
    templateUrl: templateUrl
  });
}

config.$inject = ['$stateProvider', 'storeProvider'];

export default angular.module('radar.patients.consents', [])
  .config(config)
  .factory('PatientConsentPermission', patientConsentPermissionFactory)
  .factory('PatientConsentsController', patientConsentsControllerFactory)
  .directive('patientConsentsComponent', patientConsentsComponent)
  .name;