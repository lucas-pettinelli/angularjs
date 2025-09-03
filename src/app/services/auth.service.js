angular.module('app').factory('AuthService', function ($window, API_URL, $injector) {
	const KEY = 'app.auth';
	const getState = () => JSON.parse($window.localStorage.getItem(KEY) || '{}');
	const setState = s => $window.localStorage.setItem(KEY, JSON.stringify(s));

	function parseJwt(token) {
		try {
			const base64Url = token.split('.')[1];
			const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
			const jsonPayload = decodeURIComponent(
				atob(base64)
					.split('')
					.map(c => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
					.join('')
			);
			return JSON.parse(jsonPayload);
		} catch (e) {
			return {};
		}
	}

	return {
		login(credentials) {
			const $http = $injector.get('$http');
			return $http.post(API_URL + '/autenticacao/login', credentials).then(res => {
				const token = res.data.token || res.data.access_token || res.data.TokenAcesso;
				let role = 'User';
				if (token) {
					const payload = parseJwt(token);
					// Corrige para aceitar string ou array
					if (payload.role) {
						role = payload.role;
					} else if (payload.roles) {
						role = Array.isArray(payload.roles) ? payload.roles[0] : payload.roles;
					}
					setState({ token, role });
				}
				return res.data;
			});
		},
		logout() {
			$window.localStorage.removeItem(KEY);
		},
		isAuthenticated() {
			return !!getState().token;
		},
		isMaster() {
			const state = getState();
			return state.role === 'Admin' || (Array.isArray(state.role) && state.role.includes('Admin'));
		},
		getRole() {
			return getState().role || 'User';
		},
		getToken() {
			return getState().token || null;
		},
	};
});
