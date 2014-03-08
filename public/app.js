var testApp = angular.module('testApp', [
  'ngCookies',
  'ngResource',
  'ngSanitize',
  'ui.bootstrap',
  'ngRoute'
])
  .config(['$routeProvider', function ($routeProvider) {

    $routeProvider.when('/list-user', {templateUrl: './views/user/list_user.html', controller: 'UserListCtrl'});
    $routeProvider.when('/edit-user/:id', {templateUrl: './views/user/edit_user.html', controller: 'UserDetailCtrl'});
    $routeProvider.when('/create-user', {templateUrl: './views/user/create_user.html', controller: 'UserCreateCtrl'});
    $routeProvider.when('/login', {templateUrl: './views/login/login.html', controller: 'LoginCtrl'});
    $routeProvider.otherwise({redirectTo: '/'});
  }]);