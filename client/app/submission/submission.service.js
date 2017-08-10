'use stric8t';

angular.module('cbaholidaysApp')
.factory('Submission', function (Restangular) {

	var service = {
		createSubmission: function(submission){
			return Restangular.one('submissions').customPOST(submission);
		},
		getSubmissions: function(){
			return Restangular.one('submissions').get();
		},
		markDownloaded: function(submissionId){
			return Restangular.one('submissions', 'download').post(submissionId);
		},
		markAllDownloaded: function(){
			return Restangular.one('submissions', 'download').post();
		},
		deleteSubmission: function(id){
			console.log(id);
			return Restangular.one('submissions', id).remove();
		},
	};

	return service;
});
