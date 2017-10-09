"use strict"

/**
 * 错误码规则：httpStatus+错误类别（用户类/羊类/羊舍/..）+具体错误代码
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
ErrorCode.Account_ErrorNotFound_Msg = '账户不存在';

//验证码
ErrorCode.VerifyCode_UserNotFind = 404000; //用户不存在
ErrorCode.VerifyCode_UserFind = 404002; //用户存在
ErrorCode.VerifyCode_ErrorParams = 403003; //手机号码不正确
ErrorCode.IsRealName = 404003; //用户已经实名认证

//用户
ErrorCode.User_ErrorAuth = 403001;//认证错误
ErrorCode.User_ErrorParams = 403003 //参数错误
ErrorCode.User_ErrorNotFind = 403004 //未找到相关资源
ErrorCode.User_ErrorVerifyCode = 403005 //验证码错误
ErrorCode.User_ErrorUnAuth = 401001; //未认证

// 企业
ErrorCode.COMPANY_NOT_EXIST = 404004; // 企业不存在

//请求次数限制
ErrorCode.User_ErrorRequestLimit = 403015 //请求次数限制

// post和put请求参数错误
ErrorCode.Request_LastTimeNotFind = 450002 //参数错误
//feeding_item
ErrorCode.FeedingItem_ErrorParams = 403004 //创建feeding_item信息错误
ErrorCode.FeedingItemr_ErrorFeedingItemId = 403004 //id错误
ErrorCode.FeedingItemr_ErrorFeedingItemType = 4030045 //id错误
ErrorCode.FeedingItemr_NoFeedingItem = 4030046 //id错误
//羊
ErrorCode.Sheep_ErrorParams = 403003 //创建羊信息错误
ErrorCode.Sheep_ErrorSheepId = 403004 //羊id错误
ErrorCode.Sheep_ErrorUpdateParams = 403007 //修改羊信息(参数错误)
ErrorCode.Sheep_Exist = 403008 //修改羊信息(参数错误)
ErrorCode.Sheep_ErrorFlockId = 403005 //羊群id错误
ErrorCode.Sheep_NOExist = 403006 //羊群id错误
//羊群
ErrorCode.Flock_ErrorParams = 403003 //创建羊群信息错误
ErrorCode.Flock_ErrorFlockId = 403004 //创建羊群id错误
ErrorCode.Flock_NoFind = 403005 //羊群id错误
ErrorCode.Flock_Params = 403006 //羊群已经存在
ErrorCode.Flock_NOExist = 403007 //羊群不存在
ErrorCode.Flock_NODelete = 403008 //羊群删除失败
ErrorCode.Flock_NumberSheep = 403009 //羊群删除失败
//羊群饲养表
ErrorCode.Feeding_ErrorParams = 403003 //参数错误
ErrorCode.Feeding_ErrorFeedingId = 403004 //id错误
ErrorCode.Feeding_ErrorUpdateFeedingId = 403004 //修改错误

//羊舍
ErrorCode.SheepHouse_ErrorParams = 403003 //创建羊舍信息错误
ErrorCode.SheepHouse_ErrorSheepHouseId = 403004 //羊舍id错误
ErrorCode.SheepHouse_Params = 403005 //羊舍信息已存在
ErrorCode.SheepHouse_NOExist = 403006 //羊舍信息不存在
//订单
ErrorCode.Order_ErrorParams = 403003 //创建订单信息错误
ErrorCode.Order_ErrorOrderId = 403004 //订单id错误
ErrorCode.Order_ErrorNotFind = 403005 //订单不存在
ErrorCode.Order_ErrorLackUserInfo = 40030 //缺少用户信息
ErrorCode.Order_Params = 403006 //订单信息已存在
ErrorCode.Order_NoUpdate = 403007 //订单信息未更新
ErrorCode.Order_ErrorLimit = 403006; //超出限额
ErrorCode.Order_Exit = 403002; //订单已存在
ErrorCode.Order_Limit = 403001; //每单限制购买只数
ErrorCode.Order_NoPayLimit = 403008; //未支付订单限制
//邀请码
ErrorCode.InvitationCode_ErrorParams = 403003 //创建邀请码信息错误
ErrorCode.InvitationCode_ErrorInvitationCodId = 403004 //邀请码id错误
ErrorCode.InvitationCode_ErrorInvitationCodPage = 403004 //页码错误

//信息
ErrorCode.msg_ErrorParams = 403003 //创建信息的信息错误
ErrorCode.msg_msgId = 403004 //信息id错误
ErrorCode.msg_ErrorNotFind = 403005 //信息不存在

//批次
ErrorCode.batch_ErrorParams = 403003 //创建批次的信息错误
ErrorCode.batch_Exist = 403003 //创建批次的信息错误
ErrorCode.BatchErrorNotFind = 403005 //批次不存在
ErrorCode.Batch_SheepLimit = 403006;//每期购买羊只数限制
ErrorCode.BATCH_NO_NEXT_STATE = 403007; // 批次下一阶段不存在
ErrorCode.BATCH_NO_REPURCHASE = 403008; // 未回款
ErrorCode.BATCH_ALERT_REPURCHASE = 403009; // 已回款
ErrorCode.BATCH_NO_TARGET = 403010; // 批次标的未创建
ErrorCode.BATCH_ALERT_TARGET = 403011; // 批次标的已创建

//推送消息
ErrorCode.aliPush_ErrorParams = 403003 // 参数错误
//活动
ErrorCode.activity_ErrorParams = 403003 //活动信息错误
ErrorCode.activity_Exist = 403003 //活动已存在
ErrorCode.activityNotExist = 403005 //没有找到活动
//产品
ErrorCode.productErrorParams = 403003 //创建产品失败
ErrorCode.productExist = 403004 //产品已存在
ErrorCode.productErrorNotFind = 403005 //产品不存在
ErrorCode.productParams = 403006 //产品信息错误

//品种
ErrorCode.varietyErrorParams = 403003 //参数错误
//卡号信息
ErrorCode.card_ErrorParams = 403003 //银行卡的信息错误
ErrorCode.card_Exist = 403004 //银行卡已经存在

//摄像头信息
ErrorCode.camera_Exist = 403003 //摄像头已经存在
//弹幕消息
ErrorCode.ActivityMsg_ErrorParams = 403003 //参数错误
ErrorCode.ActivityMsg_UnAuth = 401004 //未授权
ErrorCode.ActivityMsg_UnKnowOpenId = 401004 //未获取到openId
ErrorCode.ActivityMsg_UnSupportEnv = 501003 //不支持

// 4004xx 批次错误信息
ErrorCode.InvalidBatchId = 400401; // 无效的批次ID


// 4005xx 订单错误信息
ErrorCode.CreateOrderFail = 400501; // 下单失败
ErrorCode.OrderLimitBatchOrderNum = 400502; // 每期订单限制
ErrorCode.OrderLimitBatchSheepNum = 400503; // 每期够羊数量限制
ErrorCode.NoMoreSheep = 400504; // 羊只数量不足

//保险模板错误信息
ErrorCode.insuranceTemplateNotFind = 400601; // 下单失败


ErrorCode.ErrorParams = 403003 //参数错误
ErrorCode.ErrorServer = 403004;//服务器错误
module.exports = ErrorCode;
