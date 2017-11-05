var mongoose = require('mongoose')
	, Schema = mongoose.Schema
	, Mixed = Schema.Types.Mixed

var ThirdPartySchema = new Schema ({
	name: {
		type: String,
		index: { unique: true, sparse: true },
		required: true,
		select: true,
		comment: '活动名称'
	},
	content: {
        type: Mixed,
        required: true,
        // index: { unique: true, sparse: true },
        select: true,
        comment: '活动内容,如跳转页面链接 '
    },
    favour_uid: {
        type: String,
        required: true,
        comment: '什么鬼？ '
    },
    status: {
        type: Number,
        select: true,
        comment: '活动内容状态, 0: 无效, 1: 有效 ， 用于手动控制活动',
        default: 1 //constants.ACTIVITY.STATUS.VALID
    },
    valid_start_time: {
        type: Date,
        comment: '活动内容有效开始时间,单位ms',
        default: '2017.01.20'
    },
    valid_over_time: {
        type: Date,
        comment: '活动内容有效结束时间,单位ms',
        default: '2017.12.20'
    },
    create_time: {
        type: Date,
        default: Date.now
    },
    update_time: {
        type: Date,
        default: Date.now
    }
})

ThirdPartySchema.set('toJSON', {
    getters: true,
    virtuals: true,
    transform: function ( doc, ret ) {
        delete ret._id;
        delete ret.__v;
        return ret;
    }
});

module.exports = mongoose.model('ThirdParty',ThirdPartySchema);