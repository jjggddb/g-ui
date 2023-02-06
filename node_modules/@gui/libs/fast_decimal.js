import Decimal from 'decimal.js';

/**
 * 校验是否为数字
 * 重写Number校验，仅允许[Number,String]类型通过
 * @param {*Any} data 需要校验的数字
 */
export function isNumber(data) {
	const type = Object.prototype.toString.call(data)
	return ['[object Number]', '[object String]'].includes(type) && !isNaN(data) && data !== ''
}
/**
 * 快速相加
 * @param {*Any} data 需要相加的数据
 */
export function add(...args) {
	let res = 0
	args.forEach(item => {
		const value = isNumber(item) ? item : 0
		res = Decimal(res).add(Decimal(value)).toString()
	})
	return res
}
/**
 * 快速相减
 * @param {*Any} data 需要相减的数据
 */
export function sub(...args) {
	let res = isNumber(args[0]) ? args[0] : 0
	const subtractArr = args.slice(1)
	subtractArr.forEach(item => {
		const value = isNumber(item) ? item : 0
		res = Decimal(res).sub(Decimal(value)).toString()
	})
	return res
}
/**
 * 快速相乘
 * @param {*Any} data 需要相加的数据
 */
export function mul(...args) {
	let res = 1
	args.forEach(item => {
		const value = isNumber(item) ? item : 1
		res = Decimal(res).mul(Decimal(value)).toString()
	})
	return res
}
/**
 * 快速递除
 * @param {*Any} data 需要递除的数据
 */
export function div(...args) {
	let res = isNumber(args[0]) ? args[0] : 0
	const divisorArr = args.slice(1)
	divisorArr.forEach(item => {
		const value = isNumber(item) ? item : 1
		res = Decimal(res).div(Decimal(value)).toString()
	})
	return res
}
/**
 * 转换为百分比-保留6位小数
 * @param {*Any} data 需要相除的数据
 */
export function percent(...args) {
	const res = div(...args)
	return `${Decimal(res).mul(100).toFixed(6)}%`
}
