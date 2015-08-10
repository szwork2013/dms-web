(function() {
    'use strict';

    angular
        .module('dms.account')
        .service('AccountService', AccountService);
    AccountService.$inject = ['$http', 'VO_PO_DICT', 'PO_VO_DICT', 'URL'];
    function AccountService($http, VO_PO_DICT, PO_VO_DICT, URL, ngDialog, ShareService) {
        
        this.queryData = function(callback) {
            $http.get(URL.account.query).success(callback.success).error(callback.error);
        }
    
        this.preprocessData = function(data) {
            angular.forEach(data, function(item) {
                item.typeCN = PO_VO_DICT[item.type];
            });
            return data;
        }
    
        this.postprocessData = function(data) {
            return data;
        }
    }
})();
