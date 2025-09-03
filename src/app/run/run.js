angular.module('app')
  .run(function($rootScope, $location, AuthService) {
    $rootScope.$on('$routeChangeStart', function(event, next) {
      if (next && next.requiresAuth && !AuthService.isAuthenticated()) {
        event.preventDefault();
        $location.path('/login');
      }
    });
  });
