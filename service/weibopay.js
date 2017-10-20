/**
 * 新浪资金托管
 */
 var _ = require('lodash');
 var request = require('request');


 // 基本参数
var BASE_PARAMS = {
    service: '', //  接口名称    String(64)  接口名称。   非空  open_account
    version: '1.0', //  接口版本    Number(5)   接口版本    非空  1
    request_time: '', //  请求时间    String(14)  发起请求时间，格式yyyyMMddHHmmss 非空  2.01401E+13
    partner_id: '', //  合作者身份ID     String(32)  签约合作方的钱包唯一用户号。  非空  2.00004E+11
    _input_charset: '', //  参数编码字符集 String(10)  商户网站使用的编码格式，如utf-8、gbk、gb2312等。 非空  UTF-8
    sign: '', //  签名  String(256) 参见“签名机制”。   非空  e8qdwl9caset5zugii2r7q0k8ikopxor
    sign_type: '', //  签名方式    String(10)  签名方式支持RSA、MD5。建议使用MD5   非空  MD5
    sign_version: '1.0', //  签名版本号   Number(5)   签名密钥版本，默认1.0    可空  1
    encrypt_version: '1.0', //  加密版本号   Number(5)   加密密钥版本，默认1.0    可空  1
    notify_url: '', //  系统异步回调通知地址  String(1000)    钱包处理发生状态变迁后异步通知结果，响应结果为“success”，全部小写   可空  http://www.test.com/receive_notify.htm
    return_url: '', //  页面跳转同步返回页面路径    String(1000)    钱包处理完请求后，当前页面自动跳转到商户网站里指定页面的http路径。 可空  http://www.test.com/receive_return.htm
    memo: '' //  备注  String(1000)    说明信息，原文返回。客户可根据需要存放需要在响应时带回的信息。 注意：当接口类型为 托管代收/代付/转账/退款时，该长度不能超过256个字符 可空
};

/**
 * // 微钱包服务
 * @param {[type]} options [{
 *                             mgs_server: '', // 会员网关
 *                             mas_server: '', // 收单网关
 *                             partner_id: '', // 合作者身份ID
 *                             sign_type: '', // 签名方式
 *                             key: '', // 商户MD5_KEY
 *                             _input_charset: '', // 编码
 *                             public_key: '', // 商户加密公钥
 *                             sign_private_key: '', // 商户签名私钥
 *                             sign_public_key: '' // 商户回调签名验证公钥
 *                         }]
 */
function WeiboPay(options) {
    if (!(this instanceof WeiboPay)) return new WeiboPay(options);

    var partnerId = this.partnerId = options.partner_id; // 合作者身份ID
    var signType = this.signType = options.sign_type || DEFAULT_SIGN_TYPE; // 签名方式
    var key = this.key = options.key; // md5 密钥
    var _inputCharset = this._inputCharset = options._input_charset || DEFAULT_CHARSET; // 编码

    // 加密/解密
    // var privateKey = this.privateKey = options.private_key;
    var publicKey = this.publicKey = options.public_key;

    // 签名/验签
    var signPrivateKey = this.signPrivateKey = options.sign_private_key;
    var signPassphrase = this.signPassphrase = options.sign_passphrase;
    var signPublicKey = this.signPublicKey = options.sign_public_key;

    this.mgs_server = options.mgs_server; // 会员网关
    this.mas_server = options.mas_server; // 收单网关
    this.notify_url = options.notify_url; // 系统异步回调通知地址(基础URL) url/service_name
    this.return_url = options.return_url; // 页面跳转同步返回页面路径(基础URL) url/service_name


    // 基础参数
    var params = _.clone(BASE_PARAMS);
    params['partner_id'] = partnerId;
    params['sign_type'] = signType;
    params['_input_charset'] = _inputCharset;
    this.baseParams = params;

    // RSA/MD5
    var rsa = new RSA({
        // private_key: privateKey,
        public_key: publicKey,
        sign_private_key: signPrivateKey,
        sign_passphrase: signPassphrase,
        sign_public_key: signPublicKey,
        charset: _inputCharset
    });

    var md5 = new MD5({
        key: key,
        charset: _inputCharset
    });

    var signUtil = new SignUtil({
        rsa: rsa,
        md5: md5,
        sign_type: signType
    });

    this.rsa = rsa;
    this.md5 = md5;
    this.signUtil = signUtil;
}

 /**
 * 封装基础数据
 * @private
 * @param  {[type]} service [服务名]
 * @return {[type]}         [description]
 */
