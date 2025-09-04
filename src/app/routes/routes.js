angular.module('app')
  .config(function($routeProvider, $locationProvider, $httpProvider) {

    $routeProvider
      .when('/login', {
        template: `
  
     <div class="container-fluid login-bg">
      <div class="row min-vh-100 align-items-center justify-content-center">
        <div class="d-none d-md-block col-md-6 text-center px-0">
          <img src="./assets/media/wallpaper_doodles.png" alt="Imagem esquerda" class="img-fluid login-img">
        </div>
        <div class="col-12 col-md-6 d-flex justify-content-center">
          <div class="card shadow-lg login-card">
            <div class="card-body">
              <h1 class="title-login-1 text-right">Seja</h1>
              <h1 class="title-login-1 text-right">Bem-vindo!</h1>
              <p class="text-muted text-right">Faça login para acessar seus produtos.</p>
              <form ng-submit="vm.submit()">
                <div class="mb-3">
                  <label class="form-label">Nome</label>
                  <input type="text" class="form-control" ng-model="vm.usuario" required>
                </div>
                <div class="mb-3">
                  <label class="form-label">Senha</label>
                  <input type="password" class="form-control" ng-model="vm.password" required>
                </div>
                <button class="btn w-100 custom-login-btn" type="submit" ng-disabled="vm.loading">
                  {{ vm.loading ? 'Entrando...' : 'Entrar' }}
                </button>
                <div class="text-danger mt-2" ng-if="vm.error">{{vm.error}}</div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
        `,
        controller: 'LoginController',
        controllerAs: 'vm',
        requiresAuth: false
      })
      .when('/home', {
        template: `<product-grid></product-grid>`,
        controller: 'HomeController',
        requiresAuth: true
      })
      .when('/quem-somos', {
        template: `
          <h3>Quem Somos</h3>
          <p>Empresa X</p>
        `,
        controller: 'AboutController',
        requiresAuth: false
      })
      .when('/contato', {
        template: `
          <h3>Contato</h3>
          <p>E-mail: contato@empresa-x.com.br</p>
        `,
        controller: 'ContactController',
        requiresAuth: false
      })
     .otherwise({ redirectTo: '/login' });

    // Interceptor de Auth
    $httpProvider.interceptors.push('AuthInterceptor');
  });
