(function() {
  'use strict';

  var app = angular.module('radar.forms');

  app.directive('frmDatePicker', function() {
    return {
      require: 'ngModel',
      link: function(scope, element, attrs, ngModelCtrl) {
        var options = {
          changeMonth: true,
          changeYear: true,
          dateFormat: 'dd/mm/yy',
          minDate: getDate(attrs.datePickerMinDate),
          maxDate: getDate(attrs.datePickerMaxDate),
          defaultDate: getDate(attrs.defaultDate),
          yearRange: '1900:+10'
        };

        element.datepicker(options);

        element.on('$destroy', function() {
            element.datepicker('hide');
            element.datepicker('destroy');
        });

        attrs.$observe('datePickerMinDate', function(value) {
          setOption('minDate', getDate(value));
        });

        attrs.$observe('datePickerMaxDate', function(value) {
          setOption('maxDate', getDate(value));
        });

        attrs.$observe('datePickerDefaultDate', function(value) {
          setOption('defaultDate', getDate(value));
        });

        function getDate(value) {
          return value ? new Date(value) : null;
        }

        function setOption(key, value) {
          // Setting some options (e.g. minDate) will cause the input value to change without firing a change event.
          // To work round this we keep track of the value before and after updating the option and then manually
          // update the model controller if the value changed.
          var oldValue = element.val();
          element.datepicker('option', key, value);
          var newValue = element.val();

          if (oldValue !== newValue) {
            ngModelCtrl.$setViewValue(newValue);
          }
        }
      }
    };
  });
})();
