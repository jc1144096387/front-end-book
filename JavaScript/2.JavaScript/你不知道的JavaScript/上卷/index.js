// // 全局变量会自动成为全局对象的属性，在浏览器中全局对象为window
// // todo：node环境不太清楚
// console.log(this);
// var a = 1;
// var fn = function(){
//     var a = 2;
//     b = 3;
//     console.log(a);
//     console.log(b);
//     console.log(this.a);
//     console.log(this.b);
//     console.log(this);
// }
// if(this.a){
//     fn();
// }

// // eval
// var b = 2;
// function testEval(str, a){
//     eval(str);
//     console.log(a,b);
// }
// testEval("var b = 3;", 1);//1 3
// // 但是在严格模式下，eval会有其自己的词法作用域
// function testEvalStrict(str){
//     "use strict";
//     eval(str);
//     console.log(c);
// }
// testEvalStrict("var c = 3;");// ReferenceError: c is not defined

// // with
// var o1 = {
//     a: 1
// }
// var o2 ={
//     b: 2
// }
// function testWith(obj){
//     with(obj){
//         a = 3;
//     }
// }
// console.log(o1.a);//1
// testWith(o1);
// console.log(o1.a);//3
// testWith(o2);
// console.log(o2.a);//undefined
// console.log(a);//3 a被泄露到全局作用域上了

// // 相加时，浮点数会先转化为二进制数，在JavaScript小数部分最大精度为53位，因此会有一些误差
// console.log(0.1+0.2 == 0.30000000000000004);
// console.log((0.1*10+0.2*10)/10);


// function fn1(){
//     console.log("fn1");
// }

// //立即执行函数表达式
// (function fn2(a){
//     console.log(a);
// })("aaa");


// //变量声明提升
// console.log(a);//undefined
// var a = "2";
// //等价于
// var a;
// console.log(a);//undefined
// a = "2";

// // 函数声明提升
// fn();//fn
// function fn(){
//     console.log("fn");
// }
// // 等价于
// function fn(){
//     console.log("fn");
// }
// fn();//fn

// // 函数声明会被提升，但函数表达式却不会被提升
// fn2();//TypeError: fn2 is not a function
// var fn2 = function(){
//     console.log("fn2");
// }
// // 等价于
// var fn2;
// fn2();//TypeError: fn2 is not a function
// fn2 = function(){
//     console.log("fn2");
// }

// // 即使是具名函数表达式也不行
// fn3();//TypeError: fn2 is not a function
// fn4();//ReferenceError: fn4 is not defined
// var fn3 = function fn4(){
//     console.log("fn3");
// }
// // 等价于
// var fn3;
// fn3();//TypeError: fn2 is not a function
// fn4();//ReferenceError: fn4 is not defined
// fn3 = function(){
//     var fn4 = self;//即fn4标识符被绑定在函数表达式自身的函数中
//     console.log("fn3");
// }

// // 循环中的5个匿名函数表达式被封闭在一个共享的全局作用域中,使用的i变量是同一个
// for (var i = 0; i < 6; i++) {
//     //输出0,1,2,3,4,5和6个6
//     console.log(i);
//     setTimeout(function () {
//         console.log(i);
//     }, 0);
// }
// // 虽然作用域与上一个例子相同，但是本例中每次循环就执行了打印函数
// // 而上个例子中，setTimeout函数会先将要执行的函数插入等待队列中,因此打印会在循环结束后进行，此时全局作用域中的i值为6
// for(var i = 0; i < 6; i++){
//     // 输出0,1,2,3,4,5
//     function inner(){
//         console.log(i);
//     }
//     inner();
// }

// // 循环中的5个内层的匿名函数表达式被封闭在各自的外层匿名函数表达式中，使用的i变量是各自外层匿名函数表达式作用域中的i
// for (var i = 0; i < 6; i++) {
//     (function (i) {
//         setTimeout(() => {
//             console.log(i);
//         }, 1000 * i)
//     })(i);
// }

// // 使用块作用域
// for(let i = 0; i < 6; i++){
//     setTimeout(() => {
//         console.log(i);
//     }, 1000*i);
// }

// // 动态作用域和词法作用域
// function fn1(){
//     console.log(a);
// }
// function fn2(){
//     var a = 3;
//     fn1();
// }
// var a = 2;
// fn2();//打印的是2.但如果是动态作用域,则会打印3.
// //动态作用域查找不到a时会顺着调用栈查找,也就是到fn2()中去查找a.
// //词法作用域查找不到a时会在嵌套的作用域中向上查找,也就是到全局作用域中查找a
// //词法作用域关注函数在何处声明，而动态作用域关注函数从何处调用。

// function identify(){
//     return this.name.toUpperCase();
// }
// function speak(){
//     var greeting = "hello, I am " + identify.call(this);
//     console.log(greeting);
// }
// var me = {
//     name:'jc'
// }
// var you = {
//     name:"lucy"
// }
// speak.call(me);
// speak.call(you);
// 等价于
// function identify(context){
//     return context.name.toUpperCase();
// }
// function speak(context){
//     var greeting = "hello, I am " + identify(context);
//     console.log(greeting);
// }
// var me = {
//     name:'jc'
// }
// var you = {
//     name:"lucy"
// }
// speak(me);
// speak(you);

// // 虽然函数是一个对象，但函数内的this并不是指向函数本身
// function foo(num){
//     console.log("foo:" + num);
//     this.count ++;
// }
// foo.count = 0;
// for(var i = 0; i < 10; i++){
//     if(i>5){
//         foo(i);
//     }
// }
// console.log(foo.count);//0

// // 具名函数可以在函数内部使用其名字来引用其本身
// function foo(){
//     foo.count = 4;//foo指向函数本身
// }

