import templateUrl from './consents-component.html';

function patientConsentPermissionFactory(PatientSystemObjectPermission) {
  return PatientSystemObjectPermission;
}

patientConsentPermissionFactory.$inject = ['PatientSystemObjectPermission'];

function patientConsentsControllerFactory(
  ModelListDetailController,
  PatientConsentPermission,
  firstPromise,
  getRadarGroup,
  $injector,
  store
) {
  /**
   * Each patient can have multiple consents. A consent is patient permission
   * to use its data.
   *
   * @class
   * @param {Object} $scope - angular scope.
   */
  function PatientConsentsController($scope) {
    var self = this;

    $injector.invoke(ModelListDetailController, self, {
      $scope: $scope,
      params: {
        permission: new PatientConsentPermission($scope.patient)
      }
    });

    self.load(firstPromise([
      store.findMany('patient-consents', {patient: $scope.patient.id}),
      getRadarGroup().then(function(group) {
        $scope.sourceGroup = group;
      })
    ]));

    $scope.create = function() {
      var item = store.create('patient-consents', {
        patient: $scope.patient.id,
        sourceGroup: $scope.sourceGroup
      });

      self.edit(item);
    };
  }

  PatientConsentsController.$inject = ['$scope'];
  PatientConsentsController.prototype = Object.create(ModelListDetailController.prototype);

  return PatientConsentsController;
}

patientConsentsControllerFactory.$inject = [
  'ModelListDetailController',
  'PatientConsentPermission',
  'firstPromise',
  'getRadarGroup',
  '$injector',
  'store'
];

function patientConsentsComponent(PatientConsentsController) {
  return {
    scope: {
      patient: '='
    },
    controller: PatientConsentsController,
    templateUrl: templateUrl
  };
}

patientConsentsComponent.$inject = ['PatientConsentsController'];

export {
  patientConsentPermissionFactory,
  patientConsentsControllerFactory,
  patientConsentsComponent
};
