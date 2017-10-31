'use strict'

var express = require('express')
   , router = express.Router()
   , controller = require('../../controller/activity/parsekey')
   , xlsx = require('node-xlsx')
   , formidable = require("formidable");

router.post('/', function(req, res) {
	var form = new formidable.IncomingForm();
    form.parse(req, function (err, fields, files) {
        var file = files.file;
        console.log('heiheihei'+file)
        if (file) {
            var items = xlsx.parse(file.path)[0].data;
            cdKey = items.join(',');
        }
        // if(cdKey){
        //     cdKey = cdKey + ',';
        // }
        // return res.json(cdKey);
    });
})

router.post('/add', function(req, res, next) {
	req.check('cdKey','兑换码不能为空').notEmpty();
	var errors = req.validationErrors();
	if (errors) {
		return next(new shopError('1000', '参数错误', errors));
	}

	var reqCDKey = req.body.cdKey;
    var cdKey = _.compact(_.trim(reqCDKey.replace(/[，;；]+/g,',') , ',').split(',').sort());
	var repetitionCDK = [];
    for(var i=0;i<cdKey.length;i++){
        if (cdKey[i]==cdKey[i+1]){
            repetitionCDK.push(cdKey[i]);
        }
    }
    if(repetitionCDK.length>0){
        return next(new shopError('1000', 'cdKey重复', {repetitionCDK:repetitionCDK}));
	}
})

module.exports = router;