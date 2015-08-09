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
            'app.utils',
            'dms.dashboard',
            'dms.dormitory',
            'dms.employee',
            'dms.accommodation',
            'dms.dormitoryApplication',
            'dms.maintenanceApplication',
            'dms.util'
        ]);
})();

