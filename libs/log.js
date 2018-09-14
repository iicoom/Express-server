/**
 * 日志配置文件
 * @type {*|exports|module.exports}
 */

'use strict';

var log4js = require('log4js');
var logConfig = [];

if (process.env.NODE_ENV === 'production') {
    var logServer = require('../config').logServer;

    logConfig = [
        {
            loggerHost: logServer.host,
            loggerPort: logServer.port,
            type: 'log4js-tcp',
            category: ['access', 'console']
        },
        {
            loggerHost: logServer.host,
            loggerPort: logServer.port,
            type: 'log4js-tcp',
            category: 'error'
        },
        {
            loggerHost: logServer.host,
            loggerPort: logServer.port,
            type: 'log4js-tcp',
            category: 'setInterval-cancel-order'
        },
        {
            loggerHost: logServer.host,
            loggerPort: logServer.port,
            type: 'log4js-tcp',
            category: 'fetch-client'
        },
        {
            loggerHost: logServer.host,
            loggerPort: logServer.port,
            type: 'log4js-tcp',
            category: 'aliyun-url'
        }
    ];

} else {
    var path = require( 'path' );
    var mkdirp = require( 'mkdirp' );
    var logDir = require( '../config' ).log_dir;

    mkdirp.sync(logDir);

    logConfig = {
        out: { type: 'stdout' },
        // err: { type: 'stderr' },
        receiver: {
            type: 'file',
            filename: path.join( logDir, '/receiver.log' ),
            pattern: '.yyyy-MM-dd',
            maxLogSize: 10485760,
            backups: 3,
            compress: true
        },
        activity: { type: 'file', filename: path.join( logDir, '/activity.log' ), pattern: '.yyyy-MM-dd'},
    }

    
}

log4js.configure({
    appenders: logConfig,
    //日志的出口问题（即日志输出到哪里）就由 Appender 来解决
    //日志的分级,不同级别的日志在控制台中采用不同的颜色，比如 error 通常是红色的
    categories: {
        default: { appenders: ['out'], level: 'info' },
        receiver: { appenders: ['receiver'], level: 'info' }
    }
});

module.exports = log4js;

// var logger = log4js.getLogger();
// logger.trace('Entering cheese testing');
// logger.debug('Got cheese.');
// logger.info('Cheese is Gouda.');
// logger.warn('Cheese is quite smelly.');
// logger.error('Cheese is too ripe!');
// logger.fatal('Cheese was breeding ground for listeria.');
