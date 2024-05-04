
## uniapp input多功能输入框【增强版】
> **组件名：uaInput**
> 代码块： `<ua-input>`

uainput组件是基于uniapp input自定义加强版文本框输入，支持单行/多行输入(type="textarea")、自适应高度、禁用输入、一键清空、密码框、自定义输入框前缀/后缀插槽等功能。

> **注意事项**
> 如果想自定义图标，需要自己引入iconfont图标


### 引入方式

本组件符合[easycom](https://uniapp.dcloud.io/collocation/pages?id=easycom)规范，只需将本组件放在components目录，在页面`template`中即可直接使用。


### 基本用法 

**示例**

- 基础用法

```html
<ua-input v-model="value" placeholder="请输入" />
```

- 密码框/自动获取焦点

```html
<ua-input v-model="value" showPassword autofocus />
```

- 多行输入/自适应高度/清除功能

```html
<ua-input
	ref="inputRef"
	v-model="inputValue"
	type="textarea"
	:autosize="{maxRows: 6}"
	clearable
	placeholder="多行文本..."
	style="margin: 0 5px; width: 100%;"
/>
```

- 自定义自适应最大高度、清除事件、前置/后置插槽

```html
<ua-input
	class="flex1"
	v-model="editorText"
	type="textarea"
	:autosize="{maxRows: 6}"
	clearable
	placeholder="Prompt..."
	@clear="handleClear"
	style="margin: 0 5px; width: 100%;"
/>
	<template #prefix>
		<text class="iconfont ve-icon-search"></text>
	</template>
	<template #suffix>
		<text class="iconfont ve-icon-photo"></text>
		<text class="iconfont ve-icon-audio"></text>
	</template>
</ua-input>
```


### API

### uaInput Props 

|属性名|类型|默认值|说明|
|:-:|:-:|:-:|:-:|
|modelValue|Number/String|-| 绑定值 |
|type|String|text|文本框类型(text / password / textarea)|
|size  |String|default|尺寸(large / default / small)|
|disabled|Boolean|false| 禁用状态 |
|clearable|Boolean|false|是否可清空|
|showPassword |Boolean|false|是否切换密码|
|circle |Boolean|false|是否圆角|
|prefixIcon |String|-|输入框左侧图标|
|suffixIcon |String|-|输入框右侧图标|
|placeholder |String|-|输入框占位提示|
|maxlength |Number|-1|最大输入长度|
|autofocus |Boolean|false|自动获取焦点|
|autosize |Boolean/Object|false|自适应内容高度(仅type为textarea生效)|

#### 事件

- @change
- @input
- @focus
- @blur
- @clear
- @search



### 💝最后

开发不易，希望各位小伙伴们多多支持下哈~~ ☕️☕️
