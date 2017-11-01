var mongoose = require('mongoose')
	, Schema = mongoose.Schema
	, Mixed = Schema.Types.Mixed

var Third = new Schema ({
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
    status: {
        type: Number,
        select: true,
        comment: '活动内容状态, 0: 无效, 1: 有效 ， 用于手动控制活动',
        default: 1 //constants.ACTIVITY.STATUS.VALID
    },
    valid_start_time: {
        type: Number,
        comment: '活动内容有效开始时间,单位ms'
    },
    valid_over_time: {
        type: Number,
        comment: '活动内容有效结束时间,单位ms'
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

ThirdParty.set('toJSON', {
    getters: true,
    virtuals: true,
    transform: function ( doc, ret ) {
        delete ret._id;
        delete ret.__v;
        return ret;
    }
});

mongoose.model('Third',Third);