<!-- Dom模板 -->
<template>
    <div>
      <!-- Dom内容 -->
       Menu1
    </div>
  </template>
  
  <script>
  // import  from ''; // 引入组件
  // import  from '';
  
import api from '@/api/realm.js';
  export default {
    name: 'realmRoles',
    components: {},
    // inheritAttrs: false,
    // props: ['mess'],
    data () {
      return {}
    },
    // 生命周期 - 创建完成（访问当前this实例）
    created () {
      api.getRealmRoles().then(res => {
        console.log(res)
        if (res.data.code === 200) {
          this.$message.error('访问成功！')
        } else {
          this.$message.error('访问失败！')
        }
      }).catch(err => {
        this.$message.error(err)
      })
    },
    // 生命周期 - 挂载完成（访问DOM元素）
    mounted () {},
    computed: {},
    // Vue方法定义
    methods: {}
  }
  </script>
  
  <style scoped>
  /*@import url(''); 引入css类*/
  </style>