//TODO comentar cada dependência
testApp.controller('LoginCtrl', ['$scope', '$routeParams', 'UserFactory', '$location',
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