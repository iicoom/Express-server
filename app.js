var express = require('express');
var app = express();
var api = require('./routes');
var config = require('./config');
var YunFarmError = require('./util/error');
var favicon = require('serve-favicon');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var session = require('express-session');
var redis = require('./service/redis');
var RedisStore = require('connect-redis')(session);
var logger = require('morgan');
require('./redis_subscribe');


app.use(favicon(__dirname + '/public/images/favicon.png'));

//app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: false
}));

//To prevent errors from Cross Origin Resource Sharing, we will set 
//our headers to allow CORS with middleware like so:
app.use(function(req,res,next){
    res.setHeader('Access-Control-Allow-Origin','*');
    res.setHeader('Access-Control-Allow-Headers',
        'Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers');
    res.setHeader('Access-Control-Allow-Methods', 'PUT,POST,GET,DELETE,OPTIONS');
    
    //and remove cacheing so we get the most recent comments
    res.setHeader('Cache-Control', 'Cache-Control');
    res.setHeader('Content-Type', 'application/json');
    if (req.method == 'OPTIONS') {
        res.send(200); /让options请求快速返回/
    }
    else {
        next();
    }
});

// 连接Redis数据库
var rc = redis.getRedisClient(config.redis);
app.use(session({
    secret: config.session_secret,
    rolling: true,
    resave: false,
    saveUninitialized: false,
    name: 'token',
    cookie: {
        maxAge: config.cookie_max_age  //毫秒
    },
    store: new RedisStore({
        prefix: "sid:",
        client: rc,
        ttl: config.session_max_age // 过期时间
    })
}));

app.use(logger())
   .use(require('./middleware/validator')());


//路由需要放在bodyParser下边
app.use('/api', api);

//catch 404 and forward to error handler
app.use(function(req, res, next) {
	console.log(req.originalUrl);
    var err = new YunFarmError('1001', 'Not Found', req.originalUrl || req.url);
    next(err);
});

// error handlers
// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        if (err) {
            var message = err.message;
            res.status((message && message.status_code) || 400);
            return res.json({
                name: err.name,
                errmsg: err.message,
                errcode: err.code,
                cause: err.cause
            });
        } else {
            logger.error(err);
            res.status(err.status || 500);
            res.json({
                errcode: '999',
                errmsg: '服务器忙，请稍后再试。'
            });
        }
    });
}


app.set('port',process.env.PORT || config.server_port);
// console.dir('Node-env:' + app.get('env'));
console.log('Node Environment:' + app.get('env'));


var server = app.listen(app.get('port'),function(){
	console.log('Express server listening on port ' + server.address().port)
});
