
var util = require('../util');
var ranchUtil = util.ranchUtil;
var ErrorCode = util.errorCode;
var constant = util.constant;
var _ = require('lodash');
var YunFarmError = require('../util/error');


module.exports = exports;
exports.permissionRequire = function(permission){
    console.log('auth.permissionRequire');
    return function(req,res,next){
        if(req.session && req.session.userInfo && req.session.userInfo._id)
        {
            if(req.session.permissions && req.session.permissions.indexOf(permission) != -1)
            {
                next();
            }else{
                ranchUtil.doResult(res,ranchUtil.generateErr(ErrorCode.Permission_Deny,"权限不足，请联系管理员添加权限"));
            }
        }else{
            ranchUtil.doResult(res,ranchUtil.generateErr(ErrorCode.User_ErrorUnAuth,"必须登录才能访问"));
        }
    }
}


exports.loginRequire = function(roleType) {
    return function(req, res, next) {

        if (req.session && req.session.userInfo && req.session.userInfo._id) {

            if (roleType) {
                if (!Array.isArray(roleType)) {
                    roleType = [roleType];
                }
                if (roleType.length == 0 || roleType.indexOf(req.session.userInfo.role_type) != -1) {
                    next();
                } else {
                    delete req.session.userInfo;
                    ranchUtil.doResult(res, ranchUtil.generateErr(ErrorCode.User_ErrorUnAuth, "访问未授权接口"));
                }
            } else {
                next();
            }
        }
        else if(!roleType || (roleType && roleType === constant.RoleType.User ) ||
            (Array.isArray(roleType) && _.indexOf(roleType,constant.RoleType.User) !== -1 )){
            ranchUtil.doResult(res, ranchUtil.generateErr(ErrorCode.User_ErrorUnAuth, "请您先登录！"));
        }
        else {
            ranchUtil.doResult(res, ranchUtil.generateErr(ErrorCode.User_ErrorUnAuth, "必须登录才能访问"));
        }
    };
}


//限制请求次数
exports.requestLimit = function(){
    console.log('auth.requestLimit');
    return function(req,res,next) {
        var last_time = req.query.last_time;
        //if ((req.method == 'POST') || (req.method == 'PUT')) {
            if (!last_time) {
                ranchUtil.doResult(res, ranchUtil.generateErr(ErrorCode.Request_LastTimeNotFind, "参数错误"));
            } else {
                if (!req.session.userInfo.last_time) {
                    req.session.userInfo.last_time = last_time;
                    next();
                } else {
                    if (last_time > req.session.userInfo.last_time) {
                        req.session.userInfo.last_time = last_time;
                        next();
                    } else {
                        ranchUtil.doResult(res, ranchUtil.generateErr(ErrorCode.User_ErrorRequestLimit, "访问次数超过限制，请稍后再试"));
                    }
                }
            }
        //} else {
        //    next();
        //}
    }
};
