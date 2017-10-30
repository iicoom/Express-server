/**
 * Created by mxj on 2017/10/26.
 */
'use strict';

var _ = require('lodash')
	, Q = require('q')
	, service = require('../../service/activity/thirdparty')
	, YunFarmError = require('../../util/error');
	/*****************************
	, log = require('../../libs/log')

	, logger = log.getLogger("activity-thirdparty");
	*************************************/

exports.post = {};
exports.add = function (req , res ,next) {
	console.log('woako')
	req.check('name', '活动名称不能为空' ).notEmpty();
	req.check('company', '第三方公司名称不能为空' ).notEmpty();
	// req.check('favour_uid', '电商活动UID不能为空' ).notEmpty();
	// req.check('type', '活动类型不能为空且为number类型' ).notEmpty();
	// req.check('content', '活动内容不能为空' ).notEmpty();
	// req.check('company', '首页活动url不能为空且只能为字母').notEmpty().isAscii();

	// req.check('sort', '排序值不能为空').isInt({
	// 	min : 0
	// });
	// req.check('valid_start_time', '活动game内容有效开始时间不是时间类型').isDate();
	// req.check('valid_over_time', '活动game内容有效结束时间不是时间类型').isDate();

	// req.sanitize('valid_start_time').toTimestamp();
	// req.sanitize('valid_over_time').toEndTimestamp();
	// req.sanitize('sort').toInt();
	// req.sanitize('content').toString().trim();
	// req.sanitize('image').toString().trim();
	// req.sanitize('name').toString().trim();

	var errors = req.validationErrors();
	if (errors) {
		return next(new YunFarmError('1000', '参数错误', errors));
	}

	var reqBody = req.body;
	//var id = 'thirdparty:' + uid(constants.ACTIVITY.ID_LENGTH);//自造id
	/**********************
	logger.debug('controller create thirdparty %s, request content: \n', id, reqBody);
	***************/
	var addInfo = {};
	addInfo = reqBody;
	//addInfo.uid = id;
	console.log(addInfo);
	Q.nfcall(service.save,addInfo)
		.then(function (result) {
			console.log(result);
			return res.json(result);
		})
		.catch( function (err) {
			return next(err);
		})
}