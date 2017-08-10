'use strict';

var app = angular.module('cbaholidaysApp');

// Prototype helpers
String.prototype.capitalize = function() {
    return this.replace(/(?:^|\s)\S/g, function(a) { return a.toUpperCase(); });
};

app.controller('MainCtrl', function ($scope, Submission, Template, Auth, $window, $modal, $timeout) {

    $window.qbtbConfigsLoader.load(true, {host: 'http://book.statravel.com/jsComponents/qbtb/', pos: 'au', version: 'v1.5', settings: 'commonwealth_flights_hotels_tours_insurance_1476888782252.json'});
    $('#qbtb_2_0_id_0').qbtb({host: 'http://book.statravel.com/jsComponents/qbtb/', pos: 'au', version: 'v1.5', settings: 'commonwealth_flights_hotels_tours_insurance_1476888782252.json'});

    $scope.Auth = Auth;
    $scope.submission = {};

    $scope.init = function() {
        Template.getSettings().then(function(data) {
            $scope.banner = {
                linkurl: data.bannerLinkURL,
                imageurl: data.bannerImageURL
            };
        });

        var iteractedWithWidget = false;

        $timeout(function(){
            $('#qbtb_2_0_id_0').click(function(){
                if(!iteractedWithWidget) {
                    console.log('form interaction');
                    $window.ga('send', 'event', 'STA Widget', 'Form Interaction');
                    iteractedWithWidget = true;
                }
            });

            $('.sta-flightsForm').on('submit', function(){
                console.log('serialize', $(this).serialize());
                $window.ga('send', 'event', {
                    eventCategory: 'STA Widget',
                    eventAction: 'Submit Flight Form',
                    eventLabel: $(this).serialize(),
                    transport: 'beacon'
                });
            });
        },1000);
    };

    $scope.createSubmission = function(form, size) {
        form.$submitted = true;


        if(form.$invalid){
            var modalInstance = $modal.open({
                templateUrl: 'app/main/modal/error.modal.html',
                controller: 'ErrorModalCtrl',
                size: size,
                resolve: {
                    formData: function () {
                        return $scope.submission;
                    }
                }
            });
        }
        else {
            // Capitalise and convert to uppercase
            if($scope.submission.title) $scope.submission.title = $scope.submission.title.capitalize();
            if($scope.submission.firstName) $scope.submission.firstName = $scope.submission.firstName.capitalize();
            if($scope.submission.surname) $scope.submission.surname = $scope.submission.surname.capitalize();

            Submission.createSubmission($scope.submission).then(function(data) {
                var modalInstance = $modal.open({
                    templateUrl: 'app/main/modal/success.modal.html',
                    controller: 'SuccessModalCtrl',
                    size: size,
                    resolve: {
                        formData: function () {
                            return $scope.submission;
                        }
                    }
                });
            }, function(response) {
                // Alert if /file API is down
                var modalInstance = $modal.open({
                    templateUrl: 'app/main/modal/submission.error.modal.html',
                    controller: 'ErrorModalCtrl',
                    size: size
                });
            });
        }
    };

    // Form Events
    $scope.dateFormat = function($event) {
        if(($event.keyCode !== 8 && $scope.submission.dateOfBirth) && ($scope.submission.dateOfBirth.length === 2 || $scope.submission.dateOfBirth.length === 5) ){
            $scope.submission.dateOfBirth += '/';
        }
    }

    $scope.showTC = function() {
        // Alert if /file API is down
        var modalInstance = $modal.open({
            templateUrl: 'app/main/modal/terms.modal.html',
            controller: 'TermsModalCtrl',
            size: 'lg'
        });
    }

});

app.controller('SuccessModalCtrl', function($scope, $modalInstance, formData) {

    $scope.formData = formData;

    $scope.close = function() {
        $modalInstance.close();
    };
});

app.controller('ErrorModalCtrl', function($scope, $modalInstance) {
    $scope.close = function() {
        $modalInstance.close();
    };
});

app.controller('TermsModalCtrl', function($scope, $modalInstance) {
    $scope.close = function() {
        $modalInstance.close();
    };
});
