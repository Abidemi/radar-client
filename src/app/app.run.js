(function() {
  'use strict';

  var app = angular.module('radar');

  function run(
    $rootScope,
    radar,
    getValueAtPath,
    session,
    $state,
    notificationService,
    sessionTimeoutService
  ) {
    $rootScope.$watch(function() {
      return radar.ready;
    }, function(ready) {
      $rootScope.ready = ready;
    });

    sessionTimeoutService.init();

    function isPublicState(state) {
      return getValueAtPath(state, 'data.public');
    }

    // Users that haven't logged in can only view public pages
    $rootScope.$on('$stateChangeStart', function(event, toState) {
      if (!isPublicState(toState)) {
        radar.readyPromise.then(function() {
          if (!session.isAuthenticated) {
            event.preventDefault();
            $state.go('login');
          }
        });
      }
    });

    // Force the user to change their password
    $rootScope.$on('$stateChangeStart', function(event, toState) {
      if (!isPublicState(toState) && toState.name !== 'changePassword') {
        radar.readyPromise.then(function() {
          var user = session.user;

          if (user !== null && user.forcePasswordChange) {
            notificationService.info({
              title: 'Attention',
              message: 'Please update your password.'
            });
            event.preventDefault();
            $state.go('changePassword');
          }
        });
      }
    });
  }

  run.$inject = [
    '$rootScope',
    'radar',
    'getValueAtPath',
    'session',
    '$state',
    'notificationService',
    'sessionTimeoutService'
  ];

  app.run(run);
})();
