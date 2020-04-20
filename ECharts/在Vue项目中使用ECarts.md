## 在Vue项目中使用ECharts

### 通过 npm 安装 ECharts
npm install echarts --save

### 按需引入

```
// 引入 ECharts 主模块
var echarts = require("echarts/lib/echarts");
// 引入折线图
require("echarts/lib/chart/line");
// 引入提示框、标题组件、图例
require("echarts/lib/component/tooltip");
require("echarts/lib/component/title");
require("echarts/lib/component/legend");
```

### 创建图表
因为当前项目里用到的三个图表比较相似，就简单的封装成了vue组件，通过传参来渲染图表。
```
<template>
  <div :id="chartId" style="width: 100%; height: 100%;"></div>
</template>
<script>
// 引入 ECharts 主模块
var echarts = require("echarts/lib/echarts");
// 引入折线图
require("echarts/lib/chart/line");
// 引入提示框、标题组件、图例
require("echarts/lib/component/tooltip");
require("echarts/lib/component/title");
require("echarts/lib/component/legend");

export default {
  name: "chart",
  props: {
    chartId: String,
    xData: Array,
    // itemData: Array,
    series: Array,
    legend: Object
  },
  data() {
    return {};
  },
  watch: {
    // xData: function(val){
    //   this.renderChart();
    // },
    series: function(val) {
      this.renderChart();
    }
  },
  mounted() {
    this.renderChart();
  },
  methods: {
    // 渲染折线图
    renderChart() {
      // 基于准备好的dom，初始化echarts实例
      var myChart = echarts.init(document.getElementById(this.chartId));
      // 绘制图表
      myChart.setOption({
        // title: {
        //   text: "调用总量（近30天）",
        //   textStyle: {
        //     color: "#323232",
        //     fontSize: 20,
        //     fontWeight: "normal"
        //   }
        // },
        legend: this.legend,
        //设置canvas内部表格的内距
        grid: {
          x: 40,
          y: 20,
          x2: 40,
          y2: 60,
          borderWidth: 10
        },
        tooltip: {
          trigger: "axis"
          // formatter: '{b0}<br />{a0}:{c0}'
        },
        xAxis: {
          type: "category",

          data: this.xData,
          axisLine: {
            show: false
          },
          axisTick: {
            show: false
          },
          axisLabel: {
            show: true,
            interval: 5
          }
        },
        yAxis: {
          type: "value",
          axisLine: {
            show: false
          },
          axisTick: {
            show: false
          }
        },
        series: this.series
      });
    }
  }
};
</script>
<style>
</style>

```


将封装好的chart组件引入到需要使用的页面，并传递参数。       
下面的html代码省略了页面中的其他元素，使用时记得包裹一层容器并设置好宽度和高度
```
<chart chartId="mychart" :xData="dateArray" :itemData="numArray" :series="series"></chart>
```

```

// 引入日期相关工具
import dateUtil from "@/libs/dateUtil.js";
// 引入折线图组件
import chart from "@/components/chart.vue";
export default {
  name: "",
  components:{
    chart
  },
  data() {
    return {
      // 模拟数据（后面调用后台提供的接口替换掉即可）
      numArray: [
        1,
        2,
        3,
        4,
        5,
        6,
        7,
        8,
        9,
        2,
        3,
        4,
        5,
        6,
        7,
        8,
        9,
        3,
        4,
        5,
        6,
        7,
        8,
        9,
        1,
        2,
        3,
        4,
        5,
        6
      ],
      // 此处用到了一个日期相关的处理函数，代码会在下方贴出
      dateArray:dateUtil.getDateArray(
        new Date().setTime(new Date().getTime() - 3600 * 1000 * 24 * 29),
        new Date(),
        3600 * 1000 * 24 * 1,
        "yyyy-MM-dd"
      ),
      
    };
  },
  computed:{
    series:function(){
      let arr = [
        {
          name: "总调用",
          data: this.numArray,
          type: "line",
          color: "#036bc8",
          symbolSize: 6
        }
      ];
      return arr;
    } 
  },
  // 其他代码....
}

```

