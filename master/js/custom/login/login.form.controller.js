(function() {
    'use strict';

    angular
        .module('dms.login')
        .controller('LoginFormController', LoginFormController);

    LoginFormController.$inject = ['$rootScope', '$scope', '$state', '$filter', '$resource', '$timeout'];
    function LoginFormController($rootScope, $scope, $state, $filter, $resource, $timeout) {

    }
})();
