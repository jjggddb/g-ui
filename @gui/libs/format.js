import Decimal from 'decimal.js';
import moment from 'moment';
import * as fd from "./fast_decimal.js"
/**
 * 校验是否为空
 * @param {*Any} data 需要判断的数据
 * @param {*Boolean} beZero 是否可以为0 
 */
export function empty(data, beZero = false) {
	if (['[object Object]', '[object Array]'].includes(Object.prototype.toString.call(data))) {
		return !Object.keys(data).length
	} else if (data == 0) {
		return !beZero
	} else {
		return !data
	}
}
/**
 * 使用Decimal转为千分符数字
 * @param {*Number String} data 需要处理的数据
 * @param {*Number} precision 保留小数位数
 * @param {*String} round Decimal省略方法, 默认四舍五入 
 */
export function number(data, precision = 2, round = 'ROUND_HALF_UP') {
	let res = fd.isNumber(data) ? data : 0
	const isLessZero = data < 0
	let arr = Decimal(res).abs().toFixed(precision, Decimal[round]).split('.')
	const decimal = precision > 0 ? `.${arr[1]}` : ''
	return `${isLessZero ? '-' : ''}${Number(arr[0]).toLocaleString()}${decimal}`
}
/**
 * 使用Decimal转为千分符数字并添加价格符号
 * @param {*Number String} data 需要处理的数据
 * @param {*Number} precision 保留小数位数
 * @param {*String} round Decimal省略方法, 默认四舍五入 
 */
export function price(data, symbol = '¥', precision = 2, round = 'ROUND_HALF_UP') {
	let res = fd.isNumber(data) ? data : 0
	const isLessZero = data < 0
	let arr = Decimal(res).abs().toFixed(precision, Decimal[round]).split('.')
	const decimal = precision > 0 ? `.${arr[1]}` : ''
	return `${isLessZero ? '-' : ''}${symbol}${Number(arr[0]).toLocaleString()}${decimal}`
}
/**
 * 时间格式转换
 * @param {*Number String} date 需要处理的数据
 * @param {*Number} format 保留格式
 */
export function date(date, format = 'YYYY-MM-DD HH:mm:ss') {
	if (!date) return ''
	if (!moment(date).isValid()) return date
	return moment(date).format(format)
}
/**
 * 匹配字典
 * @param {*Number String} value 需要处理的数据
 * @param {*Array<Object>} list 字典数据数组
 * @param {*String} nameKey 名称key，默认sCodeName
 * @param {*String} valueKey 值key，默认sCodeValue
 */
const DICT_YES_OR_NO = [{ sCodeName: '是', sCodeValue: '1' },{ sCodeName: '否', sCodeValue: '0' }]
export function dict(value, list = DICT_YES_OR_NO, nameKey = 'sCodeName', valueKey = 'sCodeValue') {
	const res = list.find(item => item[valueKey] == value)
	return res ? res[nameKey] : value
}
/**
 * 平铺数组
 * @param {*Array<Object>} list 数据数组
 * @param {*String} key 名称key
 */
export function array(list, key = "sName", symbol = ',') {
	let res = ''
	if (Array.isArray(list)) {
		list.forEach((item, index) => {
			const value = item[key]
			res += index > 0 ? `${symbol} ` + value : value
		})
	}
	return res
}
