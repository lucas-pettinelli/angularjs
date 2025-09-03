angular.module('app').factory('AuthInterceptor', function ($q, $location, AuthService) {
	return {
		request: function (config) {
			const token = AuthService.getToken();
			if (token) config.headers.Authorization = 'Bearer ' + token;
			return config;
		},
		responseError: function (rejection) {
			if (rejection.status === 401) {
				AuthService.logout();
				$location.path('/login');
			}
			return $q.reject(rejection);
		},
	};
});
