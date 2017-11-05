var express = require('express');
var router = express.Router();

var util = require('../../util');
var ranchUtil = util.ranchUtil;
var ErrorCode = util.errorCode;
var tools = util.tools;
var noop = tools.noop;
var YunFarmError = require('../../util/error');
var config = require('../../config');

var q = require("q");
var _ = require('lodash');
var RedisService = require('../../service/redis');
var rc = RedisService.rc;
var userService = require("../../service/user");

/**
 * 登录
 */
router.post("/login", function (req, res) {

    var mobile = req.body.mobile;
    var password = req.body.password;
    var role_type = req.body.role_type;

    var errorMsg;
    errorMsg || mobile || (errorMsg = "用户名不能为空");
    errorMsg || ranchUtil.testPhone(mobile) || (errorMsg = "手机号格式不正确");
    errorMsg || password || (errorMsg = "密码不能为空");
    if (errorMsg) {
        return ranchUtil.doResult(res, ranchUtil.generateErr(ErrorCode.User_ErrorParams, errorMsg));
    }

    //var client_ip = ranchUtil.getClientIP(req);
    req.session['user-agent']=req.headers['user-agent'];
    var ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
    req.session.ip=ip;

    var error, result;
    var qAuthUserInfo = q.nbind(userService.authUserInfo);
    var qUserLoginInit = q.nbind(userService.userLoginInit);

    //查询条件为loginname，role_type
    qAuthUserInfo(mobile, password, role_type)
        .then(function (userInfo) {
            console.log(userInfo)
            if (userInfo) {
                return qUserLoginInit(req.session, userInfo._id.toString())
                    .then(function (userInfo) {
                        //suserInfo = ranchUtil.deleteModelInfo(userInfo);
                        //console.dir(req.session);

                        return q.resolve(userInfo);
                    })
            } else {
                return q.reject(ranchUtil.generateErr(ErrorCode.User_ErrorAuth, "用户名或密码不正确"));
            }
        }).then(function (userInfo) {
            var deferred = q.defer();
            result = userInfo;
            result.accessToken = req.sessionID || req.session.sessionID;//返回的result里竟然拿不到这个
            deferred.resolve(result);
            return deferred.promise;
        }).catch(function (err) {
            error = err;
        }).finally(function () {
            ranchUtil.doResult(res, error, result);
        });
})

/*登录 带密码错误拦截的*/
router.post("/signin", function(req, res){
    var mobile = req.body.mobile;
    var password = req.body.password;
    var now = _.now();
    var client_ip = ranchUtil.getClientIP(req);
    var error,result;

    var errorMsg;
    errorMsg || mobile || (errorMsg = "用户名不能为空");
    errorMsg || ranchUtil.testPhone(mobile) || (errorMsg = "手机号格式不正确");
    errorMsg || password || (errorMsg = "密码不能为空");
    if (errorMsg) {
        return ranchUtil.doResult(res, ranchUtil.generateErr(ErrorCode.User_ErrorParams, errorMsg));
    }

    q.nfcall(RedisService.get, mobile + '-login-limit')
        .then(function (limit) {
            if (limit) {
                var m = Math.ceil(((10 * 60 * 1000 + parseInt(limit)) - now) / (60 * 1000));
                throw new YunFarmError('', '账户冻结，请再' + m + '分钟后再试。')
            }
            return q.nfcall(RedisService.get, mobile + '-login-fail');
        })
        .then(function (count) {
            if (count && count > 8) {
                console.log(count)
                rc.multi()
                    .del(mobile + '-login-fail') // 失败次数
                    .set(mobile + '-login-limit', now) // 登陆限制
                    .expire(mobile + '-login-limit', 10 * 60) // 有效期10分钟
                    .exec(noop);

                throw new YunFarmError('', '密码错误，10分钟后再试。');
            }
            return q.nfcall(userService.findUserByMobile, mobile);
        })
        .then(function (user) {
             // 用户不存在
            if (!user) throw new YunFarmError('1009', '用户名或密码错误。');
            var passhash = tools.sha256(password + user.salt);
            // 密码错误
            if (user.password !== passhash) {
                // 记录失败次数
                rc.incr(mobile + '-login-fail');
                throw new YunFarmError('1009', '用户名或密码错误。');
            } else {
                rc.del(mobile + '-login-fail');
            }

            // 用户被禁用
            if (!!user.disabled) throw new YunFarmError('1010', '账号已冻结。');
            if (!!user.unsubscribe) throw new YunFarmError('', '账号已注销。');

            return q.resolve(user);
        })
        .then(function (user){
            var deferred = q.defer();
            deferred.resolve(user);
            return deferred.promise;
        })
        .catch(function(error){
            console.error(error);
            
        })
        .then(function (user) {
            //添加session
            req.session.userInfo = user;
            
            var token = req.sessionID;
            res.json({
                token: token,
                expire: config.cookie_max_age,
                need_upgrade: user.need_upgrade && (!user.is_real_name || !user.is_set_pay_password),
                is_activate: user.is_activate,
                is_real_name: user.is_real_name,
                is_binding_verify: user.is_binding_verify,
                is_set_pay_password: user.is_set_pay_password
            })
        })

})


/**
 * 登出
 */
router.delete("/logout", function (req, res) {

    var error;
    var openid = req.session.wx_openid;
    var userId = req.session.userInfo && req.session.userInfo._id.toString();
    var qUpdateUserInfo = q.nbind(userService.updateUserInfo);
    var deleteOpenIdInfo = function () {
        if (openid) {
            return qUpdateUserInfo({_id:userId,wxopenid: openid}, {$set: {is_bindwx: false}});
        } else {
            return q.resolve();
        }
    };
    deleteOpenIdInfo()
        .then(function () {
            //delete req.session.userInfo;
            req.session.destroy();
            res.clearCookie('token', {
                path: '/'
            });
        })
        .catch(function (err) {
            error = err;
        }).finally(function () {
            ranchUtil.doResult(res, error, {msg: "您已退出登录"});
        });
});

module.exports = router;

