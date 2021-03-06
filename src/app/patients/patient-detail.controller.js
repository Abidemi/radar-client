/*
 * Controller for a single patient.
 *
 * @class
 * @param {Object} $scope - angular scope.
 * @param {Object} patient - injected patient.
 * @param {Object} session - injected session.
 * @param {function} hasPermissionForPatient - injected function.
 * @param {Object} titleService - injected title service.
 */
function PatientDetailController(
  $scope,
  patient,
  session,
  hasPermissionForPatient,
  titleService
) {
  $scope.patient = patient;
  $scope.viewDemographicsPermission = hasPermissionForPatient(session.user, patient, 'VIEW_DEMOGRAPHICS');

  // Set the title to the patient's ID
  $scope.$watch(function() {
    // No demographics
    return patient.getName(false);
  }, titleService.setTitle);
}

PatientDetailController.$inject = [
  '$scope',
  'patient',
  'session',
  'hasPermissionForPatient',
  'titleService'
];

export default PatientDetailController;
