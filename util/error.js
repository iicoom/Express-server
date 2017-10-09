/**
 * YunFarmError constructor
 *
 * @param {String} msg Error message
 */
var inherits = require('util').inherits;

function YunFarmError(code, msg, cause) {
    Error.call(this);
    Error.captureStackTrace(this, YunFarmError);
    this.name = 'YunFarmError';
    this.code = code;
    this.cause = cause;
    this.message = msg;
};

/*!
 * Inherits from Error.
 */
inherits(YunFarmError, Error);

YunFarmError.prototype.toJSON = function() {
    return JSON.stringify({
        name: this.name,
        code: this.code || '',
        message: this.message,
        cause: this.cause || '',
        stack: this.stack
    });
}

/*!
 * Module exports.
 */

module.exports = exports = YunFarmError;

// var err = new YunFarmError('100000', '用户名或者密码错误', '用户名错误');

// console.log(err);
// console.log(err.stack)
// console.log(JSON.stringify(err));
