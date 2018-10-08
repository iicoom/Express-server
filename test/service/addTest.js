/**
 * Created by mxj on 2018/10/8.
 */
// https://cnodejs.org/topic/58d1cafc17f61387400b7e4a

var addService = require('../../service/add');
var assert  = require('assert');

// console.log('add', addService.add(1, 2))
// 当2个参数均为整数时
it('should return 3', function()
{
  var sum = addService.add(1, 2);
  assert.equal(sum, 3);
});

// 当第2个参数为String时
it('should return undefined', function()
{
  var sum = addService.add(1, '2');
  assert.equal(sum, undefined);
});

// 当只有1个参数时
it('should return undefined', function()
{
  var sum = addService.add(1);
  assert.equal(sum, undefined);
});

// 故意写错
it('should return 5', function()
{
  var sum = addService.add(1, '4');
  assert.equal(sum, 5);
});

/*
我们按照Mocha的it函数编写一个个测试案例，然后Mocha负责执行这些案例；当assert.equal断言成功时，则测试案例通过；
当assert.equal断言失败时，抛出AssertionError，Mocha能够捕获到这些异常，然后对应的测试案例失败。
  */