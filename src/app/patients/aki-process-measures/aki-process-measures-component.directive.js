import templateUrl from './aki-process-measures-component.html';

function akiProcessMeasuresPermissionFactory(PatientSourceObjectPermission) {
  return PatientSourceObjectPermission;
}

akiProcessMeasuresPermissionFactory.$inject = ['PatientSourceObjectPermission'];

function akiProcessMeasuresControllerFactory(
  ModelListDetailController,
  AkiProcessMeasuresPermission,
  $injector,
  store
) {
  function AkiProcessMeasuresController($scope) {
    var self = this;

    $injector.invoke(ModelListDetailController, self, {
      $scope: $scope,
      params: {
        permission: new AkiProcessMeasuresPermission($scope.patient)
      }
    });

    self.load(store.findMany('aki-process-measures', {patient: $scope.patient.id}));

    $scope.create = function() {
      var item = store.create('aki-process-measures', {patient: $scope.patient.id});
      self.edit(item);
    };
  }

  AkiProcessMeasuresController.$inject = ['$scope'];
  AkiProcessMeasuresController.prototype = Object.create(ModelListDetailController.prototype);

  return AkiProcessMeasuresController;
}

akiProcessMeasuresControllerFactory.$inject = [
  'ModelListDetailController',
  'AkiProcessMeasuresPermission',
  '$injector',
  'store'
];

function akiProcessMeasuresComponent(AkiProcessMeasuresController) {
  return {
    scope: {
      patient: '='
    },
    controller: AkiProcessMeasuresController,
    templateUrl: templateUrl
  };
}

akiProcessMeasuresComponent.$inject = ['AkiProcessMeasuresController'];

export {
  akiProcessMeasuresPermissionFactory,
  akiProcessMeasuresControllerFactory,
  akiProcessMeasuresComponent
};
