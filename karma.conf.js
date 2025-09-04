module.exports = function (config) {
	config.set({
		basePath: '',
		frameworks: ['jasmine'],

		// ORDEM CORRETA dos arquivos:
		files: [
			'node_modules/angular/angular.js',
			'node_modules/angular-route/angular-route.js',
			'node_modules/angular-mocks/angular-mocks.js',

			// PRIMEIRO: arquivo que CRIA o módulo
			'src/app/modules/module.js', // Este deve criar o módulo 'app'

			// DEPOIS: constantes e configurações
			'src/app/constants/constants.js',
			'src/app/routes/routes.js', // Configuração de rotas

			// DEPOIS: serviços e interceptors
			'src/app/services/*.service.js',
			'src/app/interceptors/*.interceptor.js',
      
      // DEPOIS: run block
			'src/app/run/run.js',

      // DEPOIS: controllers
			'src/app/controllers/*.controller.js',

			'src/app/components/**/*.js',

			// EXCLUIR testes da lista principal
			'!src/app/**/*.spec.js',

			// POR ÚLTIMO: testes
			'src/app/**/*.spec.js',
		],

		exclude: [],
		preprocessors: {},
		reporters: ['progress'],
		port: 9876,
		colors: true,
		logLevel: config.LOG_INFO,

		// CORRIGIDO: deve ser true para watch
		autoWatch: true,

		browsers: ['ChromeHeadless'],
		singleRun: false,
		concurrency: Infinity,
	});
};
