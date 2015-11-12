(function() {
  'use strict';

  var app = angular.module('radar.forms.fields');

  app.directive('frmIntegerField', function() {
    return {
      restrict: 'A',
      scope: {
        required: '&',
        model: '='
      },
      templateUrl: 'app/forms/fields/integer-field.html'
    };
  });
})();
