var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var UserSchema = new Schema({
    wxopenid:{type:String},//微信OpenId
    nickname:{type:String},//昵称
    username: { type: String},//用户名
    password: { type: String},//密码
    salt: {type: String},
    mobile: { type: String,unique:true},//手机号
    email: { type: String},//Email
    birthday:{type:Number},//生日
    idcard: { type: String},//身份证号
    gender: {type: String},//性别
    role_type:{type:Number},//角色
    companies:{type: Array}, //所属牧场 {company_id,company_name,role(牧场角色)}
    portrait_id:{type:String},//头像Id
    pay_pwd:{type:String},//支付密码
    create_time:{type:Number, default: Date.now},//注册时间
    history:{type:Array},
    is_bindwx:{type:Boolean}, //是否绑定微信
    announce_lversion:{type:Number}, //查看过的最近公告版本
    need_upgrade: { // 是否需要强制升级
        type: Boolean,
        default: false
    },
    unionid: {type: String}, // 微信统一id， 用于多平台
    is_activate: {type: Boolean, default: false}, // 是否激活新浪用户
    is_real_name: {type: Boolean, default: false}, //是否实名认证
    is_binding_verify: {type: Boolean, default: false}, //是否绑定实名认证
    is_set_pay_password: {type: Boolean, default: false}, // 是否设置支付密码
    modify_mobile: { // 是否修改手机号
      type: Boolean,
      default: false
    },
    unsubscribe: Boolean,// 账户注销
    disabled :{type:Boolean}//禁止用户登录
});


if (!UserSchema.options.toObject) UserSchema.options.toObject = {};
UserSchema.options.toObject.transform = function (doc, ret, options) {
    delete ret.pay_pwd;
    delete ret.password;
    delete ret.wxopenid;
    delete ret.salt;
    delete ret._id;
    delete ret.__v;
    return ret;
};


// 序列化结果
UserSchema.set('toJSON', {
    virtuals: true,
    transform: function(doc, ret) {
        delete ret.pay_pwd;
        delete ret.password;
        delete ret.wxopenid;
        delete ret.salt;
        delete ret._id;
        delete ret.__v;
        return ret;
    }
});

UserSchema.virtual('idcard2')
.get(function () {
    if (this.idcard) {
        if (this.idcard.length === '18') {
            return this.idcard.substr(0, 6) + '********' + this.idcard.substr(14);
        } else if (this.idcard.length === '15') {
            return this.idcard.substr(0, 6) + '*****' + this.idcard.substr(11);
        }
    }
});


module.exports = mongoose.model('User', UserSchema);