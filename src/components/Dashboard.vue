<template>
  <div>这是一个组合式 API 组件</div>
  <div>
    <h1>{{ message }}</h1>
    <button @click="changeMessage">Change Message</button>
    <button>{{ doubledNumber }}</button>
  </div>
</template>
  
  <script setup>

import { onBeforeMount, onMounted, onBeforeUpdate, onUpdated, onBeforeUnmount, onUnmounted } from 'vue';

// 组件的逻辑代码
import { ref,computed  } from 'vue';

// 定义响应式数据
const message = ref('Hello, Vue 3!');



// 在组件挂载之前执行
onBeforeMount(() => {
  console.log('组件即将挂载');
});

// 在组件挂载完成后执行
onMounted(() => {
    console.log('组件已挂载');
    setSumToTen();
});

// 在组件更新之前执行
onBeforeUpdate(() => {
  console.log('组件即将更新');
});

// 在组件更新完成后执行
onUpdated(() => {
  console.log('组件已更新');
});

// 在组件卸载之前执行
onBeforeUnmount(() => {
  console.log('组件即将卸载');
});

// 在组件卸载完成后执行
onUnmounted(() => {
  console.log('组件已卸载');
});
// 定义一个响应式数据
const number = ref(1);

// 创建一个只读计算属性
const doubledNumber = computed(() => {
  return number.value * 2;
});
// 定义两个响应式数据
const num1 = ref(2);
const num2 = ref(3);

// 创建一个可写计算属性
const sum = computed({
  get() {
    return num1.value + num2.value;
  },
  set(newValue) {
    // 这里简单地将差值加到 num1 上
    num1.value = newValue - num2.value;
  }
});
// 定义一个方法来设置和的值
const setSumToTen = () => {
  sum.value = 10;
};
</script>
  
<style scoped>
/* 组件的样式，scoped 表示样式仅作用于当前组件 */
</style>

  
 