<template>
  <div>
    <div class="uinfo">
      个人信息
      <ul>
        <img :src="uinfo.avatar_url" />
        <li>昵称：{{uinfo.full_name}}</li>
        <li>Mixin ID：{{uinfo.identity_number}}</li>
        <li>Phone：{{uinfo.phone}}</li>
        <li>个人签名：{{uinfo.biography}}</li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: "Home",
  data() {
    return {
      uinfo: {}
    };
  },
  methods: {
    async get_user() {
      this.uinfo = await this.APIS.get("/me");
      
    }
  },
  mounted() {
    this.get_user();
  }
};
</script>

<style scoped>
* {
  padding: 0;
  margin: 0;
}
.uinfo {
  margin: 10px;
}
ul,
li {
  list-style: none;
}

img {
  width: 5rem;
  height: 5rem;
}
</style>
