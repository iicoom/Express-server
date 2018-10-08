/**
 * Created by mxj on 2018/10/8.
 */

var request = require('supertest');
var app = require('../../../app');
// console.log(app.address())
describe('user regist test',function(){
  it('should return 手机号不能为空',function(done){
    request(app)
    .post('/api/users/regist')
    .expect(403)
    .expect(function (res) {
      console.dir(res.body);
    })
    .end(done);
  })
});