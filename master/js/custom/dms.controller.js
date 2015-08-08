
(function () {
    'use strict';

    angular
        .module('dms')
        .controller('DMSController', DMSController);

    DMSController.$inject = ['$rootScope', '$http'];
    function DMSController($rootScope, $http) {
        var initAddressDropdown = function () {
			var path = "server/address-tree.json";
			$http.get(path)
				.success(function (response) {
					$rootScope.addressTree = response;
				})
				.error(function (data, status, headers, config) {
					alert("Address Tree init failure!");
				});
		};
		
		var initDormitoryTypeDropdown = function () {
			$rootScope.dormitoryTypes = ['集体宿舍 - 男', '集体宿舍 - 女', '夫妻房', '其他'];
		};

		var initDropdown = function () {
			initAddressDropdown();
			initDormitoryTypeDropdown();
		}

		initDropdown();
    }
})();