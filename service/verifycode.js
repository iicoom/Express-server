'use strict'

var ranchUtil = require("../util/ranchUtil.js");

module.exports = exports;

exports.generateVerifyCode = function (n, collection) {
    console.log('verifycode.generateVerifyCode');
    n = n ? n : 4;
    collection = collection ? collection : ranchUtil.Collection_Num;
    var verifyCode = ranchUtil.generateRandom(n, collection);
    return verifyCode;
}