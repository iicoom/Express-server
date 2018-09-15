/**
 * Created by mxj on 2018/9/15.
 */
var express = require('express');
var router = express.Router();
var config = require('../../config');

var weixin = require('node-weixin').init({
  url: '/',
  token: config.wechat.token,
  appid: config.wechat.appID,
  secret: config.wechat.appsecret});

/**
 * 接入公众号URL验证
 */
router.all('/', function(req, res) {
  // console.log('req.method:', typeof req.method);
  console.log('req.query\n', req.query);
  if(req.method === 'GET') {
    if(weixin.signature(req)) {
      res.send(200, req.query.echostr);
    } else {
      res.send(200, 'fail');
    }
  } else if (req.method === 'POST') {
    weixin.getMsg(req,res);
  }
});

module.exports = router;