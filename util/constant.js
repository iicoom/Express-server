/**
 * Created by mxj on 2018/9/8.
 */
module.exports = Object.freeze({

  // 验证码类型
  CaptchaType: {
    SMS: 'SMS', // 短信
    VoiceCode: 'VoiceCode' // 语音
  },

  // 用户角色
  RoleType: {
    Administor: 1,
    User: 2
  },

  // 订单状态
  OrderState: {
    NoPay: 1, //未支付
    Payed: 2, //已支付/未领取
    Finish: 5, //已完成
    Cancel: 6 //已取消
  }
});