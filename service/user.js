'use strict'

var q = require("q");
var User = require("../model/user");
User.qCreate = q.nbind(User.create, User);
User.qFind = q.nbind(User.findOne, User);
User.qUpdate = q.nbind(User.update, User);


/**
 * 添加用户
 * @param userInfo
 * @param cb
 */
exports.addUser = function(userInfo, cb) {
    console.log('user.addUser');
    User.qCreate(userInfo)
        .then(function(userInfo) {
            // AccountService.initAccount(userInfo._id.toHexString());
            // JiFenService.initJiFen(userInfo._id.toHexString());

            cb && cb(null, userInfo);
        }).catch(function(err) {
            cb && cb(err);
        })
}

/**
 * 认证用户信息
 * @param loginName
 * @param password
 * @param cb
 */
exports.authUserInfo = function(loginName, password, role_type, cb) {
    console.log('user.authUserInfo');
    User.qFind({
            mobile: loginName,
            role_type: role_type
        })
        .then(function(userInfo) {
            var err = null;
            if (userInfo) {
                //var passwordHash = sha256(password + userInfo.salt);
                if(userInfo.password !== password) {
                  userInfo = null;
                }
            }
            cb && cb(err, userInfo);
        }).catch(function(err) {
            cb && cb(err);
        })
}

//用户登录初始化
exports.userLoginInit = function(session, user_id, cb) {
    console.log('user.userLoginInit');
    // var wxUserService = require("./wxuser");
    // var fileService = require("./db_file");
    var wxOpenId = session.wx_openid;
    var qUpdateUserInfo = q.nbind(exports.updateUserInfo);
    // var qLoadWxUserInfo = q.nbind(wxUserService.findWxUserInfo);
    // var qLoadFileFromUrl = q.nbind(fileService.loadFileFromUrl);
    var qGetUserInfoById = q.nbind(exports.getUserInfo);
    var userInfo = {};
    var result;
    var error;
    qGetUserInfoById(user_id)
        .then(function(userInfo) {
            var roleType = userInfo.role_type;
            //如果是普通用户更新有关微信的相关用户信息；不是就直接resolve(userInfo)
            if (roleType === 1) {
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
                        var nickname = userInfo.mobile.substr(0, 3) + "****" + userInfo.mobile.substring(7);
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
                        return q.resolve(userInfo);
                    }
                }
            } else {
                return q.resolve(userInfo);
            }
        }).then(function(userInfo) {
            //session.userInfo = ranchUtil.deleteModelInfo(userInfo);
            session.userInfo = userInfo;
            result = userInfo;
        }).catch(function(err) {
            error = err;
        }).finally(function() {
            cb && cb(error, result);
        });
}

/**
 * 查询用户详情
 * @param _id
 * @param cb
 */
exports.getUserInfo = function(_id, cb) {
    console.log('user.getUserInfo');
    User.qFind({
            _id: _id
        })
        .then(function(user) {
            cb && cb(null, user);
        }).catch(function(err) {
            cb && cb(err);
        })
}

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
}

module.exports = exports;

