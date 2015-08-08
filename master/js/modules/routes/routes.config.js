/**=========================================================
 * Module: config.js
 * dms routes and resources configuration
 =========================================================*/


(function() {
    'use strict';

    angular
        .module('app.routes')
        .config(routesConfig);

    routesConfig.$inject = ['$stateProvider', '$locationProvider', '$urlRouterProvider', 'RouteHelpersProvider'];
    function routesConfig($stateProvider, $locationProvider, $urlRouterProvider, helper){
        
        // Set the following to true to enable the HTML5 Mode
        // You may have to set <base> tag in index and a routing configuration in your server
        $locationProvider.html5Mode(false);

        // defaults to dashboard
        $urlRouterProvider.otherwise('/dms/dashboard');

        // 
        // dmslication Routes
        // -----------------------------------   
        $stateProvider
          .state('dms', {
              url: '/dms',
              abstract: true,
              controller: 'DMSController',
              templateUrl: helper.basepath('dms.html'),
              resolve: helper.resolveFor('modernizr', 'icons')
          })
          .state('dms.dashboard', {
              url: '/dashboard',
              title: '个人中心',
              controller: 'DashboardController',
              templateUrl: helper.basepath('dashboard.html')
          })
          .state('dms.dormitory-map', {
              url: '/dormitory-map',
              title: '地理视图',
              controller: 'DormitoryMapController',
              templateUrl: helper.basepath('dormitory-map.html')
          })
          .state('dms.dormitory-list', {
              url: '/dormitory-list',
              title: '列表视图',
              controller: 'DormitoryListController',
              templateUrl: helper.basepath('dormitory-list.html'),
              resolve: helper.resolveFor('ngTable', 'ngDialog')
          })
          // 
          // CUSTOM RESOLVES
          //   Add your own resolves properties
          //   following this object extend
          //   method
          // ----------------------------------- 
          // .state('dms.someroute', {
          //   url: '/some_url',
          //   templateUrl: 'path_to_template.html',
          //   controller: 'someController',
          //   resolve: angular.extend(
          //     helper.resolveFor(), {
          //     // YOUR RESOLVES GO HERE
          //     }
          //   )
          // })
          ;

    } // routesConfig

})();

