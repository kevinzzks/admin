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
      <h2 class="page-title">Create role</h2>
    </div>
    <a-form ref="formRef" :model="formState" :rules="rules">
      <a-form-item ref="name" label="Role name" name="name">
        <a-input v-model:value="formState.name" />
      </a-form-item>
      <a-form-item label="Description" name="desc">
        <a-textarea v-model:value="formState.desc" />
      </a-form-item>
      <a-form-item :wrapper-col="{ span: 14, offset: 4 }">
        <a-button type="primary" @click="onSubmit">Create</a-button>
        <a-button style="margin-left: 10px" @click="CancelForm">Cancel</a-button>
      </a-form-item>
    </a-form>
  </div>
</template>
<script setup>
import { reactive, ref } from 'vue';
import { useRouter } from 'vue-router';
import api from '@/api/index.js';
const router = useRouter();
const formRef = ref();
const formState = reactive({
  name: '',
  desc: '',
});
const rules = {
  name: [
    {
      required: true,
      message: 'Required field',
      trigger: 'change',
    },
  ]
};
// 

const routes = [
  {
    path: '/home/roles',
    breadcrumbName: 'Realm roles',
  },
  {
    path: '',
    breadcrumbName: 'Create role',
  },

];

const onSubmit = () => {
  console.log(api);
  formRef.value.validate().then(() => {
    api.createRealmRoles(formState).then((res) => {
      console.log(res);
      if (res.status === 201) {
        router.push('/home/roles');
      } else {
        console.error('Failed to create role', res);
      }
    }).catch((error) => {
      console.error('Error creating role', error);
    });
  })
    .catch(error => {
      console.log('error', error);
    });


};
const navigateTo = (path) => {
  if (path) {
    router.push(path);
  }
};
const CancelForm = () => {
  router.push('/home/roles');
};
</script>

<style scoped lang="scss">
.ant-page-header {
  padding-left: 0;
}
</style>