(function() {
    'use strict';

    angular
        .module('dms.dormitory')
        .service('DormitoryService', DormitoryService);
    DormitoryService.$inject = ['$http', 'VO_PO_DICT', 'PO_VO_DICT', 'URL'];
    function DormitoryService($http, VO_PO_DICT, PO_VO_DICT, URL, ngDialog, ShareService) {
        
        this.queryData = function(callback) {
            $http.get(URL.dormitory.query).success(callback.success).error(callback.error);
        }
    
        this.preprocessData = function(data) {
            angular.forEach(data, function(item) {
                item.dormitory.addressDetailCN = item.dormitory.campus + " - " + item.dormitory.address + " - " + item.dormitory.floor + "层 - " + item.dormitory.doorplate;
                item.dormitory.typeCN = PO_VO_DICT[item.dormitory.type];
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
