<template>
  <div class="create-roles">
    <a-form ref="formRef" :model="formState" :rules="rules">
      <a-form-item ref="name" label="Role name" name="name">
        <a-input v-model:value="formState.name" />
      </a-form-item>
      <a-form-item label="Description" name="desc">
        <a-textarea v-model:value="formState.desc" />
      </a-form-item>
      <a-form-item :wrapper-col="{ span: 14, offset: 4 }">
        <a-button type="primary" @click="onSubmit">{{$t('create')}}</a-button>
        <a-button style="margin-left: 10px" @click="CancelForm">{{$t('cancel')}}</a-button>
      </a-form-item>
    </a-form>
  </div>
</template>
<script setup>
import { reactive, ref } from 'vue';
import { useRouter } from 'vue-router';
import api from '@/api/index.js';
import { useStore } from 'vuex';
import { message } from 'ant-design-vue';
const store = useStore();
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


const onSubmit = async () => {

  await store.dispatch('login/getToken', {})
  api.createRealmRoles(formState).then((res) => {
    if (res.status === 201 || res.status === 200) {
      // router.push('/home/roles');
      getRoleName();
    } else {
      console.error('Failed to create role', res);
    }
  }).catch((error) => {
    console.error('Error creating role', error);
  });

};

const CancelForm = () => {
  router.push('/home/roles');
};
const getRoleName = () => {
  api.getRealmRole({ name: formState.name }, 'name').then((res) => {
    if (res.status === 200) {
      store.commit('home/setRoleDetails', res.data); // 将角色详情存储到 Vuex 中
      router.push({ path: '/home/roles/details', query: { id: res.data.id } })
      message.success('Role details fetched successfully!');
    } else {
      message.error('Failed to fetch role details');
    }
  }).catch(() => {
    message.error('Error fetching role details');
  });
};
</script>

<style scoped lang="scss">
.ant-page-header {
  padding-left: 0;
}
</style>