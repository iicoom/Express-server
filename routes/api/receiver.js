/**
 * Created by mxj on 2018/9/7.
 */
var express = require('express');
var router = express.Router();
var q = require('q');
// var orderService = require('../../service/order');
var receiverService = require('../../service/receiver');
var util = require('../../util/index');
var constant = require('../../util/constant');
var RoleType = constant.RoleType;
var ErrorCode = util.errorCode;
var ranchUtil = util.ranchUtil;
var auth = require('../../service/auth');
var log = require('../../libs/log');
// var logger = log.getLogger();
var logger = log.getLogger('receiver');


// 2018-09-10至2018-09-14投资统计 领取节日礼品
router.post('/', auth.loginRequire(RoleType.User), function (req, res) {
  var userInfo = req.session.userInfo;
  var uid = userInfo._id || userInfo.id;
  var receiver = {};
  receiver.receiver_name = req.body.receiver_name;
  receiver.receiver_mobile = req.body.receiver_mobile;
  receiver.receiver_address = req.body.receiver_address;

  var errorMsg;
  errorMsg || receiver.receiver_name || (errorMsg = "收货人姓名不能为空");
  errorMsg || receiver.receiver_mobile || (errorMsg = "收货人联系方式不能为空");
  errorMsg || receiver.receiver_address || (errorMsg = "收货人地址不能为空");
  if(errorMsg){
    return ranchUtil.doResult(res,ranchUtil.generateErr(ErrorCode.User_ErrorParams,errorMsg));
  }

  receiver.username = userInfo.username;
  receiver.nickname = userInfo.nickname;
  receiver.mobile = userInfo.mobile;
  receiver.create_time = new Date().getTime();

  // 统计2018-09-10至2018-09-14后 用户是否有单笔金额大于等于10000RMB的订单（有则具备填写礼品申请表的资格）
  var query = {
    finish_time:{ $gt: new Date('2018-09-10 00:00:00').getTime(), $lt: new Date('2018-09-14 23:59:59').getTime() },
    amount: { $gte: 10000 },
    user_id: uid
  };
  var error;
  var result = {};
  var nowtime = ranchUtil.getNowTime();
  var start = new Date('2018-09-12 00:00:00').getTime();
  var end = new Date('2018-09-17 10:00:00').getTime();
  // 只能在规定活动时间内填写
  if ((nowtime > start) && (nowtime < end)) {
    // 1. 验证当前用户是否有资格 2. 验证用户是否已领取过
    q.nfcall(orderService.count, query)
    .then(function (count) {
      console.log('user_id: '+ uid +' count: '+ count);
      if(count == 0){
        ranchUtil.doResult(res,ranchUtil.generateErr(ErrorCode.User_ErrorParams,'您不符合活动参与条件'));
      }else{
        q.nfcall(receiverService.findOne, { mobile: userInfo.mobile })
        .then(function (exist) {
          console.log('exist', exist);
          if (exist) {
            return ranchUtil.doResult(res,ranchUtil.generateErr(ErrorCode.User_ErrorParams,'您已经填写过领取信息了'));
          } else {
            return q.nfcall(receiverService.create, receiver)
            .then(function (res) {
              console.log('res:', res);
              result = res;
            })
            .then(function () {
              ranchUtil.doResult(res,error,result);
            });
          }
        });
      }
    })
    .catch(function (e) {
      error = e;
    });
  } else {
    ranchUtil.doResult(res,ranchUtil.generateErr(ErrorCode.User_ErrorParams,'请于2018-09-12至2018-09-17 上午10点前填写！'));
  }

});

router.get('/', /*auth.loginRequire(RoleType.Administor),*/ function(req, res) {
  logger.info('come into get router...');
  logger.debug('come into get router...i am debug');
  logger.fatal('come into get router...i am fatal');
  var skip = req.query.skip || 0;
  var limit = req.query.limit || 10;
  var query = {};
  var result = {};
  var error;

  req.query.mobile && (query.mobile = req.query.mobile);
  req.query.receiver_mobile && (query.receiver_mobile = req.query.receiver_mobile);

  var opt = {
    skip: skip,
    limit: limit,
    sort: {
      create_time: -1
    }
  };

  q.nfcall(receiverService.findList, query, opt)
  .then(function(list) {
    result.data = list;
    return q.nfcall(receiverService.count, query);
  })
  .then(function (count) {
    result.total_count = count;
  })
  .catch(function(e){
    error = e;
  })
  .finally(function(){
    ranchUtil.doResult(res,error,result);
  });
});

// 详情
router.get('/:id', auth.loginRequire(RoleType.Administor), function(req, res) {
  var receiver_id = req.params.id;
  var result = {};
  var error;

  q.nfcall(receiverService.findById, receiver_id)
  .then(function(detail) {
    result = detail;
  })
  .catch(function(e){
    error = e;
  })
  .finally(function(){
    ranchUtil.doResult(res,error,result);
  });
});

router.put('/:id', auth.loginRequire(RoleType.Administor), function(req, res) {
  var receiver_id = req.params.id;
  var other_info = req.body.other_info;
  var receiver_name = req.body.receiver_name;
  var receiver_mobile = req.body.receiver_mobile;
  var receiver_address = req.body.receiver_address;
  var updateInfo = {};
  var result = {};
  var error;

  receiver_name && (updateInfo.receiver_name = receiver_name);
  receiver_mobile && (updateInfo.receiver_mobile = receiver_mobile);
  receiver_address && (updateInfo.receiver_address = receiver_address);
  if (other_info || other_info === '') {
    updateInfo.other_info = other_info;
  }

  q.nfcall(receiverService.findById, receiver_id)
    .then(function(receiverInfo) {
      if (receiverInfo) {
        q.nfcall(receiverService.findByIdAndUpdate, receiver_id, updateInfo)
          .then(function () {
            result = { message: '更新成功'};
            ranchUtil.doResult(res,error,result);
          });
      } else {
        ranchUtil.doResult(res,ranchUtil.generateErr(ErrorCode.User_ErrorParams, '信息不存在'));
      }
    })
    .catch(function(e){
      error = e;
    });
});

module.exports = router;
