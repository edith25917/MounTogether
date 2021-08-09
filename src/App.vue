<template>
  <div>
    <Header></Header>
    <router-view></router-view>
  </div>
</template>

<script>
import Header from "./components/header/header";

export default {
  components: {
    Header
  },
  created() {
    //dispatch()這個方法是用來呼叫Vuex.Store Instance中的actions中的方法
    this.$store.dispatch("tryAutoLogin");
  },
  mounted() {
    // 檢測瀏覽器路由改變頁面不重新整理問題,hash模式的工作原理是hashchange事件
    window.addEventListener(
      "hashchange",
      () => {
        let currentPath = window.location.hash.slice(1);
        if (this.$route.path !== currentPath) {
          this.$router.push(currentPath);
        }
      },
      false
    );
  }
};
</script>

<style>
* {
  font-family: "微軟正黑體";
}
</style>
