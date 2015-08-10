(function() {
    'use strict';

    angular
        .module('dms')
        .constant('URL', {
            "dormitory" : {
                "query" : "server/dormitory-list.json"
            },
            "employee" : {
                "query" : "server/employee-list.json"
            },
            "accommodation" : {
                "query" : "server/accommodation-list.json"
            },
            "accommodationFee" : {
                "query" : "server/accommodation-fee-list.json"
            },
            "dormitoryApplication" : {
                "query" : "server/dormitory-apply-list.json"
            },
            "maintenanceApplication" : {
                "query" : "server/maintenance-apply-list.json"
            }
        })
      ;

})();