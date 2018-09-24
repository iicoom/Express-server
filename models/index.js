/**
 * Created by mxj on 2018/9/23.
 */
var mongoose = require('mongoose');
var config = require('../config');
var Sequelize = require('sequelize');

require('./order');
require('./user');
require('./msg');
require('./receiver');
require('./fiveDaysPig');

exports.User = mongoose.model('User');
exports.Msg = mongoose.model('Msg');
exports.Order = mongoose.model('Order');
exports.Receiver = mongoose.model('Receiver');
exports.FiveDayPig = mongoose.model('FiveDayPig');

//
// var memberDB = config.member_db;
// var sequelize = new Sequelize(memberDB.db, memberDB.user, memberDB.passwd, {
//   host: memberDB.host,
//   port: memberDB.port || 3306,
//   dialect: 'mysql',
//   pool: {
//     max: 30,
//     min: 5,
//     idle: 10000
//   },
//   logging: false,
//   timezone: '+08:00'
// });
//
// var beforeDayMember = require('./before_day_member')(sequelize);
//
// exports.sequelize = sequelize;
// exports.BeforeDayMember = beforeDayMember;
