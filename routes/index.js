var express = require('express');
var router = express.Router();

var mongoose = require('mongoose');
var q = require("q");
mongoose.Promise = require('q').Promise;

//进路由线连接数据库
// mongoose.connect('mongodb://127.0.0.1/Express-api', function (err) {
//   if (err) {
//     console.error('connect to %s error: ', config.db, err.message);
//     process.exit(1);
//   }else{
//       console.log("链接数据库成功");
//   }
// });

var promise = mongoose.connect('mongodb://127.0.0.1/Express-api', {
  useMongoClient: true,
  /* other options */
});
promise.then(function(db){
	if (db) {
		console.log("Mongodb连接成功");
	}
});



router.use('/users', require('./api/user'));
router.use('/session', require('./api/session'));

module.exports = router;