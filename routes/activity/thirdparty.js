'use strict'

var express = require('express')
   , router = express.Router()
   , _ = require('lodash')
   , Q = require('q')
   , YunFarmError = require('../../util/error')
   , Third = require('../../controller/activity/thirdparty')
   , xlsx = require('node-xlsx')
   , formidable = require("formidable");

//解析Excel表格数据
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
        //return res.json(cdKey);
    });
})

//添加thirdparty活动
router.post('/add', Third.add)

//分页查询第三方活动 传order_goods数组进来
router.get('/getThirdList', Third.getThirdList)

module.exports = router;