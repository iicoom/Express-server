'use strict'

var ErrorCode = require("./errorCode");
var _ = require('lodash')
module.exports = exports;


exports.Collection_Num = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];
exports.Collection_Alpha = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];
exports.Collection_LowerAlpha = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'];

/*随机数生成*/
exports.generateRandom = function(n, collection) {
    var res = "";
    for (var i = 0; i < n; i++) {
        var id = Math.ceil(Math.random() * (collection.length - 1));
        res += collection[id];
    }
    return res;
}



/*抛出错误信息*/
exports.generateErr = function(errcode, errmsg) {
	var errObject = new ResultError(errcode, errmsg);
	return errObject;
}


/**
 * 结果层错误
 * @type {ResultError}
 */
var ResultError = exports.ResultError = function(errcode, errmsg) {
    this.errcode = errcode;
    this.errmsg = errmsg;
}
ResultError.prototype.toString = function() {
    return this.errmsg;
}

/*输出结果函数*/
exports.doResult = function(res, error, body) {
  if (error) {
    console.log('--------------返回错误--------------');
    console.dir(error);
    if (isResultError(error)) {
    	console.log('e instanceof ResultError')

    } else if (isInternalError(error)) {
      error = new ResultError(ErrorCode.UnKnow_Error, error.errmsg);
    } else if (isUserDefinedError(error)) {
      var message = Messages[error.code];
      res.status((message && message.status_code) || 400);
      return res.json({
        name: error.name,
        errmsg: error.message,
        errcode: error.code,
        cause: error.cause
      });
    } else {
      error = new ResultError(ErrorCode.UnKnow_Error, "服务器错误");
    }
    var errCode = error.errcode;
    //console.log('errcode: ' + error.errcode);
    var httpStatus = parseInt((errCode + "").substr(0, 3));
    console.log('-------------------');
    console.log(error);
    res.status(httpStatus).json(error);
  } else {
    var httpStatus = parseInt((ErrorCode.Success + "").substr(0, 3))
    // console.log(body)
    res.status(httpStatus).json(body);
  }
}

/***************************错误处理************************************/
/**
 * 处理层错误
 * @type {InternalError}
 */
var InternalError = exports.InternalError = function(errcode, errmsg) {
    this.errcode = errcode;
    this.errmsg = errmsg;
}
InternalError.prototype.toString = function() {
    return this.errmsg;
}

/**
 * 检测是否为结果错误
 */
var isResultError = exports.isResultError = function(e) {
    return e instanceof ResultError;
}

/**
 * 检测是否为service层错误
 * @param e
 */
var isInternalError = exports.isInternalError = function(e) {
    return e instanceof InternalError;
}

// 校验是不是自定义异常错误
var isUserDefinedError = exports.isUserDefinedError = function(e) {
    return (e instanceof Error && (e.name === 'WeiboPayError' || e.name === 'YunFarmError'));
}
/***************************************************************************/

/*验证手机号格式*/
exports.testPhone = function(phone) {

    var regexPhone = /^0?(1[34578])[0-9]{9}$/;
    return phone && regexPhone.test(phone);
}

/**
 * 删除
 * @param model
 * @returns {*}
 */
exports.deleteModelInfo = function(model) {
    //var json = JSON.stringify(model);
    //return JSON.parse(json);
    return model.toObject();
}

/**
 * 获取客户端ip
 * @param req
 * @returns {*|string}
 */
exports.getClientIP = function(req) {
    return req.headers['x-real-ip'] || req.headers['X-Real-Ip'] ||req.headers['X-Forwarded-For'] || req.headers['x-forwarded-for'] || req.ip;
};

/**
 * 获取当前时间
 */
exports.getNowTime = function(){
    var now = _.now();
    return now;
}