var express = require('express');
var router = express.Router();
var auth = require('../../middleware/auth');
var userService = require('../../service/user');
var util = require('../../util');
var ranchUtil = util.ranchUtil;
var ErrorCode = util.errorCode;
var Q = require('q');
var tools = util.tools;
var randomstring = require('randomstring');
var ProjectNameError = require('../../util/error');
var constant = require('../../util/constant');
var log = require('../../libs/log');
var logger = log.getLogger('out');

router.post('/regist',function(req,res,next){
    var mobile = req.body.mobile;
    var password = req.body.password;
    var re_password = req.body.re_password;

    var errorMsg;
    errorMsg || mobile || (errorMsg = '手机号不能为空');
    errorMsg || ranchUtil.testPhone(mobile) || (errorMsg = '手机号格式不正确');
    errorMsg || password || (errorMsg = '密码不能为空');
    errorMsg || re_password || (errorMsg = '确认密码不能为空');
    if (errorMsg) {
        return ranchUtil.doResult(res, ranchUtil.generateErr(ErrorCode.User_ErrorParams, errorMsg));
    }

    if (password !== re_password) {
        return next(new ProjectNameError(ErrorCode.User_Rgister_Pass_Not_Match, '两次密码不一致。'));
    }

    var error;
    var result;
    var userInfo = {};
    var salt = randomstring.generate(24);
    var passhash = tools.sha256(password + salt);
    userInfo.role_type = req.body.role_type || constant.RoleType.User;
    userInfo.mobile = mobile;
    userInfo.password = passhash;
    userInfo.salt = salt;
    logger.info('routes-userInfo:\n', userInfo);
    // 回调函数的写法
    // userService.addUser(userInfo, function (err, result) {
    //     logger.info('userInfo:\n', result);
    //     if (err) {
    //       error  = err;
    //     }
    //     ranchUtil.doResult(res, error, result);
    // })

    // Q Promise的写法
    var qAddUser = Q.nbind(userService.addUser, userService);
    var qFindUser = Q.nbind(userService.findUserByMobile, userService);
    var qUserLoginInit = Q.nbind(userService.userLoginInit);

    qFindUser(userInfo.mobile)
        .then(function (doc) {
          if(doc){
            return Q.reject(ranchUtil.generateErr(ErrorCode.User_ErrorParams, '该手机号已经注册过啦！'));
          }else{
            return qAddUser(userInfo);
          }
        })
        .then(function(registUserInfo){
          return qUserLoginInit(req.session,registUserInfo._id.toString())
              .then(function(userInfo){
                userInfo = ranchUtil.deleteModelInfo(userInfo);
                userInfo.accessToken = req.sessionID;
                result = userInfo;
                logger.info('qUserLoginInit-session', req.session)
              });
        }).catch(function(err){
          error = err;
        }).finally(function(){
          // !error && sysMsgService.sendWelMsg(userId);
          ranchUtil.doResult(res,error,result);
        })

});

//获取用户列表
router.get('/userlist',function(req,res){

    var condition = {};
    // noinspection JSAnnotator
    //req.query.mobile && condition.mobile = req.query.mobile;
    var qSearchUser = q.nbind(userService.searchUserList,userService);
    qSearchUser(condition)
        .then(function (userListInfo) {
            console.log(userListInfo);
            res.send(userListInfo)
        })

});

//修改密码
router.post('/resetpass',auth.loginRequire([1,2,3]),function(req,res){
	console.log('success!');
	res.send('hello');
    var password = req.body.password;
    var re_password = req.body.re_password;
    
});

module.exports = router;