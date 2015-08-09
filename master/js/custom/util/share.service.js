(function() {
    'use strict';

    angular
        .module('dms.util')
        .service('ShareService', ShareService);

    function ShareService() {
         var data;
		  return {
		      getData: function () {
		          return data;
		      },
		      setData: function(_data) {
		          data = _data;
		      }
		  };
    }
})();
