<template>
  <div class="create-roles">
    <div class="custom-page-header">
      <a-breadcrumb>
        <a-breadcrumb-item v-for="(route, index) in routes" :key="index">
          <template v-if="route.path">
            <a @click="navigateTo(route.path)">{{ route.breadcrumbName }}</a>
          </template>
          <template v-else>
            <span>{{ route.breadcrumbName }}</span>
          </template>
        </a-breadcrumb-item>
      </a-breadcrumb>
      <h2 class="page-title">Role details</h2>
    </div>
    <a-form ref="formRef" :model="formState" :rules="rules">
      <a-form-item ref="name" label="Role name" name="name">
        <a-input v-model:value="formState.name" disabled />
      </a-form-item>
      <a-form-item label="Description" name="desc">
        <a-textarea v-model:value="formState.desc" />
      </a-form-item>
      <a-form-item :wrapper-col="{ span: 14, offset: 4 }">
        <a-button type="primary" @click="onSubmit">Save</a-button>
        <a-button style="margin-left: 10px" @click="CancelForm">Cancel</a-button>
      </a-form-item>
    </a-form>
  </div>
</template>

<script setup>
import { reactive, ref, onMounted } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import api from '@/api/index.js';

const router = useRouter();
const route = useRoute(); // 获取当前路由信息
const formRef = ref();
const formState = reactive({
  name: '',
  desc: '',
});
const rules = {
  name: [
    {
      required: true,
      message: 'Role name is required',
      trigger: 'blur',
    },
  ],
};

const routes = [
  {
    path: '/home/roles',
    breadcrumbName: 'Realm roles',
  },
  {
    path: '',
    breadcrumbName: 'Role details',
  },
];

// 提交表单
const onSubmit = () => {
  formRef.value.validate().then(async () => {
    await this.$store.dispatch('login/getToken', {})
    api.updateRealmRole(route.params.id, formState).then((res) => {
      if (res.status === 200) {
        router.push('/home/roles');
      } else {
        console.error('Failed to update role', res);
      }
    }).catch((error) => {
      console.error('Error updating role', error);
    });
  }).catch((error) => {
    console.log('Validation error', error);
  });
};

// 跳转到指定路径
const navigateTo = (path) => {
  if (path) {
    router.push(path);
  }
};

// 取消操作
const CancelForm = () => {
  router.push('/home/roles');
};

// 生命周期 - 获取角色详情
onMounted(async () => {
  const id = route.query.id; // 从路由参数中获取 id
  if (id) {
    // 调用获取角色详情的方法
    await this.$store.dispatch('login/getToken', {})
    api.getRealmRole({key:id}).then((res) => {
      if (res.status === 200) {
        formState.name = res.data.name; // 设置角色名称
        formState.desc = res.data.description; // 设置角色描述
      } else {
        console.error('Failed to fetch role details', res);
      }
    }).catch((error) => {
      console.error('Error fetching role details', error);
    });
  } else {
    console.error('No role ID found in route parameters');
  }
});
</script>

<style scoped lang="scss">
.ant-page-header {
  padding-left: 0;
}
</style>