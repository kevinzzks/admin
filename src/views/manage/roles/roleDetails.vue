<template>
  <div class="create-roles">
    <a-form ref="formRef">
      <a-form-item ref="name" label="Role name" name="name">
        <a-input v-model:value="store.state.home.roleDetails.name" disabled />
      </a-form-item>
      <a-form-item label="Description" name="desc">
        <a-textarea :value="store.state.home.roleDetails.description" @change="setDesc" />
      </a-form-item>
      <a-form-item :wrapper-col="{ span: 14, offset: 4 }">
        <a-button type="primary" @click="onSubmit">Save</a-button>
        <a-button style="margin-left: 10px" @click="CancelForm">{{$t('cancel')}}</a-button>
      </a-form-item>
    </a-form>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import api from '@/api/index.js';
import { useStore } from 'vuex';
import { message } from 'ant-design-vue';

const store = useStore();
const router = useRouter();
const formRef = ref();

// 提交表单
const onSubmit = async() => {
    await store.dispatch('login/getToken', {});
    let formData = {
      ...store.state.home.roleDetails
    };
    api.updateRealmRole(formData).then((res) => {
      if (res.status === 200 || res.status === 204) {
        message.success('Role updated successfully!');
      } else {
        message.error('Failed to update role');
      }
    }).catch(() => {
      message.error('Error updating role');
    });
};

// 取消操作 Validation error
const CancelForm = () => {
  router.push('/home/roles');
};
const setDesc = (e) => {
  store.commit('home/setRoleDetails', { description:  e.target.value })
};
</script>

<style scoped lang="scss">
.ant-page-header {
  padding-left: 0;
}
</style>