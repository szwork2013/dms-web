(function() {
    'use strict';

    angular
        .module('dms.accommodation')
        .controller('AccommodationFeeController', AccommodationFeeController);

    AccommodationFeeController.$inject = ['$rootScope', '$scope', '$state', '$filter', '$resource', '$timeout', 'ngTableParams', 'ngDialog', 'AccommodationService','ShareService'];
    function AccommodationFeeController($rootScope, $scope, $state, $filter, $resource, $timeout, ngTableParams, ngDialog, AccommodationService, ShareService) {
        var vm = this;
        var data = null;
        var updateTable = false;
        // ========== 筛选 ========== 
        $scope.select = {
            data: {
                year: '',
                month: '',
                department: ''
            },
            dropdown: {
                year: false,
                month: false,
                department: false
            }
        };
        $scope.searchkeywords = '';

        $scope.dropSelect = function (name, value) {
            $scope.select.data[name] = value;
            $scope.select.dropdown[name] = false;
            if(name == 'year') {
                $scope.select.data.month = '';
            }
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
                    AccommodationService.queryFeeData({
                        success: function (response) {
                            if (response.status) {
                                data = AccommodationService.preprocessData(response.result);
                                showTableData($defer, params);
                            } else {
                                alert("列表获取失败");
                            }
                            updateTable = false;
                            console.log("Query AccommodationService Fee List", data);
                        },
                        error: function (data, status, headers, config) {
                            console.log(data, status, headers, config);
                            alert("GET Error2");
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
            
            if($scope.select.data.campus) filterData = $filter('filter')(filterData, { employee : { workCampus : $scope.select.data.campus}});
            if($scope.select.data.department) filterData = $filter('filter')(filterData, { employee : { department : $scope.select.data.department}});
            if($scope.select.data.genderCN) filterData = $filter('filter')(filterData, { employee : { genderCN : $scope.select.data.genderCN}});
            return filterData;
        }
        // =============================
        
        // ========== 表格Checkbox ==========
        $scope.checkboxes = { 'checked': false, items: {} };
        // 总checkbox
        $scope.$watch('checkboxes.checked', function(value) {
            angular.forEach($scope.dormitories, function(item) {
                if (angular.isDefined(item.employee.id)) {
                    $scope.checkboxes.items[item.employee.id] = value;
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
                checked   +=  ($scope.checkboxes.items[item.employee.id]) || 0;
                unchecked += (!$scope.checkboxes.items[item.employee.id]) || 0;
            });
            if ((unchecked == 0) || (checked == 0)) {
                $scope.checkboxes.checked = (checked == total);
            }
            angular.element(document.getElementById("select_all")).prop("indeterminate", (checked != 0 && unchecked != 0));
        }, true);
        // ==================================

        $scope.showEmployee = function(employee) {
            ShareService.setData(angular.copy(employee));
            ngDialog.open({
                template: 'app/views/dialogs/show-employee.html',
                controller: function ($scope, ngDialog, ShareService) {
                    $scope.employee = ShareService.getData();

                    // ===== 对话框操作 ===== 
                    $scope.checkOut = function() {
                        console.log("Check Out", $scope.employee);
                        // TODO 发送迁出消息
                    }
                    $scope.cancel = function() {
                        ngDialog.close();
                    }
                    // ====================== 
                }
            });
        }

    }
})();
