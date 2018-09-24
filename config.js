var path = require('path');
var env = process.env.NODE_ENV; // 修改环境变量从 process 中获取 ,默认是development

if (env == 'production') {
	/**
     * 生产环境配置的参数
     */
    module.exports = {
        server_port: '8090',
        session_secret: 'cH38wtQAj9X672QgNUR0L7x5n1MNIh',
        cookie_max_age: 10 * 24 * 3600 * 1000,
        session_max_age: 10 * 24 * 3600,
        db: 'mongodb://username:password@master.mongodb.aliyun.mybiubiu.net/Fuck',
        redis: {
          port: 6379,
          host: '127.0.0.1',
          //auth_pass: 'eGd3cEn38tYCQiDBzx7PTWwOp'
        },
        logServer: {
          host: 'log4js1.logserver.aliyun.yunfarm.net',
          port: 33333
        },
        log_dir: '/mnt/data/Express-server/logs',
    }
} else if (env == 'test') {
	/**
     * 测试环境配置的参数
     */
    module.exports = {
        server_port: '3000',
        session_secret: 'cH38wtQAj9X672QgNUR0L7x5n1MNIh',
        cookie_max_age: 10 * 24 * 3600 * 1000,
        session_max_age: 10 * 24 * 3600,
        db: 'mongodb://username:password@master.mongodb.aliyun.mybiubiu.net/Fuck'
    }
} else{
	/**
     *开发环境配置的参数
     */
    module.exports = {
        server_port: '3000',
        session_secret: 'cH38wtQAj9X672QgNUR0L7x5n1MNIh',
        cookie_max_age: 10 * 24 * 3600 * 1000,
        session_max_age: 10 * 24 * 3600,
        // db: 'mongodb://username:password@master.mongodb.aliyun.mybiubiu.net/Fuck',
        db: 'mongodb://127.0.0.1:27017/Express-api',
        redis: {
            port: 6379,
            //host: '101.201.197.163',
            host: '127.0.0.1',
            //auth_pass: 'eGd3cEn38tYCQiDBzx7PTWwO'
        },
        logServer: {
            host: 'log4js1.logserver.aliyun.yunfarm.net',
            port: 33333
        },
        log_dir: __dirname + '/logs',
        wechat: {
            appID: 'wx4d2b79e558009896',
            appsecret: 'acd40ce586f5e35953690e6e27f48d91',
            token: 'checkitout'
        }
    }
}