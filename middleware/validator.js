var expressValidator = require('express-validator');
var validator = require('../libs/validator');

// 参数校验
module.exports = function() {
    var options = {
        customValidators: {
            isArray: function(value) {
                return Array.isArray(value);
            },
            isPositiveInteger: function(value) {
                return validator.isPositiveInteger(value);
            },
            isMobileNum: function(value) {
                return validator.isMobileNum(value);
            },
            isObjectId: function(value) {
                return validator.isObjectId(value);
            },
            isPassword: function(value) {
                return validator.isPassword(value);
            },
            isCompanyName: function(value) {
                return validator.isCompanyName(value);
            },
            isTelNum: function(value) {
                return validator.isTelNum(value);
            },
            isIdCard: function(value) {
                return validator.isIdCard(value);
            },
            isZipCode: function ( value ) {
                return validator.matches(value, /[1-9]\d{5}(?!\d)/);
            },
            isCardGroupCode: function ( value ) {
                // [\u4e00-\u9fa5]|[\u4E00-\uFA29]|[\uE7C7-\uE7F3]
                // ^[0-9a-zA-Z_\-\u4E00-\u9FA5]{4,20}$
                var regexStr = /([\u4e00-\u9fa5]|[\u4E00-\uFA29]|[\uE7C7-\uE7F3]){0,9}[0-9a-zA-Z]*/;
                return validator.matches(value, regexStr);
            },
            isTitle: function ( value ) {
                // [\u4e00-\u9fa5]|[\u4E00-\uFA29]|[\uE7C7-\uE7F3]
                var regexStr = /([\u4e00-\u9fa5]|[\u4E00-\uFA29]|[\uE7C7-\uE7F3]){0,9}[0-9a-zA-Z]*/;
                return validator.matches(value, regexStr);
            },
            isSubTitle: function ( value ) {
                var regexStr = /([\u4e00-\u9fa5]|[\u4E00-\uFA29]|[\uE7C7-\uE7F3]){0,18}[0-9a-zA-Z]*/;
                return validator.matches(value, regexStr);
            },
            isMobileOrTelNum: function(str) {
                return validator.isMobilePhone(str, 'zh-CN') || validator.matches(str, /^0\d{2,3}-?\d{7,8}$/);
            },
            gt: function(param, num) {
                return param > num;
            },
            gte: function(param, num) {
                return param >= num;
            },
            lt: function(param, num) {
                return param < num;
            },
            lte: function(param, num) {
                return param <= num;
            }
        },
        customSanitizers: {
            toDate: function(value) {
                if (typeof value === 'string' && /^\d{4}-\d{2}-\d{2}$/.test(value))
                    value += ' 00:00:00';

                if (value.indexOf('T') != -1) {
                    value = value.replace('T', ' ');
                }
                if (value.indexOf('+') != -1) {
                    value = value.replace('+', ' ');
                }
                return validator.toDate(value);
            },
            toTimestamp: function(value) {
                if (typeof value === 'string' && /^\d{4}-\d{2}-\d{2}$/.test(value))
                    value += ' 00:00:00';

                if (value.indexOf('T') != -1) {
                    value = value.replace('T', ' ');
                }
                if (value.indexOf('+') != -1) {
                    value = value.replace('+', ' ');
                }
                var date = validator.toDate(value);
                return !!date ? date.getTime() : null;
            },
            toEndTimestamp: function ( value ) {
                if (typeof value === 'string' && /^\d{4}-\d{2}-\d{2}$/.test(value))
                    value += ' 23:59:59.999';

                if (value.indexOf('T') != -1) {
                    value = value.replace('T', ' ');
                }
                if (value.indexOf('+') != -1) {
                    value = value.replace('+', ' ');
                }
                var date = validator.toDate(value);
                return !!date ? date.getTime() : null;
            }
        }
    };

    return expressValidator(options);
};
