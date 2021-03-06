function DeletePatientController($scope, notificationService, $state) {
  $scope.remove = function(patient) {
    patient.remove()
      .then(function() {
        notificationService.success('Patient deleted.');

        // Redirect the patient list
        $state.go('patients');
      })
      .catch(function() {
        notificationService.fail('Failed to delete patient.');
      });
  };
}

DeletePatientController.$inject = ['$scope', 'notificationService', '$state'];

export default DeletePatientController;
