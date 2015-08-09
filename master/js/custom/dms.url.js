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
                "queryFee" : "server/accommodation-fee-list.json"
            }
        })
      ;

})();