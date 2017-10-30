/**
 * 活动路由总控
 * - thirdparty
 * Created by mxj.
 */
'use strict';

var express = require('express')
	, router = express.Router()
	, Q = require('q')
	, ShopError = require('../../util/error')
	//, log = require('../../libs/log')
	//, logger = log.getLogger("activity-thirdparty")
	, controller = require('../../controller/activity/thirdparty')
	, service = require('../../service/activity/thirdparty')


router.param('uid', function findByUid ( req, res, next, uid ) {
	req.check('uid', '第三方活动 UID不能为空').notEmpty();
	var errors = req.validationErrors();
	if (errors) {
		return next(new ShopError('1000', '参数错误', errors));
	}
	service.findByUid(uid, function ( err, thirdParty ) {
		if (err) {
			return next(err);
		}
		if (!thirdParty) {
			return next(new ShopError('10001', '该活动不存在', { uid: uid }));
		}
		req.thirdParty = thirdParty.toJSON();
		next();
	});
});

 //第三方活动对接
 router.post('/add', controller.add);
 router.post('/thirdparty',function(req,res){
 	if (err) {
 		console.log(err)
 	}
 	res.send('hello')
 })




 router.get('/search/:name/:company',function(req, res, next) {
 	
 	var condition = {};
 	condition.name = req.params.name;
 	condition.company = req.params.company;
 	console.log(condition)

 	res.send('hello')
 })

 router.get('/search',function(req, res, next) {
 	
 	var condition = {};
 	condition.name = req.query.name;
 	condition.company = req.query.company;
 	console.log(condition)

 	res.send('hello')
 })


 module.exports = router;