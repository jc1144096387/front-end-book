# Promise
## Promise含义
Promise 是异步编程的 种解决方案，比传统的解决方案一一回调函数和事件→一更合理且更强大。它最早由社区提出并实现， S6 将其写进了语言标准，统一了用法 ，并原生提供了Promise 对象。

所谓 Promise ，简单来说就是一个容器，里面保存着某个未来才会结束的事件（通常是异步操作）的结果。从语法上来说，Promise 就是一个对象，从它可以获取异步操作的消息 Promise提供统一的 API ，各种异步操作都可以用同样的方法进行处理。

Promise 对象有以下两个特点
1. 对象的状态不受外界影响。 Promise 对象代表 个异步操作，有 种状态： Pending （进
行中）、 Fulfilled （己成功）和 Rejected （己失败）。只有异步操作的结果可以决定当前是哪一种
状态，任何其他操作都无法改变这个状态。这也是“Promise ”这个名字的由来，它在英语中意
思就是“承诺”，表示其他手段无法改变。
2. －旦状态改变就不会再变，任何时候都可以得到这个结果。 Promise 对象的状态改变只
有两种可能：从 Pending 变为 Fulfilled 和从 Pending 变为 Rejected 。只要这两种情况发生，状态
就凝固了，不会再变，而是一直保持这个结果，这时就称为 Resolved （己定型） 就算改变己经
发生，再对 Promise 对象添加回调函数，也会立即得到这个结果。这与事件 CEvent ）完全不同。
事件的特点是，如果错过了它，再去监昕是得不到结果的


## Promise.prototype.then()

## Promise.prototype.catch()

## Promise.all()

## Promise.race()

## Promise.resolve()

## Promise.reject()