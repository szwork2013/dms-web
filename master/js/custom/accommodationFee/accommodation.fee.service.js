(function() {
    'use strict';

    angular
        .module('dms.accommodationFee')
        .service('AccommodationFeeService', AccommodationFeeService);
    AccommodationFeeService.$inject = ['$http', 'VO_PO_DICT', 'PO_VO_DICT', 'URL'];
    function AccommodationFeeService($http, VO_PO_DICT, PO_VO_DICT, URL, ngDialog, ShareService) {
        
        this.queryData = function(callback) {
            $http.get(URL.accommodationFee.query).success(callback.success).error(callback.error);
        }
    
        this.preprocessData = function(data) {
            angular.forEach(data, function(item) {
                item.dormitory.addressDetailCN = item.dormitory.campus + " - " + item.dormitory.address + " - " + item.dormitory.floor + "层 - " + item.dormitory.doorplate;
                item.dormitory.typeCN = PO_VO_DICT[item.dormitory.type];
                item.employee.genderCN = PO_VO_DICT[item.employee.gender];
                item.employee.spouseTypeCN = PO_VO_DICT[item.employee.spouseType];
                item.employee.spouseGenderCN = PO_VO_DICT[item.employee.spouseGender];
                item.statusCN = PO_VO_DICT[item.status];
            });
            return data;
        }
    
        this.postprocessData = function(data) {
            return data;
        }
    }
})();
