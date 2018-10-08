/**
 * Created by mxj on 2018/10/8.
 */

require('should');
var mergeService = require('../../service/merge');

// 当2个参数均为对象时
it('should success', function() {
  var a = {
    name: 'Fundebug',
    type: 'SaaS'
  };

  var b = {
    service: 'Real time bug monitoring',
    product:
      {
        frontend: 'JavaScript',
        backend: 'Node.js',
        mobile: '微信小程序'
      }
  };

  var c = mergeService.merge(a, b);

  c.should.have.property('name', 'Fundebug');
  c.should.have.propertyByPath('product', 'frontend').equal('JavaScript');
});

// 当只有1个参数时
it('should return undefined', function()
{
  var a = {
    name: 'Fundebug',
    type: 'SaaS'
  };

  var c = mergeService.merge(a);

  (typeof c).should.equal('undefined');
});
/*
可知Should能够:
验证对象是否存在某属性，并验证其取值
验证对象是否存在某个嵌套属性，并使用链式方式验证其取值
  */