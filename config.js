var path = require('path');
var env = process.env.NODE_ENV; // 修改环境变量从 process 中获取 ,默认好像是development

if (env == 'production') {
	/**
     * 生产环境配置的参数
     */
    module.exports = {
        envirment_port: "8099",
        server_port: "8090",
        session_secret: 'cH38wtQAj9X672QgNUR0L7x5n1MNIh',
        cookie_max_age: 10 * 24 * 3600 * 1000,
        session_max_age: 10 * 24 * 3600,
        db: 'mongodb://Ranch:yunfarm_000@master.mongodb.aliyun.yunfarm.net/Ranch'
    }
} else if (env == 'test') {
	/**
     * 开发环境配置的参数
     */
    module.exports = {
        envirment_port: "8099",
        server_port: "3000",
        session_secret: 'cH38wtQAj9X672QgNUR0L7x5n1MNIh',
        cookie_max_age: 10 * 24 * 3600 * 1000,
        session_max_age: 10 * 24 * 3600,
        db: 'mongodb://Ranch:yunfarm_000@master.mongodb.aliyun.yunfarm.net/Ranch'
    }
} else{
	/**
     *开发环境配置的参数
     */
    module.exports = {
        envirment_port: "8099",
        server_port: "3000",
        session_secret: 'cH38wtQAj9X672QgNUR0L7x5n1MNIh',
        cookie_max_age: 10 * 24 * 3600 * 1000,
        session_max_age: 10 * 24 * 3600,
        //db: 'mongodb://Ranch:yunfarm_000@master.mongodb.aliyun.yunfarm.net/Ranch'
        db: '127.0.0.1:27017/Express-api',
        redis: {
            port: 6379,
            //host: '101.201.197.163',
            host: '127.0.0.1',
            //auth_pass: 'eGd3cEn38tYCQiDBzx7PTWwO'
        }
    }
}