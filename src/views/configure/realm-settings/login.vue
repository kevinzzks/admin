<template>
  <div class="login-settings">
    <div class="page-section">
      <div class="settings-container">
        <div class="settings-card kc-login-screen">
          <h3 class="settings-title">登录界面定制</h3>
          <ul class="settings-list">
            <li class="settings-item">
              <div class="settings-row">
                <span class="settings-label">用户注册</span>
                <div class="settings-control">
                  <a-switch
                    :checked="realmDetails.registrationAllowed"
                    @change="(e)=>updateRealm({ registrationAllowed: e })"
                  />
                  <span
                    class="settings-status"
                  >{{ realmDetails.registrationAllowed ? 'ON' : 'OFF' }}</span>
                </div>
              </div>
            </li>
            <li class="settings-item">
              <div class="settings-row">
                <span class="settings-label">忘记密码</span>
                <div class="settings-control">
                  <a-switch
                    :checked="realmDetails.resetPasswordAllowed"
                    @change="(e)=>updateRealm({ resetPasswordAllowed: e })"
                  />
                  <span
                    class="settings-status"
                  >{{ realmDetails.resetPasswordAllowed ? 'ON' : 'OFF' }}</span>
                </div>
              </div>
            </li>
            <li class="settings-item">
              <div class="settings-row">
                <span class="settings-label">记住我</span>
                <div class="settings-control">
                  <a-switch
                    :checked="realmDetails.rememberMe"
                    @change="(e)=>updateRealm({ rememberMe: e })"
                  />
                  <span class="settings-status">{{ realmDetails.rememberMe ? 'ON' : 'OFF' }}</span>
                </div>
              </div>
            </li>
          </ul>
        </div>

        <div class="settings-card kc-email-settings">
          <h3 class="settings-title">邮箱设置</h3>
          <ul class="settings-list">
            <li class="settings-item">
              <div class="settings-row">
                <span class="settings-label">使用邮箱作为用户名</span>
                <div class="settings-control">
                  <a-switch
                    :checked="realmDetails.registrationEmailAsUsername"
                    @change="(e)=>updateRealm({ registrationEmailAsUsername: e,duplicateEmailsAllowed: false })"
                  />
                  <span
                    class="settings-status"
                  >{{ realmDetails.registrationEmailAsUsername ? 'ON' : 'OFF' }}</span>
                </div>
              </div>
            </li>
            <li class="settings-item">
              <div class="settings-row">
                <span class="settings-label">使用邮箱登录</span>
                <div class="settings-control">
                  <a-switch
                    :checked="realmDetails.loginWithEmailAllowed"
                    @change="(e)=>updateRealm({ loginWithEmailAllowed: e })"
                  />
                  <span
                    class="settings-status"
                  >{{ realmDetails.loginWithEmailAllowed ? 'ON' : 'OFF' }}</span>
                </div>
              </div>
            </li>
            <li class="settings-item">
              <div class="settings-row">
                <span class="settings-label">允许重复邮箱</span>
                <div class="settings-control">
                  <a-switch
                    :checked="realmDetails.duplicateEmailsAllowed"
                    :disabled="realmDetails.registrationEmailAsUsername"
                    @change="(e)=>updateRealm({ duplicateEmailsAllowed: e })"
                  />
                  <span
                    class="settings-status"
                  >{{ realmDetails.duplicateEmailsAllowed ? 'ON' : 'OFF' }}</span>
                </div>
              </div>
            </li>
            <li class="settings-item">
              <div class="settings-row">
                <span class="settings-label">验证邮箱</span>
                <div class="settings-control">
                  <a-switch
                    :checked="realmDetails.verifyEmail"
                    @change="(e)=>updateRealm({ verifyEmail: e })"
                  />
                  <span class="settings-status">{{ realmDetails.verifyEmail ? 'ON' : 'OFF' }}</span>
                </div>
              </div>
            </li>
          </ul>
        </div>

        <div class="settings-card kc-user-info-settings">
          <h3 class="settings-title">用户信息设置</h3>
          <ul class="settings-list">
            <li class="settings-item">
              <div class="settings-row">
                <span class="settings-label">允许编辑用户名</span>
                <div class="settings-control">
                  <a-switch
                    :checked="realmDetails.editUsernameAllowed"
                    @change="(e)=>updateRealm({ editUsernameAllowed: e })"
                  />
                  <span
                    class="settings-status"
                  >{{ realmDetails.editUsernameAllowed ? 'ON' : 'OFF' }}</span>
                </div>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex';
import api from '@/api'; 
export default {
  name: 'LoGin',
  components: {

  },
  computed: {
    ...mapState({
      realmDetails: state => state.login.realmDetails // Assuming 'realm' is a state in your Vuex store
    })
  },
  data() {
    return {

    }
  },
  // 生命周期 - 创建完成（访问当前this实例）
  created() {
    window.global = this;
  },

  // 生命周期 - 挂载完成（访问DOM元素）
  mounted() {


  },

  // Vue方法定义
  methods: {
    ...mapMutations({
      setRealmDetails: 'login/setRealmDetails' // Assuming 'UPDATE_REALM' is a mutation in your Vuex store
    }),
    updateRealm(data) {
      this.setRealmDetails(data); // Assuming 'setRealmDetails' is a mutation in your Vuex store
      api.setRealm(this.realmDetails)
        .then(res => {
          if (res.status === 200 || res.status === 204) {
            this.$message.success('更新成功');
          } else {
            this.$message.error(res.msg);
          }
        })
        .catch(() => {
          this.$message.error('更新失败');
        });
    }
  }
}
</script>

<style lang="scss" scoped>
.login-settings {

  .settings-container {
    display: grid;
    gap: 24px;
    padding: 16px 0;
    max-width: 1000px;
  }

  .settings-card {
    background: #fff;
    border-radius: 8px;
    padding: 24px;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  }

  .settings-title {
    font-size: 18px;
    font-weight: 600;
    color: #1a1f36;
    margin-bottom: 20px;
    padding-bottom: 12px;
    border-bottom: 1px solid #e6e8f0;
  }

  .settings-list {
    list-style: none;
    padding: 0;
    margin: 0;
  }

  .settings-item {
    &:not(:last-child) {
      margin-bottom: 16px;
      padding-bottom: 16px;
      border-bottom: 1px solid #f0f0f0;
    }
  }

  .settings-row {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .settings-label {
    font-size: 14px;
    color: #374151;
  }

  .settings-control {
    display: flex;
    align-items: center;
    gap: 12px;
  }

  .settings-status {
    font-size: 12px;
    color: #6b7280;
    min-width: 32px;
  }

  :deep(.ant-switch) {
    min-width: 44px;
    height: 22px;

    &.ant-switch-checked {
      background-color: #1890ff;
    }
  }
}
</style>

