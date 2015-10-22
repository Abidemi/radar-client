(function() {
  'use strict';

  var app = angular.module('radar.forms.fields');

  // TODO validators

  app.directive('frmNumberField', function() {
    return {
      restrict: 'A',
      scope: {
        required: '&',
        model: '=',
        units: '@'
      },
      templateUrl: 'app/forms/fields/number-field.html'
    };
  });
})();