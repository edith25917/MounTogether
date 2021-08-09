<template>
  <div class="footer">
    <main>
      <!-- <div class="left">
        <div class="item">關於我們</div>
        <div class="item">服務條款與隱私政策</div>
      </div>-->

      <div class="item">Copyright © 2020 Mountogether. All rights reserved.</div>
      <!-- <div>test</div> -->
    </main>
  </div>
</template>

<script>
export default {};
</script>

<style scoped>
.footer {
  width: 100%;
  background-color: rgb(102, 173, 146);
}
.left {
  display: flex;
}
main {
  /* width: 65%;s */
  margin: auto;
  text-align: right;
  padding: 5px;
}
.item {
  text-align: center;
  color: ivory;
  flex: none;
  /* width: 200px; */
  margin: 2px;
  margin-right: 30px;
  /* background-color: hotpink; */
  width: 100%;
  white-space: nowrap;
  overflow-x: scroll;
  /* background: springgreen; */
}

.item::-webkit-scrollbar {
  display: none;
}
</style>