// // 使用call来使this指向函数对象
// function foo(num){
//     console.log("foo:"+num);
//     this.count ++;
// }
// foo.count = 0;
// for(var i = 0; i < 10; i++){
//     if(i > 5){
//         foo.call(foo,i);
//     }
// }
// console.log(foo.count);//4

// //默认绑定：独立函数调用
// function fn1(){
//     console.log(this.a);
// }
// var a = 2;
// fn1();//2

// //隐式绑定
// function fn(){
//     console.log(this.a);
// }
// var obj1 = {
//     a: 1,
//     fn: fn
// }
// var obj2 = {
//     a: 2,
//     obj1: obj1
// } 
// obj2.obj1.fn();//1

// //隐式丢失
// function fn(){
//     console.log(this.a);
// }
// var obj = {
//     a: 1,
//     fn: fn
// }
// var a = 2;
// var f = obj.fn;
// f();//2,发生了隐式丢失
// obj.fn();//1

// //当函数作为参数传递时，其实就是隐式赋值，也会发生隐式丢失
// function fn(){
//     console.log(this.a);
// }
// var obj = {
//     a: 1,
//     fn: fn
// }
// var a = 2;
// setTimeout(obj.fn,100);//2

// //显示绑定call
// //todo: call和apply的区别
// function fn(){
//     console.log(this.a);
// }
// var obj = {
//     a: 1
// }
// fn.call(obj);//1

// //硬绑定,显式绑定的变种，解决绑定丢失问题
// function fn1(){
//     console.log(this.a);
// }
// function fn2(){
//     fn1.call(obj);
// }
// var obj = {
//     a: 1
// }
// var a = 2;
// fn2();//1
// setTimeout(fn2,100);//1

// //硬绑定的应用场景：创建包裹函数，传入所有参数并返回接收到的所有值
// function fn1(something){
//     console.log(this.a,something);
//     return this.a + something;
// }
// function fn2(){
//     return fn1.apply(obj,arguments);
// }
// var obj = {
//     a: 1
// }
// var f = fn2(3);//1 3
// console.log(f);//4

// //硬绑定的应用场景：创建一个可以重复使用的辅助函数
// function fn(something){
//     console.log(this.a,something);
//     return this.a + something;
// }
// function bind(fn,obj){
//     return function(){
//         return fn.apply(obj,arguments);
//     }
// }
// var obj = {
//     a: 1
// }
// var f1 = bind(fn,obj);
// var f2 = f1(3);//1 3
// console.log(f2);//4

// //由于硬绑定是一种非常常用的模式，所以在 ES5 中提供了内置的方法 Function.prototype.bind
// function fn(something){
//     console.log(this.a,something);
//     return this.a + something;
// }
// var obj = {
//     a: 1
// }
// var a = 2;
// var fn2 = fn.bind(obj);
// var f = fn2(3);//1 3
// console.log(f);//4

// //API调用的“上下文”，许多内置函数都提供了一个可选参数thisValue或者称为“上下文”，用来绑定this，这些函数实际上使用apply或call实现了显式绑定
// function fn(){
//     console.log(this.a);
// }
// var obj = {
//     a: 1
// }
// var a = 2;
// [1,2,3].forEach(fn,obj);//三个1

// //new绑定
// function fn(a){
//     this.a = a;
// }
// var f = new fn(2);
// console.log(f.a);//2

// // 隐式绑定和显式绑定优先级的比较
// function fn(){
//     console.log(this.a);
// }
// var obj1 = {
//     a: 1,
//     fn: fn
// }
// var obj2 = {
//     a: 2,
//     fn: fn
// }
// obj1.fn();//1
// obj2.fn();//2
// obj1.fn.call(obj2);//2,显式绑定的优先级大于隐式绑定
// obj2.fn.call(obj1);//1,显式绑定的优先级大于隐式绑定

// // new绑定和隐式绑定优先级的比较
// function fn(something){
//     this.a = something;
// }
// var obj1 = {
//     fn: fn
// }
// var obj2 = {

// }
// obj1.fn(1);
// console.log(obj1.a);//1
// //显式绑定优先级大于隐式绑定
// obj1.fn.call(obj2,2);
// console.log(obj2.a);//2
// //new绑定优先级大于隐式绑定
// var obj3 = new obj1.fn(3);
// console.log(obj1.a);//1
// console.log(obj3.a);//3

// // new绑定和显示绑定优先级的比较
// // 因为无法同时使用new和call/apply，所以，通过new和硬绑定来比较优先级
// function fn1(something){
//     this.a = something;
// }
// var obj1 = {

// }
// var fn2 = fn1.bind(obj1);
// fn2(1);
// console.log(obj1.a);//1,硬绑定将this与obj1绑定
// var obj2 = new fn2(2);//new绑定将this与obj2绑定
// console.log(obj1.a);//1
// console.log(obj2.a);//2

// // 使用我们自己创造的辅助函数bind来比较
// function bind(fn,obj){
//     return function(){
//         fn.apply(obj,arguments);
//     }
// }
// function fn1(something){
//     this.a = something;
// }
// var obj1 = {

// }
// var fn2 = bind(fn1,obj1);
// fn2(1);
// console.log(obj1.a);//1
// var obj2 = new fn2(2);
// console.log(obj1.a);//2
// console.log(obj2.a);//undefined,new绑定失效了，没有将this改为与obj2绑定

//为何内置方法Function.Prototype.bind有用而我们自己创造的辅助函数bind失效了呢？
//因为，内置方法Function.Prototype.bind的实现更加复杂，会判断硬绑定函数是否被new操作符调用，如果是的话就会使用新创造的this替换硬绑定的this
//todo: 分析bind实现源码


// 