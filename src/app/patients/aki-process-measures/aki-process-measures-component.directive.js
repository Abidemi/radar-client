(function() {
  'use strict';

  var app = angular.module('radar.patients.akiProcessMeasures');

  app.factory('AkiProcessMeasuresPermission', ['PatientSourceObjectPermission', function(PatientSourceObjectPermission) {
    return PatientSourceObjectPermission;
  }]);

  function controllerFactory(
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

  controllerFactory.$inject = [
    'ModelListDetailController',
    'AkiProcessMeasuresPermission',
    '$injector',
    'store'
  ];

  app.factory('AkiProcessMeasuresController', controllerFactory);

  app.directive('akiProcessMeasuresComponent', ['AkiProcessMeasuresController', function(AkiProcessMeasuresController) {
    return {
      scope: {
        patient: '='
      },
      controller: AkiProcessMeasuresController,
      templateUrl: 'app/patients/aki-process-measures/aki-process-measures-component.html'
    };
  }]);
})();
