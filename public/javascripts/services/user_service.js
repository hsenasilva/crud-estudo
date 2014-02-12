// $resource é um módulo do Angular que usamos para consumir serviços, ele é injetado por ngResource no public/app.js  
testApp.factory('UsersFactory', function ($resource) {
  return $resource('/api/user', {}, {
    query: { method: 'GET', isArray: true },
    create: { method: 'POST' }
  });
});

testApp.factory('UserFactory', function ($resource) {
  return $resource('/api/user/:id', {}, {
    show: { method: 'GET' },
    update: { method: 'PUT', params: {id: '@id'} },
    delete: { method: 'DELETE', params: {id: '@id'} }
  });
});