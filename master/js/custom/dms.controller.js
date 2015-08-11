
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

		// ===== 初始化系统共用的变量 =====
		$rootScope.DEPARTMENTS = ["办公室","物业","运输","校园","接待","工贸","动力","膳食","幼教","监理","其他"];
		$rootScope.GENDERS = [{name: '男', code: 'MALE'},
							  {name: '女', code: 'FEMALE'},
							  {name: '其他', code: 'UNKNOWN'}];
		// ================================
    }
})();