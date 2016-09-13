function logoutDirective(authService, $state) {
  return {
      restrict: 'A',
      link: function(scope, element) {
        // Log the user out on click
        element.on('click', function() {
          scope.$apply(function() {
            authService.logout();
            $state.go('login');
          });
        });
      }
    };
}

logoutDirective.$inject = ['authService', '$state'];

export default logoutDirective;