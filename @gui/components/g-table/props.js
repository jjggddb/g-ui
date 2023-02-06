export default {
	props: {
		data: {
			type: Array,
			default() {
				return []
			}
		},
		columns: {
			type: Array,
			default() {
				return []
			}
		},
		pagination: {
			type: [Object, null, Boolean],
			default: null
		},
		localPaging: {
			type: Boolean,
			default: false
		},
		// 是否有竖线
		border: {
			type: Boolean,
			default: false
		},
		// 是否显示斑马线
		stripe: {
			type: Boolean,
			default: false
		},
		// 多选
		type: {
			type: String,
			default: ''
		},
		// 没有更多数据
		emptyText: {
			type: String,
			default: '没有更多数据'
		},
		loading: {
			type: Boolean,
			default: false
		},
		rowKey: {
			type: String,
			default: ''
		}
	},
}