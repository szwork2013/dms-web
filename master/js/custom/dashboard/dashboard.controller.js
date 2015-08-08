(function() {
    'use strict';

    angular
        .module('dms.dashboard')
        .controller('DashboardController', DashboardController);

    DashboardController.$inject = ['$rootScope', '$scope'];
    function DashboardController($rootScope, $scope) {
        $scope.bedInUseCnt = 101;
        $scope.bedTotalCnt = 201;
        $scope.maleEmployeeCnt = 301;
        $scope.femaleEmployeeCnt = 302;
        $scope.dormitoryApplicationCnt = 401;
        $scope.maintenanceApplicationCnt = 501;
    }
})();
