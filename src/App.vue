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

  },
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  height: 100vh;
  width: 100vw;
}
@import './styles/index.scss';
</style>
