var util = require('../util');
var ranchUtil = util.ranchUtil;
var ErrorCode = util.errorCode;

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
                ranchUtil.doResult(res,ranchUtil.generateErr(ErrorCode.Permission_Deny,'权限不足，请联系管理员添加权限'));
            }
        }else{
            ranchUtil.doResult(res,ranchUtil.generateErr(ErrorCode.User_ErrorUnAuth,'必须登录才能访问'));
        }
    }
};

/**
 * 登录验证、角色验证
 * @param roleType
 * @returns {Function}
 */
exports.loginRequire = function(roleType) {
    return function(req, res, next) {
        // 先判断session中有没有用户登录信息
        console.log('【session】\n', req.session);
        if (req.session && req.session.userInfo && req.session.userInfo.id) {
            // session有userInfo进行角色验证
            if (roleType) {
                // 传入的不是数组
                if (!Array.isArray(roleType)) {
                    roleType = [roleType];
                }
                // 传入的数组length为0(即 任何权限均可) || session中的userInfo.role_type 在传入的roleType
                if (roleType.length === 0 || roleType.indexOf(req.session.userInfo.role_type) !== -1) {
                    next();
                } else {
                    delete req.session.userInfo;
                    ranchUtil.doResult(res, ranchUtil.generateErr(ErrorCode.User_ErrorUnAuth, '访问未授权接口'));
                }
            } else {
                next();
            }
        } else {
            ranchUtil.doResult(res, ranchUtil.generateErr(ErrorCode.User_ErrorUnAuth, '必须登录才能访问'));
        }
    };
};


//限制请求次数
exports.requestLimit = function(){
    console.log('【auth.requestLimit】');
    return function(req,res,next) {
        var last_time = req.query.last_time;
        if ((req.method == 'POST') || (req.method == 'PUT')) {
            if (!last_time) {
                ranchUtil.doResult(res, ranchUtil.generateErr(ErrorCode.Request_LastTimeNotFind, '参数错误'));
            } else {
                if (!req.session.userInfo.last_time) {
                    req.session.userInfo.last_time = last_time;
                    next();
                } else {
                    if (last_time > req.session.userInfo.last_time) {
                        req.session.userInfo.last_time = last_time;
                        next();
                    } else {
                        ranchUtil.doResult(res, ranchUtil.generateErr(ErrorCode.User_ErrorRequestLimit,
                          '访问太频繁了，请稍后再试o_o'));
                    }
                }
            }
        } else {
           next();
        }
    }
};
