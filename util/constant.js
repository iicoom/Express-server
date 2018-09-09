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
  },

  // 随机数生成集
  CollectionNum: ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'],
  CollectionAlpha: ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L',
                    'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'],
  CollectionLowerAlpha: ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l',
                        'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'],

});