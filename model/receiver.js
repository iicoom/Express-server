
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// 礼品领取登记表
var receiver = new Schema({
  activity_name: {type:String},
  activity_id: {type:String},
  nickname: {type:String},
  username: {type:String},
  mobile: {type:String, unique: true, required: true, comment: '用户手机号'},
  receiver_name: {type:String},// 礼品收货人名称
  receiver_mobile: {type:String},// 礼品收货人联系方式
  receiver_address: {type:String},// 礼品收货人联系方式
  count: {type:Number}, // 可领取礼品件数
  other_info: {type:String},// 物流单号等备注信息
  create_time: {
    type: Date,
    default: Date.now
  },
  update_time: {
    type: Date,
    default: Date.now
  }
});

receiver.set('toJSON', {
  getters: true,
  virtuals: true,
  transform: function ( doc, ret ) {
    delete ret._id;
    delete ret.__v;
    return ret;
  }
});

mongoose.model('Receiver', receiver);
