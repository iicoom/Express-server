/**
 * 活动路由总控
 * - thirdparty
 * Created by mxj.
 */
'use strict';

var express = require('express')
	, router = express.Router()
	, Q = require('q')
	//, log = require('../../libs/log')
	//, logger = log.getLogger("activity-thirdparty")
	, thirdparty = require('../../controller/activity/thirdparty')
	, service = require('../../service/activity/thirdparty')

//凡是路径中有uid参数的额路由都会经过这里,然后根据uid查出活动信息，放到req.thirdParty上
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

<<<<<<< HEAD
 //第三方活动对接
 router.post('/add', controller.add);
 router.post('/thirdparty',function(req,res){
 	if (err) {
 		console.log(err)
 	}
 	res.send('hello')
 })
=======
//第三方活动对接
router.use('/thirdparty', require('../activity/thirdparty'));
// router.get('/:uid', controller.get.findByUid);
// router.get('/', controller.findTPList);
// router.put('/:uid', controller.edit);
// router.put('/:uid/status',controller.changeState);
>>>>>>> eedff498775b381dcf263f9da97a791a9c388658

//router.use('/parseKey', require('../activity/third_key'));

<<<<<<< HEAD


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
=======
module.exports = router;
>>>>>>> eedff498775b381dcf263f9da97a791a9c388658
