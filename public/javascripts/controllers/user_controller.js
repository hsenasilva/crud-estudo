
//nomeDoApp.controller('nome do controller', [dependências injetadas na assinatura do controller])
//nome do app é informado na tag body do index.html
//TODO comentar cada dependência
testApp.controller('UserDetailCtrl', ['$scope', '$routeParams', 'UserFactory', '$location',
  function ($scope, $routeParams, UserFactory, $location) {

    $scope.user = UserFactory.show({id: $routeParams.id});
    $scope.user.id = $routeParams.id;
    // callback for ng-click 'updateUser':
    $scope.updateUser = function ($routeParams) {
      console.log($scope.user);
      UserFactory.update($scope.user);
      $location.path('/user-list');
    };

    // callback for ng-click 'cancel':
    $scope.cancel = function () {
      $location.path('/user-list');
    };
  }
]);

testApp.controller ('UserListCtrl', ['$scope', 'UsersFactory', 'UserFactory', '$location',
  function ($scope, UsersFactory, UserFactory, $location) {

    // callback for ng-click 'editUser':
    $scope.editUser = function (userId) {
      $location.path('/edit-user/' + userId);
    };

    // callback for ng-click 'deleteUser':
    $scope.deleteUser = function (userId) {
      UserFactory.delete({ id: userId });
      $scope.users = UsersFactory.query();
    };

    // callback for ng-click 'createUser':
    $scope.createNewUser = function () {
      $location.path('/create-user');
    };

    $scope.users = UsersFactory.query();
  }
]);

testApp.controller('UserCreateCtrl', ['$scope', 'UsersFactory', '$location',
  function ($scope, UsersFactory, $location) {

    // callback for ng-click 'createNewUser':
    $scope.createNewUser = function () {
      UsersFactory.create($scope.user);
      $location.path('/list-user');
    }
    
    // callback for ng-click 'cancel':
    $scope.cancel = function () {
      $location.path('/user-list');
    }
  }
]);