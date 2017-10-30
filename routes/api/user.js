var express = require('express');
var router = express.Router();
var auth = require('../../middleware/auth');
var userService = require('../../service/user')

var util = require('../../util');
var ranchUtil = util.ranchUtil;
var ErrorCode = util.errorCode;
var q = require("q");
var tools = util.tools;
var randomstring = require("randomstring");
var YunFarmError = require('../../util/error');


router.post('/regist',function(req,res,next){
	var role_type = req.body.role_type;
    var mobile = req.body.mobile;
    var password = req.body.password;
    var re_password = req.body.re_password;

    var errorMsg;
    errorMsg || mobile || (errorMsg = "用户名不能为空");
    errorMsg || ranchUtil.testPhone(mobile) || (errorMsg = "手机号格式不正确");
    errorMsg || password || (errorMsg = "密码不能为空");
    errorMsg || re_password || (errorMsg = "确认密码不能为空");
    if (errorMsg) {
        return ranchUtil.doResult(res, ranchUtil.generateErr(ErrorCode.User_ErrorParams, errorMsg));
    }

    if (password !== re_password) {
        return next(new YunFarmError('2004', '两次密码不一致。'));
    }

    var qAddUser = q.nbind(userService.addUser,userService);
    var userInfo = {};
    var salt = randomstring.generate(24);
    var passhash = tools.sha256(password + salt);
    userInfo.role_type = role_type;
    userInfo.mobile = mobile;
    userInfo.password = passhash;
    userInfo.salt = salt;
    
    qAddUser(userInfo)
    .then(function(registUserInfo){
        res.send(registUserInfo)
    })
})

//修改密码
router.post('/resetpass',auth.loginRequired([1,2,3]),function(req,res){
	console.log('success!')
	res.send("hello")
    var password = req.body.password;
    var re_password = req.body.re_password;
    
})

module.exports = router;