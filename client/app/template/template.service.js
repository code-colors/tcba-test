'use stric8t';

angular.module('cbaholidaysApp')
.factory('Template', function (Restangular) {

	var service = {
		getSettings: function(){
			return Restangular.one('template').get();
		},
		saveSettings: function(data){
			return Restangular.one('template').customPUT(data);
		}
	};

	return service;
});
