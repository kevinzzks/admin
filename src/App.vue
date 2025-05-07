<template>
  <router-view />
</template>

<script>
// import Keycloak from 'keycloak-js';
export default {
  name: 'App',
  components: {
    // HelloWorld
  },
  mounted() {
    // function initKeycloak() {
    //   const keycloak = new Keycloak({
    //     url: 'https://10.96.177.104:8443',
    //     realm: 'master',
    //     clientId: 'myclient',
    //   });
    //   keycloak.init({
    //     onLoad: 'login-required',
    //     checkLoginIframe: false,
    //     redirectUri: window.location.origin
    //   }).then((authenticated) => {
    //     if (authenticated) {
    //       console.log('Authenticated',authenticated);
    //       // You can now use the token for API calls
    //       console.log(keycloak.token);
    //     } else {
    //       console.warn('Not authenticated');
    //     }
    //   }).catch((error) => {
    //     console.error('Failed to initialize Keycloak', error);
    //   });
    // }
    // initKeycloak();
    const urlParams = new URLSearchParams(window.location.search); // 获取 URL 查询参数
    const realm = urlParams.get('realm') || this.$store.state.local.realm || ''; // 获取领域信息
    const clientId = urlParams.get('clientId') || this.$store.state.local.clientId || ''; // 获取客户端 ID
    this.$store.commit('local/setRealmName', realm);
    this.$store.commit('local/setClientId', clientId);
  },
}
</script>

<style>
@import "./styles/index.scss";
</style>
