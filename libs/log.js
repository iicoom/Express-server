/**
 * 日志配置文件
 * @type {*|exports|module.exports}
 */

'use strict';

var log4js = require('log4js')
    , logConfig = [];

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

    // log4js.configure({
    //     levels: {
    //         "[all]": "INFO"
    //     },
    //     appenders: logConfig,
    // });
} else {
    var path = require( 'path' )
        , mkdirp = require( 'mkdirp' )
        , logDir = require( '../config' ).log_dir;

    mkdirp.sync(logDir);

    logConfig = [
        {
            type: 'dateFile',
            filename: path.join( logDir, '/access.log' ),
            pattern: "-yyyy-MM-dd",
            alwaysIncludePattern: true,
            category: [ 'access','console' ]//可以设置一个 Logger 实例的类型，按照另外一个维度来区分日志：
        },
        {
            type: 'dateFile',
            filename: path.join( logDir, '/error.log' ),
            pattern: "-yyyy-MM-dd",
            alwaysIncludePattern: true,
            category: 'error'
        },
        {
            type: 'dateFile',
            filename: path.join( logDir, '/fresh-order.log' ),
            pattern: "-yyyy-MM-dd",
            alwaysIncludePattern: true,
            category: 'fresh-order'
        },
        {
            type: 'dateFile',
            filename: path.join( logDir, '/activity-thirdparty.log' ),
            pattern: "-yyyy-MM-dd",
            alwaysIncludePattern: true,
            category: 'activity-thirdparty'
        },
        {
            type: 'dateFile',
            filename: path.join( logDir, '/thirdParty-cdKey.log' ),
            pattern: "-yyyy-MM-dd",
            alwaysIncludePattern: true,
            category: 'thirdParty-cdKey'
        },

    ];

    
}

log4js.configure({
    replaceConsole: true,
    appenders: {
        'activity-thirdparty': { type: 'DateFile', filename: 'all-the-logs.log' }
    },  
    //日志的出口问题（即日志输出到哪里）就由 Appender 来解决
    //日志的分级,不同级别的日志在控制台中采用不同的颜色，比如 error 通常是红色的
    categories: {default: { appenders: ['activity-thirdparty'], level: 'debug' }}
});

module.exports = log4js;

// var logger = log4js.getLogger('error');
// logger.setLevel('INFO');
// logger.info('Server Start. At: ' + new Date());

// logger.trace('Entering cheese testing');
// logger.debug('Got cheese.');
// logger.info('Cheese is Gouda.');
// logger.warn('Cheese is quite smelly.');
// logger.error('Cheese is too ripe!');
// logger.fatal('Cheese was breeding ground for listeria.');
