# vuex大纲
## 核心概念
state、getters、mutation、action、module

### state
存储应用级的状态（全局变量）
在组件的计算属性(computed)中使用

### getters
可以认为是store的计算属性，从store的state中派生出一些状态，如对列表进行过滤
在组件的计算属性(computed)中使用

### mutation
同步状态更改，视图层(view)通过提交(commit)状态更改(mutation)来改变状态(state)
在组件的方法(methods)中使用

### action
异步状态更改，视图层(view)通过分发(dispatch)异步状态更改(action),在其中提交(commit)同步状态更改(mutation)来改变状态(state).
action提交的是mutation，而不是直接变更状态。
action内部可以包含任意异步操作，而mutation内部不能包含异步操作
在组件的方法(methods)中使用

### module
将store分割成模块(module)以便更好地管理。

## 辅助函数
mapState 、mapGetters、mapMutations、mapActions

## 推荐的项目结构：
- store
  - index.js                  # 组装模块并导出store的地方
  - action.js                 # 根级别的 action
  - mutation.js               # 根级别的 mutation
  - modules
    - cart.js                 # 购物车模块
    - products.js             # 产品模块


## todoList
1. 补充解释核心概念
2. 编写示例代码
3. 补充实战代码
4. 总结技巧