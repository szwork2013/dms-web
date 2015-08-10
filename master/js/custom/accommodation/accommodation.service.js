(function() {
    'use strict';

    angular
        .module('dms.accommodation')
        .service('AccommodationService', AccommodationService);
    AccommodationService.$inject = ['$http', 'VO_PO_DICT', 'PO_VO_DICT', 'URL'];
    function AccommodationService($http, VO_PO_DICT, PO_VO_DICT, URL, ngDialog, ShareService) {
        
        this.queryData = function(callback) {
            $http.get(URL.accommodation.query).success(callback.success).error(callback.error);
        }
    
        this.preprocessData = function(data) {
            angular.forEach(data, function(item) {
                item.dormitory.addressDetailCN = item.dormitory.campus + " - " + item.dormitory.address + " - " + item.dormitory.floor + "层 - " + item.dormitory.doorplate;
                item.dormitory.typeCN = PO_VO_DICT[item.dormitory.type];
                angular.forEach(item.accommodations, function(accommodation) {
                    accommodation.employee.genderCN = PO_VO_DICT[accommodation.employee.gender];
                    accommodation.employee.spouseTypeCN = PO_VO_DICT[accommodation.employee.spouseType];
                    accommodation.employee.spouseGenderCN = PO_VO_DICT[accommodation.employee.spouseGender];
                });
                item.statusCN = item.accommodations[0].checkOutDate ? "已迁出":"在住";
            });
            return data;
        }
    
        this.postprocessData = function(data) {
            return data;
        }
    }
})();
