// 参考：https://www.jianshu.com/p/c8b86b09daf0

/*
** 函数节流：连续触发事件但是在 n 秒中只执行一次函数。节流会稀释函数的执行频率。
*/

// 时间戳版: 在持续触发事件的过程中，函数会立即执行，并且每 1s 执行一次。
function throttle1(fn, wait) {
  let previous = 0;
  return function () {
    let context = this;
    let args = arguments;

    let now = new Date();
    if (now - previous > wait) {
      fn.apply(context, args);
      previous = now;
    }
  }
}

// 定时器版: 在持续触发事件的过程中，函数不会立即执行，并且每 1s 执行一次，在停止触发事件后，函数还会再执行一次。
function throttle2(fn, wait) {
  let timeout;
  return function () {
    let context = this;
    let args = arguments;

    if (!timeout) {
      timeout = setTimeout(() => {
        timeout = null;
        fn.apply(context, args);
      }, wait);
    }
  }
}

// 综合版
/**
 * @desc 函数节流
 * @param fn 函数
 * @param wait 延迟执行毫秒数
 * @param type "timestamp" 表时间戳版，"timeout" 表定时器版
 */
function throttle(fn, wait, type) {
  if (type === "timestamp") {
    var previous = 0;
  } else if (type === "timeout") {
    var timeout;
  }
  return function () {
    let context = this;
    let args = arguments;

    if (type === "timestamp") {
      let now = Date.now();
      if (now - previous > wait) {
        fn.apply(context, args);
        previous = now;
      }
    } else if (type === "timeout") {
      if (!timeout) {
        timeout = setTimeout(() => {
          timeout = null;
          fn.apply(context, args)
        }, wait)
      }
    }
  }
}