describe('ProductService', function () {
	var ProductService, $httpBackend, API_URL;

	beforeEach(module('app'));
	beforeEach(inject(function (_ProductService_, _$httpBackend_, _API_URL_) {
		ProductService = _ProductService_;
		$httpBackend = _$httpBackend_;
		API_URL = _API_URL_;
	}));

	it('deve listar produtos', function () {
		var mockData = [{ id: 1, nome: 'Teste', valor: 10 }];
		$httpBackend.expectGET(API_URL + '/produtos').respond(mockData);

		ProductService.list().then(function (data) {
			expect(data.length).toBe(1);
			expect(data[0].nome).toBe('Teste');
		});
		$httpBackend.flush();
	});
});
