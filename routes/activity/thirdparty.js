/**
 * Created by mxj on 2017/10/26.
 */
'use strict';

var express = require('express')
	, router = express.Router()
	, controller = require('../../controller/activity/thirdparty')
	, service = require('../../service/activity/thirdparty');

router.post('/add', controller.add);
// router.get('/:uid', controller.findByUid);
// router.get('/', controller.findTPList);

module.exports = router;