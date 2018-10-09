/**
 * Created by mxj on 2018/10/8.
 */

var request = require('supertest');
var app = require('../../../app');
// console.log(app.address())

// 用户注册
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

// 用户登录
describe('POST /api/session/login', function() {
  it('responds with json', function(done) {
    request(app)
    .post('/api/session/login')
    .send({mobile: '18231088178', password: '123456'})
    .set('Accept', 'application/json')
    .expect(200)
    .end(function(err, res) {
      if (err) return done(err);
      console.log(res.body);
      done();
    });
  });
});