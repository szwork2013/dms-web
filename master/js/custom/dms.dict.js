(function() {
    'use strict';

    angular
        .module('dms')
        .constant('PO_VO_DICT', {
            "GROUP_MALE"       : "集体宿舍 - 男",
            "GROUP_FEMALE"     : "集体宿舍 - 女",
            "COUPLE"           : "夫妻房",
            "MALE"             : "男",
            "FEMALE"           : "女",
            "UNKNOWN"          : "其他",
            "NONE"             : "没有登记配偶",
            "INNER"            : "集团员工",
            "OUTER"            : "非集团员工",
            "UNCHECK"          : "待审核",
            "RECHECK"          : "待重审",
            "APPROVED"         : "已通过",
            "REJECTED"         : "不通过",
            "MANAGER_PENDING"  : "待经理审核",
            "MANAGER_APPROVED" : "经理批准，待办公室审核",
            "MANAGER_REJECTED" : "经理未批准",
            "OFFICE_PENDING"   : "待办公室审核",
            "OFFICE_APPROVED"  : "办公室已分配宿舍",
            "OFFICE_REJECT"    : "办公室未批准"
        })
        .constant('VO_PO_DICT', {
            "集体宿舍 - 男"    : "GROUP_MALE",
            "集体宿舍 - 女"    : "GROUP_FEMALE",
            "夫妻房"         : "COUPLE",
            "男"           : "MALE",
            "女"           : "FEMALE",
            "其他"          : "UNKNOWN",
            "没有登记配偶"      : "NONE",
            "集团员工"        : "INNER",
            "非集团员工"       : "OUTER",
            "待审核"         : "UNCHECK",
            "待重审"         : "RECHECK",
            "已通过"         : "APPROVED",
            "不通过"         : "REJECTED",
            "待经理审核"       :"MANAGER_PENDING",
            "经理批准，待办公室审核" :"MANAGER_APPROVED",
            "经理未批准"       :"MANAGER_REJECTED",
            "待办公室审核"      :"OFFICE_PENDING",
            "办公室已分配宿舍"    :"OFFICE_APPROVED",
            "办公室未批准"      :"OFFICE_REJECT"
        })
      ;

})();