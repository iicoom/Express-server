/**
 * Created by mxj on 2018/9/23.
 */
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var orderStat = require('../util/constant').OrderState;

// 订单表
var OrderSchema = new Schema({
  order_code: {
    type: String,
    unique: true
  }, // 订单号
  sheep_num: Number, // 购买羊只数量
  user_id: String, // 用户id 购买者
  merchant_id: String, // 商户ID
  type: Number, // 订单类型 1：普通订单 2：赠送订单 3：回购订单
  amount: Number, //金额
  from: String, // 来自订单（延续订单使用）
  good_ids: Array, //商品Id
  state: {
    type: Number,
    default: orderStat.NoPay
  }, //订单状态1：未支付 2：已支付/未领取 5：已完成 6：已取消
  cancel_reason: String, //取消原因描述
  pay_infos: Array, //支付信息
  paymendMethod: Object, // 支付方式
  batch_id: String, //购买期数记录_id
  finish_time: Number, //完成时间
  pay_time: Number, //支付完成时间
  other_info: Object, //订单其他信息（赠送订单：接收人电话，接收人姓名）
  is_hide: { type: Boolean, default: false }, // 是否隐藏
  refund_state: String, // 退款订单退款状态
  create_time: {
    type: Date,
    default: Date.now
  },
  update_time: {
    type: Date,
    default: Date.now
  }
});


OrderSchema.set('toJSON', {
  virtuals: true,
  transform: function(doc, ret) {
    delete ret.__v;
    return ret;
  }
});

OrderSchema.virtual('id')
.get(function() {
  if (typeof this._id == 'object')
    return this._id.toHexString();
  return this._id;
});


mongoose.model('Order', OrderSchema);
