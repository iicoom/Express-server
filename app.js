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

mongoose.Promise = require('q').Promise;

app.use(favicon(__dirname + '/public/images/favicon.png'));

//app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: false
}));

//连接Redis数据库
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

//路由需要放在bodyParser下边
app.use('/api', api);

//catch 404 and forward to error handler
app.use(function(req, res, next) {
	console.log(req.originalUrl)
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
console.dir(app.get('env'));


var server = app.listen(app.get('port'),function(){
	console.log('Express server listening on port ' + server.address().port)
})
