var validator = require('validator');
var objectid = require('objectid');
var idcard = require('./idcard');

// 正整数
validator.extend('isPositiveInteger', function(str) {
    return validator.isInt(str, {
        min: 1
    })
});

// 大于零整数
validator.extend('isGteZeroInteger', function(str) {
    return validator.isInt(str, {
        min: 0
    })
});

//概率 0~100
validator.extend('isRate',function (str) {
    return validator.isFloat(str,{
        min:0,
        max:100
    })
});

// MongoDB ObjectId
validator.extend('isObjectId', function(str) {
    return objectid.isValid(str);
});

// 手机号
validator.extend('isMobileNum', function(str) {
    return validator.isMobilePhone(str, 'zh-CN');
});

validator.extend('isToken', function(str) {
    return validator.isUUID(str, 4);
});

validator.extend('isPassword', function(str) {
    return validator.matches(str, /^(\w){6,20}$/);
});

validator.extend('isCompanyName', function(str) {
    return validator.matches(str, /^[0-9a-zA-Z_\-\u4E00-\u9FA5]{4,20}$/);
});

validator.extend('isTelNum', function(str) {
    return validator.matches(str, /^0\d{2,3}-?\d{7,8}$/);
});

validator.extend('isIdCard', function(str){
    return !!idcard(str);
});

module.exports = validator;


// console.log(validator.isPassword('abcde5'));
// console.log(validator.isCompanyName('企业名称'));
//
// console.log(validator.isIn(null, [1, 2,4]));
// console.log(validator.isTelNum('010-88888888'));
// console.log(validator.isIdCard('411123199011257038'))
// console.log(idcard('411123199011257038'))