日期处理相关的函数dateUtil.js
```
let dateUtil = {};

/* 
** 格式化日期
** 月(M)、日(d)、小时(h)、分(m)、秒(s)、季度(q) 可以用 1-2 个占位符，
** 年(y)可以用 1-4 个占位符，毫秒(S)只能用 1 个占位符(是 1-3 位的数字)
** date: Date类型的日期
** fmt: 格式化模板，如yy-MM-dd
** 返回：格式化后的日期字符串
** 例子：
** (new Date()).Format("yyyy-MM-dd hh:mm:ss.S") ==> 2006-07-02 08:09:04.423
** (new Date()).Format("yyyy-M-d h:m:s.S")      ==> 2006-7-2 8:9:4.18
*/
dateUtil.format = function(date, fmt){
  var o = {
    "M+": date.getMonth() + 1, //月份
    "d+": date.getDate(), //日
    "h+": date.getHours(), //小时
    "m+": date.getMinutes(), //分
    "s+": date.getSeconds(), //秒
    "q+": Math.floor((date.getMonth() + 3) / 3), //季度
    S: date.getMilliseconds() //毫秒
  };
  if (/(y+)/.test(fmt))
    fmt = fmt.replace(
      RegExp.$1,
      (date.getFullYear() + "").substr(4 - RegExp.$1.length)
    );
  for (var k in o)
    if (new RegExp("(" + k + ")").test(fmt))
      fmt = fmt.replace(
        RegExp.$1,
        RegExp.$1.length == 1
          ? o[k]
          : ("00" + o[k]).substr(("" + o[k]).length)
      );
  return fmt;
}

// 根据开始日期、结束日期以及间隔得到一个格式化后的日期连续的日期字符串数组
dateUtil.getDateArray = function(start, end, distance, fmt){
  let arr = [];
  let d1 = new Date(start);
  let d2 = new Date(end);
  // console.log(d1, d2);
  while (d1 <= d2) {
    arr.push(dateUtil.format(d1,fmt));
    d1.setTime(d1.getTime() + distance);
  }
  // console.log(arr);
  return arr;
}
export default dateUtil;
```

使用上述代码即可渲染出一个效果如下的折线图（标题为另外的html元素，echart的title被我注释掉了，因为后续还要根据有无数据来判断是渲染图表还是无数据的提示）



### 其他图表示例
基于上述的chart组件，我还写了另外两个图表，其中一个和第一个图表基本相同。       
另外一个使用了多个数据项，也正是因为这个图表，我才将series和legend放到prop中进行传参渲染。
下面介绍一下这个图表的不同之处，供大家借鉴使用。

```
<chart
  chartId="numChart"
  :xData="dateArray"
  :itemData="numArray"
  :series="numSeries"
  :legend="numLegend"
></chart>
```
以下代码只贴出了折线图相关的代码，日期部分改成了日期选择器提供的日期，日期选择器相关组件没有在下方贴出。

```
// 引入日期相关工具
import dateUtil from "@/libs/dateUtil.js";

// 引入折线图组件
import chart from "@/components/chart.vue";

export default {
  name: "",
  components: {
    chart
  },
  data() {
    return {
      // 时间选择组件相关参数
      datePicker: [
        new Date(new Date().getTime() - 3600 * 1000 * 24 * 29),
        new Date()
      ],
      // 下方图例
      numLegend: {
        bottom: 0,
        itemGap: 25,
        itemWidth: 20,
        itemHeight: 20,
        data: [
          {
            name: "总次数",
            // 强制设置图形为圆。
            icon: "circle",

          },
          {
            name: "成功次数",
            // 强制设置图形为圆。
            icon: "circle",

          },
          {
            name: "失败次数",
            // 强制设置图形为圆。
            icon: "circle",

          }
        ]
      },
      numArray: {
        all: [
          1,
          2,
          3,
          4,
          5,
          6,
          7,
          8,
          9,
          2,
          3,
          4,
          5,
          6,
          7,
          8,
          9,
          3,
          4,
          5,
          6,
          7,
          8,
          9,
          1,
          2,
          3,
          4,
          5,
          6
        ],
        success: [
          1,
          2,
          3,
          4,
          5,
          6,
          7,
          8,
          9,
          2,
          3,
          4,
          5,
          6,
          7,
          8,
          9,
          3,
          4,
          5,
          6,
          7,
          8,
          9,
          1,
          2,
          3,
          4,
          5,
          6
        ],
        fail: [
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0
        ]
      },
      
    };
  },
  computed: {
    dateArray: function() {
      return dateUtil.getDateArray(
        this.datePicker[0],
        this.datePicker[1],
        3600 * 1000 * 24 * 1,
        "yyyy-MM-dd"
      );
    },
    numSeries: function() {
      let arr = [
        {
          // xAxisIndex: 0,
          name: "总次数",
          data: this.numArray.all,
          type: "line",
          color: "#036bc8",
          symbolSize: 6
        },
        {
          // xAxisIndex: 1,
          name: "成功次数",
          data: this.numArray.success,
          type: "line",
          color: "#4cb050",
          symbolSize: 6
        },
        {
          // xAxisIndex: 2,
          name: "失败次数",
          data: this.numArray.fail,
          type: "line",
          color: "#4bc0c0",
          symbolSize: 6
        }
      ];
      return arr;
    },

  },
  // 其他代码...
}
```
使用上述代码即可渲染出一个效果如下的折线图

### 总结
本文的主要作用如下
- 提供折线图的示例
- 提供日期相关的处理函数

更多的图表配置请查阅echarts的文档
https://www.echartsjs.com/zh/option.html#title

公众号：成的学习之路。跪求一波关注= =