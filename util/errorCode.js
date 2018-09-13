'use strict';

/**
 * 错误码规则：httpStatus+错误类别
 * @type {{}}
 */

var ErrorCode = {};


//通用码
ErrorCode.UnKnow_Error = 400000;//未处理的错误
ErrorCode.Success = 200000;//成功

ErrorCode.Version_Low = 400000;//版本过低，请先升级

ErrorCode.Permission_Deny = 401100; //权限不足

//账户
ErrorCode.Account_ErrorParams = 403000; //参数不正确
ErrorCode.Account_ErrorParams_New = 400000;//
ErrorCode.Account_ErrorPermision_AS_lock = 403001;//自动购买锁定
ErrorCode.Account_ErrorPermision_AS_duplicate = 403002;//自动购买锁定
ErrorCode.Account_ErrorNotFound = 404001;

//验证码
ErrorCode.VerifyCode_UserNotFind = 404000; //用户不存在
ErrorCode.VerifyCode_UserFind = 404002; //用户存在
ErrorCode.VerifyCode_ErrorParams = 403003; //手机号码不正确
ErrorCode.IsRealName = 404003; //用户已经实名认证

//用户
ErrorCode.User_ErrorAuth = 403001;//认证错误
ErrorCode.User_ErrorParams = 403003; //参数错误
ErrorCode.User_ErrorNotFind = 403004; //未找到相关资源
ErrorCode.User_ErrorVerifyCode = 403005; //验证码错误
ErrorCode.User_ErrorUnAuth = 401001; //未认证

//请求次数限制
ErrorCode.User_ErrorRequestLimit = 403015; //请求次数限制

//订单
ErrorCode.Order_ErrorParams = 403003; //创建订单信息错误
ErrorCode.Order_ErrorOrderId = 403004; //订单id错误
ErrorCode.Order_ErrorNotFind = 403005; //订单不存在
ErrorCode.Order_ErrorLackUserInfo = 40030; //缺少用户信息
ErrorCode.Order_Params = 403006; //订单信息已存在
ErrorCode.Order_NoUpdate = 403007; //订单信息未更新
ErrorCode.Order_ErrorLimit = 403006; //超出限额
ErrorCode.Order_Exit = 403002; //订单已存在
ErrorCode.Order_Limit = 403001; //每单限制购买只数
ErrorCode.Order_NoPayLimit = 403008; //未支付订单限制

// 4005xx 订单错误信息
ErrorCode.CreateOrderFail = 400501; // 下单失败
ErrorCode.OrderLimitBatchOrderNum = 400502; // 每期订单限制
ErrorCode.OrderLimitBatchSheepNum = 400503; // 每期够买数量限制
ErrorCode.NoMoreSheep = 400504; // 商品数量不足

//邀请码
ErrorCode.InvitationCode_ErrorParams = 403003; //创建邀请码信息错误
ErrorCode.InvitationCode_ErrorInvitationCodId = 403004; //邀请码id错误
ErrorCode.InvitationCode_ErrorInvitationCodPage = 403004; //页码错误

//信息
ErrorCode.msg_ErrorParams = 403003; //创建信息的信息错误
ErrorCode.msg_msgId = 403004; //信息id错误
ErrorCode.msg_ErrorNotFind = 403005; //信息不存在

//推送消息
ErrorCode.aliPush_ErrorParams = 403003; // 参数错误

//活动
ErrorCode.activity_ErrorParams = 403003; //活动信息错误
ErrorCode.activity_Exist = 403003; //活动已存在
ErrorCode.activityNotExist = 403005; //没有找到活动

//产品
ErrorCode.productErrorParams = 403003; //创建产品失败
ErrorCode.productExist = 403004; //产品已存在
ErrorCode.productErrorNotFind = 403005; //产品不存在
ErrorCode.productParams = 403006; //产品信息错误

//卡号信息
ErrorCode.card_ErrorParams = 403003; //银行卡的信息错误
ErrorCode.card_Exist = 403004; //银行卡已经存在

ErrorCode.ErrorParams = 403003; //参数错误
ErrorCode.ErrorServer = 403004;//服务器错误

module.exports = ErrorCode;
