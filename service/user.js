'use strict';

var Q = require('q');
var util = require('../util');
var tools = util.tools;
var User = require('../models').User;
var ranchUtil = util.ranchUtil;
var ErrorCode = util.errorCode;
var constant = require('../util/constant');
var RoleType = constant.RoleType;
var ProjectNameError = require('../util/error');

User.qCreate = Q.nbind(User.create, User);
User.qFindOne = Q.nbind(User.findOne, User);
User.qFind = Q.nbind(User.find, User);
User.qUpdate = Q.nbind(User.update, User);

var log = require('../libs/log');
var logger = log.getLogger('out');

/**
 * 添加用户
 * @param userInfo
 * @param cb
 */
exports.addUser = function(userInfo, cb) {
    logger.info('service-user.addUser');
    // 回调函数的写法
    // var error = null;
    // User.findOne({ mobile: userInfo.mobile, role_type: RoleType.User}, function (err, result) {
    //   logger.info('User.findOne', result);
    //   if (result) {
    //     error = new ProjectNameError(ErrorCode.User_Rgister_Already_Exist,'该手机号已经注册过啦！');
    //     cb(error, result);
    //   } else {
    //     User.create(userInfo, cb)
    //   }
    // })

    // Q Promise的写法
    User.qCreate(userInfo)
        .then(function(userInfo) {
            // AccountService.initAccount(userInfo._id.toHexString());
            // JiFenService.initJiFen(userInfo._id.toHexString());
            cb && cb(null, userInfo);
        }).catch(function(err) {
            cb && cb(err);
        })
    };

/**
 * 认证用户信息
 * @param loginName
 * @param password
 * @param cb
 */
exports.authUserInfo = function(mobile, password, role_type, cb) {
    logger.info('user.authUserInfo');
    User.qFindOne({
            mobile: mobile,
            //role_type: role_type
        })
        .then(function(userInfo) {
            var err = null;
            if (userInfo) {
                var passwordHash = tools.sha256(password + userInfo.salt);
                if(userInfo.password !== passwordHash) {
                    return Q.reject(ranchUtil.generateErr(ErrorCode.User_ErrorAuth,'密码错误！'));
                }
            }
            cb && cb(err, userInfo);
        }).catch(function(err) {
            cb && cb(err);
        })
};

//用户登录初始化
exports.userLoginInit = function(session, user_id, cb) {
    logger.info('service-user.userLoginInit');
    // var wxUserService = require("./wxuser");
    // var fileService = require("./db_file");
    var wxOpenId = session.wx_openid;
    var qUpdateUserInfo = Q.nbind(exports.updateUserInfo);
    // var qLoadWxUserInfo = Q.nbind(wxUserService.findWxUserInfo);
    // var qLoadFileFromUrl = Q.nbind(fileService.loadFileFromUrl);
    var qGetUserInfoById = Q.nbind(exports.getUserInfo);
    var result;
    var error;
    qGetUserInfoById(user_id)
        .then(function(userInfo) {
            var roleType = userInfo.role_type;
            //如果是普通用户更新有关微信的相关用户信息；不是就直接resolve(userInfo)
            if (roleType === constant.RoleType.User) {
                if (wxOpenId) {
                    return qUpdateUserInfo({
                            wxopenid: wxOpenId
                        }, {
                            $set: {
                                is_bindwx: false
                            }
                        })
                        .then(function() {
                            return qUpdateUserInfo({
                                _id: user_id
                            }, {
                                $set: {
                                    wxopenid: wxOpenId,
                                    is_bindwx: true
                                }
                            })
                        })
                        .then(function() {
                            if (!userInfo.portrait_id || !userInfo.nickname) {
                                var wxUserInfoScope;
                                var updateInfo = {};
                                return qLoadWxUserInfo(wxOpenId)
                                    .then(function(wxUserInfo) {
                                        wxUserInfoScope = wxUserInfo;
                                        if (!userInfo.portrait_id && wxUserInfo && wxUserInfo.headimgurl) {
                                            return qLoadFileFromUrl(wxUserInfo.headimgurl)
                                                .then(function(fileId) {
                                                    updateInfo.portrait_id = fileId;
                                                })
                                        } else {
                                            return q.resolve();
                                        }
                                    }).then(function() {
                                        if (!userInfo.nickname) {
                                            updateInfo.nickname = wxUserInfoScope.nickname;
                                        }
                                        return q.resolve();
                                    }).then(function() {
                                        updateInfo.wxopenid = wxOpenId;
                                        return qUpdateUserInfo({
                                            _id: userInfo._id.toString()
                                        }, {
                                            $set: updateInfo
                                        });
                                    })
                            } else {
                                return qUpdateUserInfo({
                                    _id: userInfo._id.toString()
                                }, {
                                    $set: {
                                        wxopenid: wxOpenId
                                    }
                                });
                            }
                        }).then(function() {
                            return qGetUserInfoById(user_id);
                        })
                } else {
                    if (!userInfo.nickname) {
                        var nickname = userInfo.mobile.substr(0, 3) + '****' + userInfo.mobile.substring(7);
                        userInfo.nickname = nickname;
                        return qUpdateUserInfo({
                                _id: userInfo._id.toString()
                            }, {
                                $set: {
                                    nickname: nickname
                                }
                            })
                            .then(function() {
                                return qGetUserInfoById(userInfo._id.toString());
                            });
                    } else {
                        return Q.resolve(userInfo);
                    }
                }
            } else {
                return Q.resolve(userInfo);
            }
        }).then(function(userInfo) {
            // session.userInfo = ranchUtil.deleteModelInfo(userInfo);
            result = userInfo;
        }).catch(function(err) {
            error = err;
        }).finally(function() {
            cb && cb(error, result);
        });
};

/*查询用户列表*/
exports.searchUserList = function (condition, cb) {
    console.log('user.searchUserList');
    User.qFind(condition)
        .then(function(user){
            cb && cb(null, user);
        }).catch(function(err) {
            cb && cb(err);
        })
};

/**
 * 查询用户详情
 * @param _id
 * @param cb
 */
exports.getUserInfo = function(_id, cb) {
    logger.info('service-user.getUserInfo');
    User.qFindOne({
            _id: _id
        })
        .then(function(user) {
            cb && cb(null, user);
        }).catch(function(err) {
            cb && cb(err);
        })
};

/**
 * 根据手机号查询用户
 * @param  {[type]}   mobile [description]
 * @param  {Function} cb     [description]
 * @return {[type]}          [description]
 */
exports.findUserByMobile = function(mobile, cb) {
    logger.info('service-user.findUserByMobile');
    User.findOne({
        mobile: mobile
    }, cb);
};

/**
 * 更新用户信息
 * @param condition
 * @param userInfo
 * @param cb
 */
exports.updateUserInfo = function(condition, userInfo, cb) {
    console.log('user.updateUserInfo');
    User.qUpdate(condition, userInfo, {
            multi: true
        })
        .then(function(result) {
            cb && cb(null, result);
        })
        .catch(function(err) {
            cb && cb(err);
        })
};

module.exports = exports;

