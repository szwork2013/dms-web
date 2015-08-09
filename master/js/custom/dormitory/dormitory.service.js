(function() {
    'use strict';

    angular
        .module('dms.dormitory')
        .service('DormitoryService', DormitoryService);
    DormitoryService.$inject = ['$http', 'VO_PO_DICT', 'PO_VO_DICT', 'URL', 'ngDialog','ShareService'];
    function DormitoryService($http, VO_PO_DICT, PO_VO_DICT, URL, ngDialog, ShareService) {
        
        this.queryData = function(callback) {
            $http.get(URL.dormitory.query).success(callback.success).error(callback.error);
        }
    
        this.preprocessData = function(data) {
            angular.forEach(data, function(item) {
                // 生成详细地址，保留原来的信息
                item.dormitory.addressDetailCN = item.dormitory.campus + " - " + item.dormitory.address + " - " + item.dormitory.floor + "层 - " + item.dormitory.doorplate;
                // 生成类型信息，保留原来的信息
                item.dormitory.typeCN = PO_VO_DICT[item.dormitory.type];
                angular.forEach(item.employees, function(employee) {
                    employee.genderCN = PO_VO_DICT[employee.gender];
                    employee.spouseTypeCN = PO_VO_DICT[employee.spouseType];
                    employee.spouseGenderCN = PO_VO_DICT[employee.spouseGender];
                });
                if(item.dormitory.type == "COUPLE") {
                    if(item.employees[0].spouseType == "INNER") {
                        console.log(item);
                        item.employees[0].innerSpouse = item.employees[1];
                        item.employees[1].innerSpouse = item.employees[0];
                    }
                }
            });
            return data;
        }
    
        this.postprocessData = function(data) {
            return data;
        }

        this.openShowEmployeeDialog = function(employee) {
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
        };

        this.openCheckInDialog = function(dormitory) {
            ShareService.setData(angular.copy(dormitory));
            ngDialog.open({
                template: 'app/views/dialogs/check-in.html',
                controller: function ($scope, ngDialog, ShareService) {
                    $scope.dormitory = ShareService.getData();
                    $scope.selectedApplication = null;
                    $scope.loading = false;
                    $scope.applications = [];

                    // 读取入住申请列表
                    $scope.loading = true;
                    DormitoryApplicationService.queryApplicationList({
                        success: function(response) {
                            $scope.loading = false;
                            if(response.status) {
                                $scope.applications = response.result;
                            } else {
                                alert("列表获取失败");
                            }
                        },
                        error: function() {
                            $scope.loading = false;
                            alert("网络出现异常");
                        }
                    });
                    // ===== 对话框操作 ===== 
                    $scope.updateSelectionStatus = function(value) {
                        $scope.selectedApplication = value;
                    }
                    $scope.checkIn = function() {
                        console.log("Check In", $scope.dormitory, $scope.selectedApplication);
                        // TODO 检查输入，发送迁入消息
                    }
                    $scope.cancel = function() {
                        ngDialog.close();
                    }
                    // ====================== 
                }
            });
        };

        this.openModifyDormitoryDialog = function(dormitory) {
            ShareService.setData(angular.copy(dormitory));
            ngDialog.open({
                template: 'app/views/dialogs/edit-dormitory.html',
                controller: function ($scope, ngDialog, ShareService) {
                    $scope.dormitory = ShareService.getData();
                    $scope.dormitoryTypes = ["集体宿舍 - 男", "集体宿舍 - 女", "夫妻房"];
                    // ===== 对话框操作 ===== 
                    $scope.submitModify = function () {
                        $scope.submitted = true;
                        if ($scope.modifyDormitoryForm.$valid) {
                            // TODO 提交修改
                        } else {
                            return false;
                        }
                    };

                    $scope.cancel = function() {
                        ngDialog.close();
                    }
                    // ====================== 
                }
            });
        }
    }
})();
