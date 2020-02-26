<template>
  <div></div>
</template>

<script>
import tools from "@/assets/js/tools";
import { authenticate } from "../api";

export default {
  async mounted() {
    let { _vm } = window;
    let error = tools.getUrlParameter("error");
    let authorizationCode = tools.getUrlParameter("code");
    let returnTo = tools.getUrlParameter("return_to");
    console.log(_vm);
    if (!authorizationCode) {
      return _vm.to_auth();
    }
    returnTo = !returnTo ? "/" : returnTo;
    if (error === "access_denied") {
      this.$message.error("Access denied.");
      return _vm.to_auth();
    }
    let { data } = await authenticate(authorizationCode);
    window.localStorage.setItem("token", data.access_token);
    window.localStorage.setItem("scope", data.scope);
    this.$router.push(returnTo);
  }
};
</script>

<style>
</style>
