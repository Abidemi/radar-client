(function() {
  'use strict';

  var app = angular.module('radar.core');

  app.factory('boot', function(authStore, session, store, $q) {
    var promises = [];

    var userId = authStore.getUserId();

    if (userId !== null) {
      var sessionUserDeferred = $q.defer();

      store.findOne('users', userId)
        .then(function(user) {
          session.setUser(user);
        })
        .finally(function() {
          // Always resolve so the application still boots even if our token is no longer valid
          sessionUserDeferred.resolve();
        });

      promises.push(sessionUserDeferred.promise);
    }

    return $q.all(promises);
  });
})();