
<!-- 状态映射 -->
<template>
  <div>
    <el-tag :type="dictMap[dictKey].type">{{ dictMap[dictKey].name }}</el-tag>
  </div>
</template>

<script setup>
const props = defineProps({
  dictKey: Number,
  dictType: String,
})

const dicts = {
  status: {
    0: { type: "error", name: "禁用" },
    1: { type: "primary", name: "启用" },
  },
  menu: {
    1: { type: "primary", name: "目录"},
    2: { type: "success", name: "菜单"},
    3: { type: "warning", name: "按钮"}
  },
  sex: {
    1: { type: "primary", name: "男"},
    2: { type: "danger", name: "女"}
  }
}

const dictMap = dicts[props.dictType] || { [props.dictKey]: { type: "info", name: props.dictKey }}
</script>