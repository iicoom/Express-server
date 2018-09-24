/**
 * Created by mxj on 2018/9/18.
 */
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// 礼品领取登记表(猪5天记录表)
var fiveDayPig = new Schema({
  user_id: {type: String},
  five_day: {type: Number},
  sequence: {type: Number}
});

mongoose.model('FiveDayPig', fiveDayPig);
