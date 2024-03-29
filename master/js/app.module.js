(function() {
    'use strict';

    angular
        .module('dms', [
            'app.core',
            'app.routes',
            'app.sidebar',
            'app.navsearch',
            'app.loadingbar',
            'app.translate',
            'app.settings',
            'app.forms',
            'app.utils',
            'dms.login',
            'dms.dashboard',
            'dms.dormitory',
            'dms.employee',
            'dms.accommodation',
            'dms.accommodationFee',
            'dms.dormitoryApplication',
            'dms.maintenanceApplication',
            'dms.account',
            'dms.util'
        ]);
})();

