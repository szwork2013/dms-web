(function() {
    'use strict';

    angular
        .module('dms.dormitoryApplication')
        .controller('DormitoryApplyWizardController', DormitoryApplyWizardController);

    DormitoryApplyWizardController.$inject = ['$rootScope', '$scope', '$state', '$filter', '$resource', '$timeout', 'ngTableParams', 'ngDialog', 'DormitoryApplicationService','ShareService'];
    function DormitoryApplyWizardController($rootScope, $scope, $state, $filter, $resource, $timeout, ngTableParams, ngDialog, DormitoryApplicationService, ShareService) {
    	// ===== 缺省值 =====
        $scope.selectEmployeeType = "new";
        $scope.selectSpouseType = "newInner";
        // ==================

        // ===== 申请人 =====
        $scope.applicant = {};
        // ==================
    }
})();
