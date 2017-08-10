'use strict';

angular.module('cbaholidaysApp')
.controller('AdminCtrl', function ($scope, $state, Auth, Submission) {

    Auth.isLoggedInAsync(function() {
        if(!Auth.isLoggedIn()) $state.go('login');
        if(!Auth.isAdmin() && Auth.isLoggedIn()) $state.go('main');
    });
    
    $scope.opened = [];

    // Get Submissions List
    $scope.init = function() {
        Submission.getSubmissions().then(function(data) {
            $scope.submissionsList = data;
        }, function(response) {
            // Alert if /file API is down
            console.log(response);
        });
    };

    // Form Events
    $scope.openDatePicker = function($event, reference) {
        $event.preventDefault();
        $event.stopPropagation();

        $scope.opened[reference] = !$scope.opened[reference] ? true : false;
    };

    $scope.formatDate = function(date) {
        return moment(date).format('DD/MM/YYYY [at] h:mma');
    };

    $scope.clearDate = function(date) {
        $scope.toDate = '';
        $scope.fromDate = '';
    };

    // Delete Submission
    $scope.deleteSubmission = function(id) {
        Submission.deleteSubmission(id).then(function(data) {
            $scope.init();
        });
    };

    // All toggle
    $scope.checkboxToggle = function() {
        angular.forEach($scope.filteredList, function(submission) {
            submission.checkbox = $scope.toggleAll;
        });
    };

    // Individual toggle
    $scope.toggle = function(submission) {
        submission.checkbox = submission.checkbox ? false : true;
    };

    $scope.downloadResults = function() {

        var results = angular.copy($scope.filteredList);
        var selectedResults = [];
        var allResults = [];

        angular.forEach(results, function(result) {
            var tempId = result._id;


            // format date
            result.dateOfBirth = moment(result.dateOfBirth, 'DD/MM/YYYY').format('DD-MM-YYYY');
            result.dateCreated = moment(result.dateCreated).format('DD-MM-YYYY [at] h:mma');

            allResults.push(result);

            if(result.checkbox) {

                delete result._id;
                delete result.__v;
                delete result.checkbox;
                delete result.downloaded;

                selectedResults.push(result);
                Submission.markDownloaded(tempId);
            }
        });

        if(selectedResults.length) {
            $scope.init();
            return selectedResults;
        }
        else {
            allResults.filter(function(result) {

                Submission.markDownloaded(result._id);

                delete result._id;
                delete result.__v;
                delete result.checkbox;
                delete result.downloaded;

                return result.downloaded === false;
            });

            $scope.init();
            return allResults;
        }

    };

    $scope.getTimestamp = function() {
        return moment().format('YYYYMMDD_HHmm');
    };

    $scope.csvHeaders = function() {
        var headers = [];

        angular.forEach($scope.filteredList[0], function(result, key) {
            if(key !== '$$hashKey' && key !== '_id' && key !== '__v' && key !== 'downloaded' && key !== 'checkbox' ) {
                headers.push(key);
            }
        });

        return headers;
    };

})
.filter('filterSubmissions', function() {

    return function(items, searchInput, fromDate, toDate) {
        var results = [];
        var dateFilteredResults = [];

        // return if there is nothing being searched.
        if(!searchInput && (!fromDate || !toDate)) return items;

        // check for date filter
        if(fromDate && toDate && moment(fromDate).isValid() && moment(toDate).isValid()) {
            angular.forEach(items, function(item) {
                if(moment(item.dateCreated).isAfter(fromDate) && moment(item.dateCreated).isBefore(toDate)) {
                    dateFilteredResults.push(item);
                }
            });
        }

        // check for search filter
        if(searchInput) {
            items = (dateFilteredResults.length) ? dateFilteredResults : items;

            angular.forEach(items, function(item) {
                if(item.firstName.toLowerCase().indexOf(searchInput) >= 0 || item.surname.toLowerCase().indexOf(searchInput) >= 0 || item.email.toLowerCase().indexOf(searchInput) >= 0) {
                    results.push(item);
                }
            });
        }

        if(searchInput) {
            return results;
        } else {
            return dateFilteredResults;
        }
    };

});
