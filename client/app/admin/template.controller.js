'use strict';

angular.module('cbaholidaysApp')
.controller('TemplateCtrl', function ($scope, $state, Auth, Template) {

    Auth.isLoggedInAsync(function() {
        if(!Auth.isLoggedIn()) $state.go('login');
        if(!Auth.isAdmin() && Auth.isLoggedIn()) $state.go('main');
    });

    $scope.opened = [];

    // Get Submissions List
    $scope.init = function() {
        Template.getSettings().then(function(data) {
            $scope.settings = data;
        }, function(response) {
            // Alert if /file API is down
            console.log(response);
        });
    };

    $scope.saveForm = function() {
        Template.saveSettings($scope.settings).then(function(data) {
            $state.reload();
        }, function(response) {
            // Alert if /file API is down
            console.log(response);
        });
    };

    $scope.isThink = function() {
        return Auth.isThink();
    };
});
