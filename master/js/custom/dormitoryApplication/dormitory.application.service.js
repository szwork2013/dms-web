(function() {
    'use strict';

    angular
        .module('dms.dormitoryApplication')
        .service('DormitoryApplicationService', DormitoryApplicationService);
    DormitoryApplicationService.$inject = ['$http', 'VO_PO_DICT', 'PO_VO_DICT', 'URL'];
    function DormitoryApplicationService($http, VO_PO_DICT, PO_VO_DICT, URL, ngDialog, ShareService) {
        
        this.queryData = function(callback) {
            $http.get(URL.dormitoryApplication.query).success(callback.success).error(callback.error);
        }
    
        this.preprocessData = function(data) {
            angular.forEach(data, function(item) {
                item.statusCN = PO_VO_DICT[item.status];
                item.typeCN = PO_VO_DICT[item.type];
                angular.forEach(item.employees, function(employee) {
                    employee.genderCN = PO_VO_DICT[employee.gender];
                    employee.spouseTypeCN = PO_VO_DICT[employee.spouseType];
                    employee.spouseGenderCN = PO_VO_DICT[employee.spouseGender];
                });
            });
            return data;
        }
    
        this.postprocessData = function(data) {
            return data;
        }
    }
})();
