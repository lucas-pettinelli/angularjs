angular.module('app').component('productGrid', {
	templateUrl: './components/product-grid/product-grid.template.html',
	controller: function (ProductService, AuthService) {
		var vm = this;
		vm.items = [];
		vm.loading = false;
		vm.error = null;
		vm.isMaster = AuthService.isMaster;

		vm.form = { id: null, nome: '', valor: 0 };
		vm.mode = 'list';

		vm.load = function () {
			vm.loading = true;
			vm.error = null;
			ProductService.list()
				.then(data => (vm.items = data))
				.catch(() => (vm.error = 'Erro ao carregar os produtos'))
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
				valor: parseFloat(vm.form.valor),
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
			if (!confirm('Tem certeza que quer Excluir o produto?')) return;
			ProductService.remove(p.id)
				.then(vm.load)
				.catch(() => (vm.error = 'Houve uma falha ao excluir o produto'));
		};

		vm.$onInit = vm.load;
	},
});
