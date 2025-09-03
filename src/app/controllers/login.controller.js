angular.module('app').controller('LoginController', function ($location, AuthService) {
	var vm = this;
	vm.usuario = '';
	vm.password = '';
	vm.loading = false;
	vm.error = null;

	vm.submit = function () {
		vm.loading = true;
		vm.error = null;
		AuthService.login({ Usuario: vm.usuario, Senha: vm.password })
			.then(() => $location.path('/home'))
			.catch(err => (vm.error = (err.data && err.data.mensagem) || 'Falha no login'))
			.finally(() => (vm.loading = false));
	};
});
