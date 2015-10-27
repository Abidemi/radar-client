(function() {
  'use strict';

  var app = angular.module('radar.controllers');

  app.factory('EditController', ['$q', function($q) {
    function EditController($scope) {
      this.scope = $scope;

      this.scope.loading = true;
      this.scope.item = null;
      this.scope.originalItem = null;

      this.scope.save = angular.bind(this, this.save);
      this.scope.saveEnabled = angular.bind(this, this.saveEnabled);
    }

    EditController.$inject = ['$scope'];

    EditController.prototype.load = function(promise) {
      var self = this;

      self.scope.loading = true;

      return $q.when(promise).then(function(item) {
        self.scope.originalItem = item;
        self.scope.item = item.clone();
        self.scope.loading = false;
      });
    };

    EditController.prototype.save = function() {
      var self = this;

      self.scope.saving = true;

      return self.scope.item.save()
        .then(function(item) {
          self.scope.originalItem = item;
          self.scope.item = item.clone();
          return item;
        })
        ['finally'](function() {
          self.scope.saving = false;
        });
    };

    EditController.prototype.saveEnabled = function() {
      return this.scope.item !== null && !this.scope.item.isSaving;
    };

    return EditController;
  }]);
})();