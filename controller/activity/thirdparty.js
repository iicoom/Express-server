/**
 * Created by mxj on 2017/10/26.
 */
'use strict';

var _ = require('lodash')
	, Q = require('q')
	, ThirdPartyService = require('../../service/activity/thirdparty')
	, YunFarmError = require('../../util/error')
	, log = require('../../libs/log')
	, logger = log.getLogger("activity-thirdparty")
	, debug = require('debug')('activity-thirdparty')
	, redis = require("redis")
	, config = require('../../config')
	, rc = config.redis
	, client = redis.createClient(rc.port, rc.host, rc);


/*创建thirdparty*/
exports.add = function (req , res ,next) {
	req.check('name', '活动名称不能为空' ).notEmpty();
	//req.check('company', '第三方公司名称不能为空' ).notEmpty();
	req.check('favour_uid', '电商活动UID不能为空' ).notEmpty();
	req.check('content', '活动内容不能为空' ).notEmpty();
	//req.check('company', '首页活动url不能为空且只能为字母').notEmpty().isAscii();

	// req.check('sort', '排序值不能为空').isInt({
	// 	min : 0
	// });
	//req.check('valid_start_time', '活动game内容有效开始时间不是时间类型').isDate();
	//req.check('valid_over_time', '活动game内容有效结束时间不是时间类型').isDate();

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
    // var qAddThird = Q.nbind(ThirdPartyService.addThirdParty,ThirdPartyService);
    // qAddThird(addInfo)
    //     .then(function (result) {
    //         console.log(result);
    //         return res.json(result);
    //     })
    //     .catch( function (err) {
    //         return next(err);
    //     })
    Q.nfcall(ThirdPartyService.addThirdParty,addInfo)
		.then(function (result) {
			return res.json(result);
		})
		.catch( function (err) {
			return next(err);
		})
};

exports.getThirdList = function (req , res ,next) {

	var order_goods = [
		{'favour_uid':'1234abc','bbj':'这个略屌'},
		{'favour_uid':'5678bcd','jjb':'这个略掉'},
		{'favour_uid':'','jjb':'这个略掉'},
		{'favour_uid':'5678bcd','jjb':'这个重复的滤掉'}
	];
	//console.log(_.map(order_goods,'favour_uid'))
	var favour_uid = _.uniq(_.compact(_.map(order_goods,'favour_uid')));
    var now = _.now();

    Q.resolve()
    .then(function(){
        if (favour_uid && favour_uid.length > 0) {
            var condition = {
                    favour_uid : {$in: favour_uid},
                    status: 1,
                    valid_start_time: {$lte: now},
                    valid_over_time: {$gte: now}
            };
            return Q.nfcall(ThirdPartyService.searchThirdParty,condition)
        }
        return Q.reject('next')
    })
    .then(function (thirdInfo) {
        if (thirdInfo) {
            logger.debug('========send_message is =====', thirdInfo );
            client.publish("send_message", JSON.stringify(thirdInfo));
        }
        res.send(thirdInfo);
    })
    .catch(function (err) {
        return fn && fn(err)
    });

};