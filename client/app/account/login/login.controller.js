'use strict';

angular.module('cbaholidaysApp')
  .controller('LoginCtrl', function ($scope, Auth, $state, $location) {
    $scope.user = {};
    $scope.errors = {};

    $scope.login = function(form) {
      $scope.submitted = true;

      if(form.$valid) {
        Auth.login({
          email: $scope.user.email,
          password: $scope.user.password
        })
        .then( function() {
          $state.go('admin');
        })
        .catch( function(err) {
          $scope.errors.other = err.message;
        });
      }
    };

  });
