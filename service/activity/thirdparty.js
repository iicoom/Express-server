'use strict'

var Q = require("q");
var ThirdParty = require("../../model/thirdparty");

ThirdParty.qCreate = Q.nbind(ThirdParty.create,ThirdParty);
ThirdParty.qFind = Q.nbind(ThirdParty.find,ThirdParty);
ThirdParty.qFindOne = Q.nbind(ThirdParty.findOne,ThirdParty);

/*
 *创建第三方活动
 */
exports.addThirdParty = function(addInfo, cb) {
	console.log('ThirdParty.addThirdParty');
	ThirdParty.qCreate(addInfo)
		.then(function(result) {
			cb && cb(null, result);
		})
		.catch(function(err) {
            cb && cb(err);
        })

}

//查询第三方活动
exports.searchThirdParty = function(condition, cb) {
    console.log('ThirdParty.searchThirdParty');
    ThirdParty.qFindOne(condition)
		.then(function (result) {
            cb && cb(null, result);
        })
        .catch(function(err) {
            cb && cb(err);
        })
}


module.exports = exports;

