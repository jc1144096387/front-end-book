// 参考：https://www.jianshu.com/p/c8b86b09daf0

/*
** 函数防抖
** 触发高频事件后n秒内函数只会执行一次，如果n秒内高频事件再次被触发，则重新计算时间
*/

// 非立即执行版: 触发高频事件后过n秒执行函数fn，如果n秒内高频事件再次被触发，则重新计算时间
function debounce1(fn, wait) {
  let timeout;
  return function () {
    if (timeout) {
      clearTimeout(timeout);
    }
    timeout = setTimeout(function () {
      fn.apply(this, arguments);
      console.log("可以再次触发了");
    }, wait);
  }
}

// 立即执行版: 触发高频事件后立即执行函数fn，过n秒后触发高频事件可以立即执行函数fn，如果n秒内高频事件再次被触发，则重新计算时间
function debounce2(fn, wait) {
  let timeout;
  return function () {
    if (timeout) {
      clearTimeout(timeout);
    }

    let callnow = !timeout;
    timeout = setTimeout(function () {
      timeout = null;
      console.log("可以再次触发了");
    }, wait);
    if (callnow) {
      fn.apply(this, arguments);
    }
  }
}

// 综合版
/**
** @desc 函数防抖
** @param fn 函数
** @param wait 延迟执行毫秒数
** @param immediate true 表立即执行，false 表非立即执行
*/
function debounce(fn, wait, immediate) {
  let timeout;
  return function () {
    let context = this;
    let args = arguments;

    if (timeout) {
      clearTimeout(timeout);
    }

    if (immediate) {
      let callnow = !timeout;
      timeout = setTimeout(function () {
        timeout = null;
      }, wait);
      if (callnow) {
        fn.apply(context, args);
        console.log("可以再次触发了");
      }
    } else {
      timeout = setTimeout(function () {
        fn.apply(context, args);
        console.log("可以再次触发了");
      }, wait);
    }
  }
}


