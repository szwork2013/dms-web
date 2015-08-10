/**=========================================================
 * Module: config.js
 * app routes and resources configuration
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
        $urlRouterProvider.otherwise('/app/dashboard');

        // 
        // application Routes
        // -----------------------------------   
        $stateProvider
          .state('app', {
              url: '/app',
              abstract: true,
              controller: 'DMSController',
              templateUrl: helper.basepath('app.html'),
              resolve: helper.resolveFor('fastclick', 'modernizr', 'icons', 'screenfull', 'animo', 'slimscroll', 'toaster', 'whirl', 'ui.select')
          })
          .state('app.dashboard', {
              url: '/dashboard',
              title: '个人中心',
              controller: 'DashboardController',
              templateUrl: helper.basepath('dashboard.html')
          })
          .state('app.dormitory-map', {
              url: '/dormitory-map',
              title: '地理视图',
              controller: 'DormitoryMapController',
              templateUrl: helper.basepath('dormitory-map.html')
          })
          .state('app.dormitory-list', {
              url: '/dormitory-list',
              title: '列表视图',
              controller: 'DormitoryListController',
              templateUrl: helper.basepath('dormitory-list.html'),
              resolve: helper.resolveFor('ngTable', 'ngDialog')
          })
          .state('app.employee', {
              url: '/employee',
              title: '员工列表',
              controller: 'EmployeeController',
              templateUrl: helper.basepath('employee.html'),
              resolve: helper.resolveFor('ngTable', 'ngDialog')
          })
          .state('app.accommodation-fee', {
              url: '/accommodation-fee',
              title: '住宿费审核',
              controller: 'AccommodationFeeController',
              templateUrl: helper.basepath('accommodation-fee-audit.html'),
              resolve: helper.resolveFor('ngTable', 'ngDialog')
          })
          .state('app.dormitory-apply', {
              url: '/dormitory-apply',
              title: '入住申请管理',
              controller: 'DormitoryApplicationController',
              templateUrl: helper.basepath('dormitory-apply-list.html'),
              resolve: helper.resolveFor('ngTable', 'ngDialog')
          })
          .state('app.accommodation', {
              url: '/accommodation',
              title: '入住历史记录',
              controller: 'DormitoryApplicationController',
              templateUrl: helper.basepath('accommodation-list.html'),
              resolve: helper.resolveFor('ngTable', 'ngDialog')
          })
          // 
          // CUSTOM RESOLVES
          //   Add your own resolves properties
          //   following this object extend
          //   method
          // ----------------------------------- 
          // .state('app.someroute', {
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

