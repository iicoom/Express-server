
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// 礼品领取登记表
var receiver = new Schema({
    nickname: {type:String},
    username: {type:String},
    mobile: {type:String},
    receiver_name: {type:String},// 礼品收货人名称
    receiver_mobile: {type:String},// 礼品收货人联系方式
    receiver_address: {type:String},// 礼品收货人联系方式
    other_info: {type:String},// 物流单号等备注信息
    create_time: {type:Number}, // 登记时间
});

mongoose.model('Receiver', receiver);
