/**
 * ProjectNameError constructor
 *
 * @param {String} msg Error message
 */
var inherits = require('util').inherits;

function ProjectNameError(code, msg, cause) {
    Error.call(this);
    Error.captureStackTrace(this, ProjectNameError);
    this.name = 'ProjectNameError';
    this.code = code;
    this.cause = cause;
    this.message = msg;
};

/*!
 * Inherits from Error.
 */
inherits(ProjectNameError, Error);

ProjectNameError.prototype.toJSON = function() {
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

module.exports = exports = ProjectNameError;

// var err = new ProjectNameError('100000', '用户名或者密码错误', '用户名错误');

// console.log(err);
// console.log(err.stack)
// console.log(JSON.stringify(err));
