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

//第三方活动对接
router.post('/add', controller.post.add);
// router.get('/:uid', controller.get.findByUid);
// router.get('/', controller.findTPList);
// router.put('/:uid', controller.edit);
// router.put('/:uid/status',controller.changeState);

//router.use('/:uid/cdKey', require('./third_cdk'));

module.exports = router;