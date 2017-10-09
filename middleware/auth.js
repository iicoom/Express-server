var util = require('../util');
var ranchUtil = util.ranchUtil;
var ErrorCode = util.errorCode;

module.exports = exports;

exports.loginRequired = function(roleType) {
	return function(req,res,next){
		if (req.session && req.session.userInfo && req.session.userInfo._id) {
			if (roleType) {
				if (!Array.isArray(roleType)) {
					roleType = [roleType];
				}
			}
			//如果session中的role_type在传进来的roleType数组中
			if (roleType.indexOf(req.session.userInfo.role_type) !== -1) {
				next();
			} else {
				delete req.session.userInfo;
	            ranchUtil.doResult(res, ranchUtil.generateErr(ErrorCode.User_ErrorUnAuth, "访问未授权接口"));
			}
		} else {
			ranchUtil.doResult(res, ranchUtil.generateErr(ErrorCode.User_ErrorUnAuth, "必须登录才能访问"));
		}
	}
}