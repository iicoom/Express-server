var express = require('express');
var router = express.Router();

var util = require('../../util');
var ranchUtil = util.ranchUtil;
var ErrorCode = util.errorCode;

var q = require("q");
var userService = require("../../service/user");

/**
 * 登录
 */
router.post("/login", function (req, res) {

    var role_type = req.body.role_type;
    var loginname = req.body.loginname;
    var password = req.body.password;

    var errorMsg;
    errorMsg || loginname || (errorMsg = "用户名不能为空");
    errorMsg || ranchUtil.testPhone(loginname) || (errorMsg = "手机号格式不正确");
    errorMsg || password || (errorMsg = "密码不能为空");
    if (errorMsg) {
        return ranchUtil.doResult(res, ranchUtil.generateErr(ErrorCode.User_ErrorParams, errorMsg));
    }

    var error, result;
    var qAuthUserInfo = q.nbind(userService.authUserInfo);
    var qUserLoginInit = q.nbind(userService.userLoginInit);

    qAuthUserInfo(loginname, password, role_type)
        .then(function (userInfo) {
            console.log(userInfo)
            if (userInfo) {
                return qUserLoginInit(req.session, userInfo._id.toString())
                    .then(function (userInfo) {
                        //suserInfo = ranchUtil.deleteModelInfo(userInfo);
                        //console.dir(req.session);

                        userInfo.accessToken = req.sessionID || req.session.sessionID;
                        return q.resolve(userInfo);
                    })
            } else {
                return q.reject(ranchUtil.generateErr(ErrorCode.User_ErrorAuth, "用户名或密码不正确"));
            }
        }).then(function (userInfo) {
            result = userInfo;
        }).catch(function (err) {
            error = err;
        }).finally(function () {
            ranchUtil.doResult(res, error, result);
        });
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
            delete req.session.userInfo;
        })
        .catch(function (err) {
            error = err;
        }).finally(function () {
            ranchUtil.doResult(res, error, {msg: "您已退出登录"});
        });
});

module.exports = router;

