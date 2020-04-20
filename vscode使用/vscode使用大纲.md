# vscode使用大纲
## 自定义代码片段（以vue为例）
1. 文件 ==> 首选项 ==> 用户代码片段 ==> 输入  vue 然后回车
2. 添加配置，让vscode允许自定义的代码片段提示出来
```
	"Print to console": {
	"prefix": "vue",
	"body": [

			"<template>",
			"  <div>\n",
			"  </div>",
			"</template>",
      "<script>", 
			"export default {",
			"  name: \"\","
			"  data() {",
			"    return {",
			""
			"    }",
			"  },",
			"  methods: {",
			""
			"  }",
			"}",
			"</script>",
			"<style>",

      "</style>",

			"$2"
		],
		"description": "Log output to console"
	}
```