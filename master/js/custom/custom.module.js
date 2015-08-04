(function() {
    'use strict';

    angular
        .module('custom', [
            // request the the entire framework
            'dms',
            // or just modules
            'app.core',
            'app.sidebar'
            /*...*/
        ]);
})();