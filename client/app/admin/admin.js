'use strict';

angular.module('cbaholidaysApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('admin', {
        url: '/admin',
        templateUrl: 'app/admin/admin.html',
        controller: 'AdminCtrl'
      })
      .state('templateSettings', {
        url: '/admin/template',
        templateUrl: 'app/admin/templateSettings.html',
        controller: 'TemplateCtrl'
      });
  });
