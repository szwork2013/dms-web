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
        $urlRouterProvider.otherwise('/login');

        // 
        // application Routes
        // -----------------------------------   
        $stateProvider
          .state('login', {
              url: '/login',
              title: '登录',
              controller: 'LoginFormController',
              templateUrl: helper.basepath('pages/login.html')
          })
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
              templateUrl: helper.basepath('employee-list.html'),
              resolve: helper.resolveFor('ngTable', 'ngDialog')
          })
          .state('app.accommodation-fee', {
              url: '/accommodation-fee',
              title: '住宿费审核',
              controller: 'AccommodationFeeController',
              templateUrl: helper.basepath('accommodation-fee-list.html'),
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
          .state('app.maintenance', {
              url: '/maintenance',
              title: '维修申请管理',
              controller: 'MaintenanceApplicationController',
              templateUrl: helper.basepath('maintenance-apply-list.html'),
              resolve: helper.resolveFor('ngTable', 'ngDialog')
          })
          .state('app.account', {
              url: '/account',
              title: '系统账号管理',
              controller: 'AccountController',
              templateUrl: helper.basepath('account-list.html'),
              resolve: helper.resolveFor('ngTable', 'ngDialog')
          })
          .state('app.dormitory-apply-wizard', {
              url: '/dormitory-apply-wizard',
              title: '宿舍申请向导',
              controller: 'DormitoryApplyWizardController',
              templateUrl: helper.basepath('dormitory-apply-wizard.html'),
              resolve: helper.resolveFor('ngTable', 'ngDialog', 'ngDialog', 'parsley', 'ui.select', 'taginput', 'inputmask', 'localytics.directives')
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

