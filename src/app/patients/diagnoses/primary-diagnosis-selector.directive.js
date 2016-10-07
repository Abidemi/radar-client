import _ from 'lodash';
import templateUrl from './primary-diagnosis-selector.html';

function primaryDiagnosisSelector(store) {
  return {
    require: 'ngModel',
    templateUrl: templateUrl,
    scope: {
      cohort: '='
    },
    link: function(scope, element, attrs, ngModel) {
      scope.diagnosis = null;
      scope.loading = true;

      store.findMany('diagnoses', {primaryGroup: scope.cohort.id}).then(function(diagnoses) {
        scope.diagnoses = _.map(diagnoses, function(x) {
          return {
            diagnosis: x,
            edtaCode: x.getEdtaCode(),
            weight: x.getWeight(scope.cohort.id)
          };
        });

        // Finished loading
        scope.loading = false;
      });

      ngModel.$render = function() {
        scope.diagnosis = ngModel.$viewValue;
      };

      scope.use = function(diagnosis) {
        update(diagnosis);
      };

      scope.drop = function() {
        update(null);
      };

      function update(diagnosis) {
        scope.diagnosis = diagnosis;
        ngModel.$setViewValue(diagnosis);
      }
    }
  };
}

primaryDiagnosisSelector.$inject = ['store'];

export default primaryDiagnosisSelector;
