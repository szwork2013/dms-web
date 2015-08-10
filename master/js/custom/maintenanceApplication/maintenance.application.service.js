(function() {
    'use strict';

    angular
        .module('dms.accommodation')
        .service('MaintenanceService', AccommodationService);
    AccommodationService.$inject = ['$http', 'VO_PO_DICT', 'PO_VO_DICT', 'URL'];
    function AccommodationService($http, VO_PO_DICT, PO_VO_DICT, URL, ngDialog, ShareService) {
        
        this.queryData = function(callback) {
            $http.get(URL.maintenanceApplication.query).success(callback.success).error(callback.error);
        }
    
        this.preprocessData = function(data) {
            angular.forEach(data, function(item) {
                item.dormitory.addressDetailCN = item.dormitory.campus + " - " + item.dormitory.address + " - " + item.dormitory.floor + "层 - " + item.dormitory.doorplate;
                item.dormitory.typeCN = PO_VO_DICT[item.dormitory.type];
                item.applicant.genderCN = PO_VO_DICT[item.applicant.gender];
                item.applicant.spouseTypeCN = PO_VO_DICT[item.applicant.spouseType];
                item.applicant.spouseGenderCN = PO_VO_DICT[item.applicant.spouseGender];
                item.statusCN = item.finishDate ? "已办结" : "待办";
            });
            return data;
        }
    
        this.postprocessData = function(data) {
            return data;
        }
    }
})();