WeiboPay.prototype._getBaseParams = function(service, query) {
    var params = _.clone(this.baseParams);
    if (query) query = querystring.stringify(query);

    params['notify_url'] = this.notify_url + '/' + service;
    params['return_url'] = this.return_url + '/' + service + (!!query ? ('?' + query) : '');
    params['service'] = service;
    params['request_time'] = dateFormat(new Date(), 'yyyymmddHHMMss'); // yyyyMMddHHmmss

    return params;
}


/**
 * 发送请求
 * @private
 * @return {[type]} [description]
 */
WeiboPay.prototype._send = function(url, params, cb) {
    var self = this;
    logger.info(params);

    // 过滤掉继承信息
    var _cb = function(err, data) {
        if (err) {
            logger.error(err);
            return cb(err);
        }
        data = _.omit(data, 'response_time', 'partner_id', '_input_charset', 'sign', 'sign_type', 'sign_version', 'response_code', 'response_message', 'memo');
        cb(null, data);
    }

    params = _.chain(params)
        .pick(notEmpty)
        .mapValues(urlEncode)
        .value();

    var options = {
        method: 'POST',
        url: url,
        timeout: 60 * 1000,
        form: params
    };

    function callback(err, response, body) {
        if (err) return _cb(err);
        if (response['statusCode'] !== 200) return _cb(new WeiboPayError('999', '请求错误', {
            statusCode: response['statusCode']
        }));
        logger.info('==========response body=========')
        logger.info(body)
        var contentType = response.headers['content-type'];
        if (-1 !== contentType.indexOf('application/json') || -1 !== contentType.indexOf('text/plain')) {
            try {
              if(body instanceof Array) {
                body.forEach(function(item, index) {
                  body[index] = querystring.unescape(item.replace(/\+/g, ' '))
                })
              } else {
                body = querystring.unescape(body.replace(/\+/g, ' '))
              }
              body = JSON.parse(body);
            } catch (e) {
                logger.error(body);
                return _cb(new WeiboPayError('999', '响应无法解析', {
                    body: body
                }));
            }
            logger.info(body);
            var sign_result = body['sign'];
            var sign_type_result = body['sign_type'];
            var _input_charset_result = body['_input_charset'];

            var response_code = body['response_code']; // 响应码
            if (response_code === 'APPLY_SUCCESS') {
                var content = createLinkString(body);
                var checked = self.signUtil.checkSign(content, sign_result, sign_type_result);
                if (checked) {
                    return _cb(null, body);
                } else {
                    return _cb(new WeiboPayError('1001', '验签失败', {
                        content: content,
                        signMsg: sign_result,
                        signType: sign_type_result
                    }));
                }
            } else {
                // 处理失败
                return _cb(new WeiboPayError('1002', (body['response_message'] + '-' + response_code) || '处理失败', {
                    response_code: response_code,
                    response_message: body['response_message']
                }));
            }
        } else if (-1 !== contentType.indexOf('text/html')) {
            logger.info(body);
            try {
                body = resolveHtml(body);
            } catch (e) {
                logger.error(e);
                body = null;
            };
            _cb(null, body);
        }
    }

    request(options, callback);
}

 /**
 * 2.4  查询是否设置支付密码
 * query_is_set_pay_password
 * @param  {[type]} identity_id   [用户标识信息   String(32)  商户系统用户id(字母或数字) 非空  2000011212]
 * @param  {[type]} identity_type [用户标识类型   String(16)  ID的类型，目前只包括UID  非空  UID]
 * @param  {[type]} extend_param  [扩展信息 String(200) 业务扩展信息，参数格式：参数名1^参数值1|参数名2^参数值2|…… 可空  test^true|notify_type^sync]
 * @return {[type]}               [is_set_paypass   是否已设置支付密码   String(1)   是否已经设置支付密码，Y：已设置；N：未设置  非空  Y]
 */
WeiboPay.prototype.queryIsSetPayPassword = function(identity_id, identity_type, extend_param, cb) {
    var params = this._getBaseParams('query_is_set_pay_password');

    params['identity_id'] = identity_id;
    params['identity_type'] = identity_type;
    params['extend_param'] = extend_param;

    var content = createLinkString(params);
    var sign = this.signUtil.sign(content);
    params['sign'] = sign;

    this._send(this.mgs_server, params, cb);
}


module.exports = WeiboPay;