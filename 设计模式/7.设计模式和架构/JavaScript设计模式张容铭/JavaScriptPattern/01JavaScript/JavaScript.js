// var fn = function(){}和 function fn(){} 定义函数的区别
// var fn = function(){}会使函数的声明被提前，而函数的赋值不会被提前（匿名函数只有在被调用时才被初始化）
// function fn(){} 会使函数的声明和赋值都被提前
// 例子A
var fnA = function(){
    console.log("fnA1");
}
fnA();//输出fnA1
fnA = function(){
    console.log("fnA2");
}
// 等价于
var fnA;
fnA = function(){
    console.log("fnA1");
}
fnA();//输出fnA1
fnA = function(){
    console.log("fnA2");
}

// 例子B
function fnB(){
    console.log("fnB1");
}
fnB();//输出fnB2
function fnB(){
    console.log("fnB2");
}
// 等价于
function fnB(){
    console.log("fnB1");
}
function fnB(){
    console.log("fnB2");
}
fnB();//输出fnB2

// 推荐采用第一种方式即var fn = function(){}来定义函数 并将函数的定义放在文件头部，这样在一定程度上能防止函数被覆盖造成的影响。
// 当然仅仅采用第一种方式并没有多大用处。因为如果不采取其他措施，不管是采用第一种方式还是第二种方式定义的函数都是全局变量。
// 我们需要有更好的方式来 避免团队开发中带来的函数覆盖问题。

// 用对象收编变量





// 对原生对象Function进行拓展
Function.prototype.a = function(){
    console.log("a");
} 
Function.prototype.addMethod = function(name,fn){
    this[name] = fn;
}
var fn = new Function();
console.log(fn.a);
console.log(Function.prototype.a);
fn.addMethod('b',function(){
    console.log("b");
})
fn.a();
fn.b();


// 原型prototype
// todo







function A(){
    this.q = "q";
    this.w = "w";
}
function B(){
    let _q = "q";
    let _w = "w";
    this.set = function(q,w){
        _q = q;
        _w = w;
    }
    this.get = function(){
        return {
            q: _q,
            w: _w
        }
    }
}

var C = function(){
    let _q = "q";
    let _w = "w";
}
C.prototype.set = function(){

}
C.prototype.get = function(){

}

var a1 = new A();
var a2 = new A();
var b1 = new B();
var b2 = new B();
a1.q = "a1q";
console.log(a2.q);
a2.q = "a2q";
console.log(a1.q);

// 模拟类的私有变量
b1.set("b1q","b1w");
console.log(b1.get());
console.log(b2.get());
b2.set("b2q","b2w");
console.log(b1.get());
console.log(b2.get());
