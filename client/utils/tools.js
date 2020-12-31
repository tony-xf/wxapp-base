/**
 * 去空格
 * @param time
 * @returns {string}
 */
export const trim = (str) => {
  return str.replace(/\s*/g, '')
}
/**
 * 验证手机号
 * @param mobile
 * @returns {boolean}
 */
export const validateMobile = (mobile) => {
  const mobileRule = /^1[0-9]{10}$/
  return mobile.match(mobileRule)
}/**
 * 验证正整数
 * @param mobile
 * @returns {boolean}
 */
export const validateNum = (num) => {
  const numRule = /^[1-9]\d*$/
  return num.match(numRule)
}
/**
 * 验证金额
 * @param amount
 * @returns {boolean}
 */
export const validateAmount = (amount) => {
  const rule = /(^[1-9]([0-9]+)?(\.[0-9]{1,2})?$)|(^(0){1}$)|(^[0-9]\.[0-9]([0-9])?$)/
  return amount.match(rule)
}
/**
 * 事件的节流
 */
export const throttle = function(fn, delay) {
  // last为上一次触发回调的时间, timer是定时器
  let last = 0,
    timer = null
  // 将throttle处理结果当作函数返回
  return function() {
    // 保留调用时的this上下文
    let context = this
    // 保留调用时传入的参数
    let args = arguments
    // 记录本次触发回调的时间
    let now = +new Date()
    // 判断上次触发的时间和本次触发的时间差是否小于时间间隔的阈值
    if (now - last < delay) {
      // 如果时间间隔小于我们设定的时间间隔阈值，则为本次触发操作设立一个新的定时器
      clearTimeout(timer)
      timer = setTimeout(function() {
        last = now
        fn.apply(context, args)
      }, delay)
    } else {
      // 如果时间间隔超出了我们设定的时间间隔阈值，那就不等了，无论如何要反馈给用户一次响应
      last = now
      fn.apply(context, args)
    }
  }
}
/**
 * 事件防抖
 * @param fn
 * @param delay
 * @returns {Function}
 */
export const debounce = function(fn, delay) {
  // 定时器
  let timer = null

  // 将debounce处理结果当作函数返回
  return function() {
    // 保留调用时的this上下文
    let context = this
    // 保留调用时传入的参数
    let args = arguments

    // 每次事件被触发时，都去清除之前的旧定时器
    if (timer) {
      clearTimeout(timer)
    }
    // 设立新定时器
    timer = setTimeout(function() {
      fn.apply(context, args)
    }, delay)
  }
}
/**
 * 获取url参数值
 * @param name
 * @returns {*}
 */
export const getQuery = (str, name) => {
  let reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)', 'i')
  let r = str.match(reg)
  if (r != null) {
    return unescape(r[2])
  }
  return null
}

/**
 * 时间戳转换日期
 * @param time
 * @param format
 * @returns {string | * | void}
 */
export function dateFormat (time, format){
	var t = new Date(time * 1000);
	var tf = function(i){return (i < 10 ? '0' : '') + i};
	return format.replace(/yyyy|MM|dd|HH|mm|ss/g, function(a){
		switch(a){
			case 'yyyy':
				return tf(t.getFullYear());
				break;
			case 'MM':
				return tf(t.getMonth() + 1);
				break;
			case 'mm':
				return tf(t.getMinutes());
				break;
			case 'dd':
				return tf(t.getDate());
				break;
			case 'HH':
				return tf(t.getHours());
				break;
			case 'ss':
				return tf(t.getSeconds());
				break;
		}
	})
}

/**
 * 分割姓名
 * @param fullname
 * @returns {*[]}
 */
export function splitName(fullname) {
	var hyphenated = ['欧阳', '太史', '端木', '上官', '司马', '东方', '独孤', '南宫', '万俟', '闻人', '夏侯', '诸葛', '尉迟', '公羊', '赫连', '澹台', '皇甫',
		'宗政', '濮阳', '公冶', '太叔', '申屠', '公孙', '慕容', '仲孙', '钟离', '长孙', '宇文', '城池', '司徒', '鲜于', '司空', '汝嫣', '闾丘', '子车', '亓官',
		'司寇', '巫马', '公西', '颛孙', '壤驷', '公良', '漆雕', '乐正', '宰父', '谷梁', '拓跋', '夹谷', '轩辕', '令狐', '段干', '百里', '呼延', '东郭', '南门',
		'羊舌', '微生', '公户', '公玉', '公仪', '梁丘', '公仲', '公上', '公门', '公山', '公坚', '左丘', '公伯', '西门', '公祖', '第五', '公乘', '贯丘', '公皙',
		'南荣', '东里', '东宫', '仲长', '子书', '子桑', '即墨', '达奚', '褚师'];
	var vLength = fullname.length;
	var lastname = '', firstname = '';//前为姓,后为名
	if (vLength > 1) {
		var preTwoWords = fullname.substr(0, 2);//取命名的前两个字,看是否在复姓库中
		if (hyphenated.findIndex(e => e === preTwoWords) > -1) {
			lastname = preTwoWords;
			firstname = fullname.substr(2);
		} else {
			lastname = fullname.substr(0, 1);
			firstname = fullname.substr(1);
		}
	} else {
		lastname = fullname;
	}
	return [lastname, firstname];
}
/**
 * 验证邮箱
 * @param num
 */
export const validateEmail = (email)=>{
	const rule = /^[0-9A-Za-z][\.-_0-9A-Za-z]*@[0-9A-Za-z]+(\.[0-9A-Za-z]+)+$/;
	return email.match(rule);
}
/**
 * url是否tabbar
 * @param string
 */
export const isTabBar = (url)=>{
	const arr = ['/pages/home/index','/pages/category/index','/pages/cart/index','/pages/center/index']
	return arr.indexOf(url) > -1;
}
export default {
  trim,
  validateMobile,
  throttle,
  getQuery,
  debounce,
  validateAmount,
  validateNum,
  validateEmail,
  dateFormat,
  splitName,
  isTabBar
}
