<template>
  <div></div>
</template>

<script>
import { authenticate } from "../api";

export default {
  async mounted() {
    let { _vm } = window;
    let error = getUrlParameter("error");
    let authorizationCode = getUrlParameter("code");
    let returnTo = getUrlParameter("return_to");
    debugger
    if (!authorizationCode || error === "access_denied") return _vm.to_auth();
    returnTo = !returnTo ? "/" : returnTo;
    let { data } = await authenticate(authorizationCode);
    window.localStorage.setItem("token", data.access_token);
    window.localStorage.setItem("scope", data.scope);
    this.$router.push(returnTo);
  }
};

function getUrlParameter(name) {
  name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
  var regex = new RegExp("[\\?&]" + name + "=([^&#]*)");
  var results = regex.exec(window.location.search);
  return results === null
    ? ""
    : decodeURIComponent(results[1].replace(/\+/g, " "));
}
</script>

<style>
</style>
