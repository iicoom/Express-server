var redis = require('redis');
var config = require('./config');
var rc = config.redis;
var client = redis.createClient(rc.port, rc.host, rc);
var msgService = require('./service/msg');
var log = require('./libs/log');
var logger = log.getLogger('activity-thirdparty');
var q = require('q');

client.on('message', function (channel, message) {
    logger.info('channel: %s, message: %s', channel, message);

    if (channel === 'order_finish') {
        couponCardSend(message);
    }

    if(channel === 'send_message'){
        sendMessage(message);
    }
});

function sendMessage(message){
    message = JSON.parse(message);

    q.nfcall(msgService.sendSystemMsg, message.type, message.id, message.content)
        .then(function(result){
            logger.info('send msg save success', message);
        })
        .catch(function(err){
            logger.error('send message user id:' + message.userId + ", error:\n", err);
        });
}


client.subscribe('order_finish');  //订阅 订单完成 频道
client.subscribe('send_message');  //订阅 发送系统消息 频道