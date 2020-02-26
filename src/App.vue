<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
import { client_id } from "../keystore.json";
export default {
  methods: {
    to_auth() {
      window.localStorage.clear();
      window.location.href = `https://mixin.one/oauth/authorize?client_id=${client_id}&scope=SNAPSHOTS:READ+PROFILE:READ+PHONE:READ+ASSETS:READ+CONTACTS:READ&response_type=code&return_to=/`;
    }
  },
  mounted() {
    window._vm = this;
    if (!window.localStorage.getItem("token")) {
      this.to_auth();
    }
  }
};
</script>