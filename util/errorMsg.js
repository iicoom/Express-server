/**
 * 错误码
 */
// 20xx 用户
// 30xx 账户
// 40xx 批次
// 50xx 订单
// 60xx 账户

var messages = {
    '999': {
        code: '999', // 错误码
        message: 'unkonw_error', // 错误信息
        description: '未知错误', // 详细描述
        status_code: 400 // http响应码
    },
    '1000': {
        code: '1000',
        message: 'need_permission',
        description: '需要权限',
        status_code: 401
    },
    '1001': {
        code: '1001',
        message: 'uri_not_found',
        description: '资源不存在',
        status_code: 404
    },
    '1002': {
        code: '1002',
        message: 'missing_args',
        description: '参数不全',
        status_code: 400
    },
    '1003': {
        code: '1003',
        message: 'image_too_large',
        description: '上传的图片太大',
        status_code: 400
    },
    '1004': {
        code: '1004',
        message: 'image_wrong_format',
        description: '照片格式有误(仅支持JPG,JPEG,GIF,PNG或BMP)',
        status_code: 400
    },
    '1005': {
        code: '1005',
        message: 'image_unknow',
        description: '不支持的图片格式',
        status_code: 400
    },
    '1006': {
        code: '1006',
        message: 'input_too_short',
        description: '输入为空，或者输入字数不够',
        status_code: 400
    },
    '1007': {
        code: '1007',
        message: 'need_captcha',
        description: '需要验证码，验证码有误',
        status_code: 403
    },
    '1008': {
        code: '1008',
        message: 'invalid_args',
        description: '参数错误',
        status_code: 400
    },
    '1009': {
        code: '1009',
        message: 'invalid_user',
        description: '用户名或密码错误',
        status_code: 400
    },
    '1010': {
        code: '1010',
        message: 'disabled_user',
        description: '用户已冻结',
        status_code: 403
    },
    '1011': {
        code: '1011',
        message: 'login_limit',
        description: '密码错误次数太多',
        status_code: 403
    },
    '1012': {
        code: '1012',
        message: 'required_login',
        description: '需要登录',
        status_code: 401
    },
    '1013': {
        code: '1013',
        message: 'invalid_token',
        description: '无效的token',
        status_code: 401
    },
    '1014': {
        code: '1014',
        message: 'account_not_active',
        description: '账号未激活',
        status_code: 403
    },
    '1015': {
        code: '1015',
        message: 'too_many_requests',
        description: '访问太频繁',
        status_code: 429
    },
    '1016': {
        code: '1016',
        message: '',
        description: '验证码错误。',
        status_code: 400
    },
    '2001': {
        code: '2001', // 错误码
        message: 'user_error', // 错误信息
        description: '用户信息不正确', // 详细描述
        status_code: 400 // http响应码
    },
    '2002': {
        code: '2002',
        message: 'set_real_name_error',
        description: '实名认证失败',
        status_code: 400
    },
    '2003': {
        code: '2003',
        message: 'unbinding_verify_error',
        description: '解绑信息失败',
        status_code: 404
    },
    '2005': {
        code: '2005',
        message: 'user_exist',
        description: '用户已存在',
        status_code: 400
    },
    '2006': {
        code: '2006',
        message: 'invalid_user',
        description: '用户名或密码错误',
        status_code: 400
    },
    '2007': {
        code: '2007',
        message: 'user_no_exist',
        description: '用户不存在',
        status_code: 400
    },
    '2008': {
        code: '2008',
        message: 'error_links',
        description: '错误链接',
        status_code: 400
    },
    '2009': {
        code: '2009',
        message: 'member_audit_process',
        description: '企业会员正在审核中',
        status_code: 400
    },
    '2010': {
        code: '2010',
        message: 'member_aduit_success',
        description: '企业会员已经审核成功',
        status_code: 400
    },
    '2011': {
        code: '2011',
        message: 'member_aduit_pending',
        description: '企业会员申请已经提交。',
        status_code: 400
    },
    '2012': {
        code: '2012',
        message: 'member_exist',
        description: '企业已经存在。',
        status_code: 400
    },
    '2013': {
        code: '2013',
        message: 'pay_pass_exist',
        description: '已经设置过支付密码。',
        status_code: 400
    },
    '2014': {
        code: '2014',
        message: 'pay_pass_not_exist',
        description: '未设置过支付密码。',
        status_code: 400
    },
    '2015': {
        code: '2015',
        message: 'not_set_real_name',
        description: '未进行过实名认证。',
        status_code: 400
    },
    '2016': {
        code: '2016',
        message: 'not_set_piggy_bank',
        description: '未开通存钱罐。',
        status_code: 400
    },
    '2017': {
        code: '2017',
        message: 'no_find_company',
        description: '企业不存在。',
        status_code: 400
    },
    '2018': {
        code: '2018',
        message: 'member_aduit_failed',
        description: '企业审核没有通过。',
        status_code: 400
    },
    '2019': {
        code: '2019',
        message: 'mobile_not_equal',
        description: '平台认证手机号码不一致。',
        status_code: 400
    },
    '2020': {
        code: '2020',
        message: 'need_active',
        description: '请先进行用户升级。',
        status_code: 401
    },
    '2021': {
         code: '2021',
        message: 'idcard_exist',
        description: '身份证号已存在。',
        status_code: 400
    },
    '2022': {
      code: '2022',
      message: 'idcard_no_exist',
      description: '身份证号不存在。',
      status_code: 400
    },
    '3001': {
        code: '3001',
        message: 'jifen_uninitialized',
        description: '云币账户未初始化。',
        // status_code: 500
        status_code: 400
    },
    '3002': {
        code: '3002',
        message: 'withdraw_limit',
        description: '每天最多能提现3次。',
        // status_code: 500
        status_code: 400
    },
    '4001': {
        code: '4001',
        message: 'batch_no_exist',
        description: '批次不存在',
        status_code: 400
    },
    '4002': {
        code: '4002',
        message: 'repeat_repay',
        description: '重复回款',
        status_code: 400
    },
    '403008': {
        code: '403008',
        message: 'order_no_pay',
        description: '有未支付的订单',
        status_code: 400
    },
    '5001': {
        code: '5001',
        message: 'insufficient_balance',
        description: '余额不足，请先充值。',
        status_code: 400
    },
    '5002': {
        code: '5002',
        message: 'order_not_exist',
        description: '订单不存在。',
        status_code: 400
    },
    '5003': {
        code: '5003',
        message: 'order_repurchase_success',
        description: '回款已处理成功。',
        status_code: 400
    },
    '5004': {
        code: '5004',
        message: 'order_repurchase_process',
        description: '回款处理中。',
        status_code: 400
    },
    '6001': {
        code: '6001',
        message: 'account_not_exist',
        description: '账户不存在。',
        status_code: 400
    },
    '6002': {
        code: '6002',
        message: 'withdraw_fail',
        description: '提现失败',
        status_code: 400
    },
    '6003': {
        code: '6003',
        message: 'transaction_not_exist',
        description: '交易不存在。',
        status_code: 400
    }
}

module.exports = messages;
