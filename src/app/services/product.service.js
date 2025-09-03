angular.module('app')
  .factory('ProductService', function($http, API_URL) {
    const base = API_URL + '/produtos';
    return {
      list()       { return $http.get(base).then(r => r.data); },
      get(id)      { return $http.get(`${base}/${id}`).then(r => r.data); },
      create(dto)  { return $http.post(base, dto).then(r => r.data); },
      update(id, dto) { return $http.put(`${base}/${id}`, dto).then(r => r.data); },
      remove(id)   { return $http.delete(`${base}/${id}`).then(r => r.data); }
    };
  });
