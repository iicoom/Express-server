var express = require('express');
var router = express.Router();
var auth = require('../../middleware/auth');
var userService = require('../../service/user')

var util = require('../../util');
var ranchUtil = util.ranchUtil;
var ErrorCode = util.errorCode;
var q = require("q");


router.post('/regist',function(req,res){
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

    var qAddUser = q.nbind(userService.addUser,userService);
    var userInfo = {};
    userInfo.role_type = role_type;
    userInfo.mobile = loginname;
    userInfo.password = password;
    qAddUser(userInfo)
    .then(function(registUserInfo){
        res.send(registUserInfo)
    })
})

//修改密码
router.post('/resetpass',auth.loginRequired([1,2]),function(req,res){
	console.log('success!')
	res.send("hello")
})

module.exports = router;