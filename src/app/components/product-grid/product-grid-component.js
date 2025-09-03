angular.module('app').component('productGrid', {
	templateUrl: './components/product-grid/product-grid.template.html',
	controller: function (ProductService, AuthService) {
		var vm = this;
		vm.items = [];
		vm.loading = false;
		vm.error = null;
		vm.isMaster = AuthService.isMaster;

		// Use nomes minúsculos para compatibilidade com backend
		vm.form = { id: null, nome: '', valor: 0 };
		vm.mode = 'list';

		vm.load = function () {
			vm.loading = true;
			vm.error = null;
			ProductService.list()
				.then(data => (vm.items = data))
				.catch(() => (vm.error = 'Erro ao carregar produtos'))
				.finally(() => (vm.loading = false));
		};

		vm.new = function () {
			vm.form = { nome: '', valor: 0 };
			vm.mode = 'create';
		};
		vm.edit = function (p) {
			vm.form = angular.copy(p);
			vm.mode = 'edit';
		};
		vm.cancel = function () {
			vm.mode = 'list';
		};

		vm.save = function () {
			if (!vm.isMaster()) return;
			let dto = {
				nome: vm.form.nome,
				valor: parseFloat(vm.form.valor), // Garante número com ponto
			};
			const action =
				vm.mode === 'create' ? ProductService.create(dto) : ProductService.update(vm.form.id, dto);
			action
				.then(() => {
					vm.mode = 'list';
					vm.load();
				})
				.catch(() => (vm.error = 'Falha ao salvar'));
		};

		vm.remove = function (p) {
			if (!vm.isMaster()) return;
			if (!confirm('Excluir produto?')) return;
			ProductService.remove(p.id)
				.then(vm.load)
				.catch(() => (vm.error = 'Falha ao excluir'));
		};

		vm.$onInit = vm.load;
	},
});
