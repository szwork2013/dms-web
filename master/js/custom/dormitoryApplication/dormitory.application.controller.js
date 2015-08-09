(function() {
    'use strict';

    angular
        .module('dms.dormitoryApplication')
        .controller('DormitoryApplicationController', DormitoryApplicationController);

    DormitoryApplicationController.$inject = ['$rootScope', '$scope', '$state', '$filter', '$resource', '$timeout', 'ngTableParams', 'ngDialog', 'DormitoryApplicationService','ShareService'];
    function DormitoryApplicationController($rootScope, $scope, $state, $filter, $resource, $timeout, ngTableParams, ngDialog, DormitoryApplicationService, ShareService) {
        var vm = this;
        var data = null;
        var updateTable = false;
        // ========== 筛选 ========== 
        $scope.select = {
            data: {
                statusCN: '',
                typeCN: ''
            },
            dropdown: {
                statusCN: false,
                typeCN: false
            }
        };
        $scope.searchkeywords = '';

        $scope.dropSelect = function (name, value) {
            $scope.select.data[name] = value;
            $scope.select.dropdown[name] = false;
            vm.tableParams.reload();
        }

        $scope.resetFilter = function() {
            for(var key in $scope.select.data) {
                $scope.select.data[key] = '';
            }
            $scope.searchkeywords = '';
            vm.tableParams.reload();
        }

        $scope.refreshTable = function() {
            updateTable = true;
            vm.tableParams.reload();
        }

        $scope.$watch("searchKeywords", function () {
            vm.tableParams.reload();
        });
        // =========================
        
        // ========== 数据显示 ==========
        vm.tableParams = new ngTableParams({
            page: 1,
            count: 10
        }, {
            total: 0,
            counts: [10, 20, 50],
            getData: function ($defer, params) {
                if (!data || updateTable) {
                    DormitoryApplicationService.queryData({
                        success: function (response) {
                            if (response.status) {
                                data = DormitoryApplicationService.preprocessData(response.result);
                                showTableData($defer, params);
                            } else {
                                alert("列表获取失败");
                            }
                            updateTable = false;
                            console.log("Query Dormitory Application List", data);
                        },
                        error: function (data, status, headers, config) {
                            alert("GET Error");
                        }
                    },updateTable);
                } else {
                    showTableData($defer, params);
                }
            }
        });
        var showTableData = function($defer, params) {
            var searchedData = searchData(data);
            var orderedData = params.sorting() ? $filter('orderBy')(searchedData, params.orderBy()) : searchedData;
            params.total(orderedData.length);
            $defer.resolve($scope.dormitories = orderedData.slice((params.page() - 1) * params.count(), params.page() * params.count()));
        }
        var searchData = function(filterData) {
            if($scope.searchKeywords) {
                var keywords = $scope.searchKeywords.split(" ");
                var i;
                for(i in keywords) {
                    filterData = $filter('filter')(filterData, keywords[i]);
                }
            }
            
            if($scope.select.data.statusCN) filterData = $filter('filter')(filterData, { statusCN : $scope.select.data.statusCN});
            if($scope.select.data.typeCN) filterData = $filter('filter')(filterData, { typeCN : $scope.select.data.typeCN});
            return filterData;
        }
        // =============================
        
        // ========== 表格Checkbox ==========
        $scope.checkboxes = { 'checked': false, items: {} };
        // 总checkbox
        $scope.$watch('checkboxes.checked', function(value) {
            angular.forEach($scope.dormitories, function(item) {
                if (angular.isDefined(item.dormitory.id)) {
                    $scope.checkboxes.items[item.dormitory.id] = value;
                }
            });
        });
        // 子checkbox
        $scope.$watch('checkboxes.items', function(values) {
            if (!$scope.dormitories) {
                return;
            }
            var checked = 0, unchecked = 0,
            total = $scope.dormitories.length;
            angular.forEach($scope.dormitories, function(item) {
                checked   +=  ($scope.checkboxes.items[item.dormitory.id]) || 0;
                unchecked += (!$scope.checkboxes.items[item.dormitory.id]) || 0;
            });
            if ((unchecked == 0) || (checked == 0)) {
                $scope.checkboxes.checked = (checked == total);
            }
            angular.element(document.getElementById("select_all")).prop("indeterminate", (checked != 0 && unchecked != 0));
        }, true);
        // ==================================
    }
})();
