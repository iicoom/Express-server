/**
 * Created by mxj on 2018/9/23.
 */
var express = require('express');
var router = express.Router();
var auth = require('../../middleware/auth');
var constant = require('../../util/constant');
var RoleType = constant.RoleType;
var Q = require('q');

/**
 * 创建订单
 **/
router.post('/', auth.loginRequire(RoleType.User), auth.requestLimit(), function(req, res, next) {
  var user_id = req.session.userInfo._id.toString();
  var sheep_num = req.body.sheep_num;
  var presentInfo;

  var receive_user_name = req.body.receive_user_name;
  var receive_user_mobile = req.body.receive_user_mobile;
  if (receive_user_name && receive_user_mobile) {
    var presentInfo = {
      receive_user_name: receive_user_name,
      receive_user_mobile: receive_user_mobile
    };
    presentInfo.greetings = req.body.greetings;
  }

  var errorMsg;
  errorMsg || ranchUtil.testNumber(sheep_num) || (errorMsg = '羊的数量不正确');
  errorMsg || (sheep_num > 0 && sheep_num <= 30) || (errorMsg = '购买数量只能是1-30只');
  if (errorMsg) {
    return ranchUtil.doResult(res, ranchUtil.generateErr(ErrorCode.VerifyCode_ErrorParams, errorMsg));
  }
  var result;
  var error;

  Q.fcall(batchService.getCurBatchInfo)
  .then(function(batchInfo) {
    if (batchInfo) {
      return Q.fcall(orderService.count, {
        batch_id: batchInfo._id,
        user_id: user_id,
        state: constant.OrderState.NoPay,
        type: {
          $in: [constant.OrderType.Normal, constant.OrderType.NormalPresented]
        }
      });
    } else {
      return q.reject(ranchUtil.generateErr(ErrorCode.BatchErrorNotFind, '没有正在进行的批次'));
    }
  })
  .then(function(count) {
    if (count && count >= 3) {
      return q.reject(ranchUtil.generateErr(ErrorCode.Order_ErrorLimit, '您有未支付的订单，请支付后再购买'));
    } else {
      return Q.fcall(orderService.createNormalOrder, user_id, sheep_num, presentInfo);
    }
  })
  .then(function(orderInfo) {
    result = orderInfo.toObject();

    logger.debug('user[%s] create order [use system message service send] \n', user_id, result);

    if ( result && !_.isEmpty(result.order_code) ) {
      logger.debug('create order message with order code: ', result.order_code);
      sysMsgService.sendCOrderSucMsg(user_id, result.order_code);
    } else {
      logger.debug('create order message without order code: ', result.order_code);
      sysMsgService.sendCOrderSucMsg(user_id, null);
    }
  })
  .catch(function(e) {
    error = e;
  }).finally(function() {
    ranchUtil.doResult(res, error, result);
  })
});

module.exports = router;