var express = require('express');
var router = express.Router();
var auth = require('../middleware/auth');
var config = require('../config');
var mongoose = require('mongoose');
// mongoose.Promise = require('q').Promise; 这个数据库未开启的时候不会抛错
mongoose.Promise = require('bluebird');

// 进路由线连接数据库
mongoose.connect(config.db, function (err) {
  if (err) {
    console.error('connect to %s error: ', err.message);
    process.exit(1);
  }else{
      console.log('链接数据库成功');
  }
});

// var promise = mongoose.createConnection(config.db, {
//   useMongoClient: true,
//   /* other options */
// });
// promise.then(function(db){
// 	if (db) {
// 		console.log('Mongodb连接成功');
// 	}
// });



router.use('/users', require('./api/user'));
router.use('/session', require('./api/session'));
router.use('/receiver', require('./api/receiver'));
router.use('/wechat', require('./api/wechat')); 		//

//Another example of this is white-listed “global” functionality. 
//Here the example is much like before, but it only restricts paths prefixed with “/api”:
// http://localhost:3001/api/diudiu/
router.all('/diudiu/*', auth.loginRequire([1,2,3]), function(req,res){
	res.send('hello world 刘奶奶')
});

module.exports = router;