<template>
  <div id="bk">
    <div id="topB">
      <div class="webName">
        <div>
          <img src="../assets/mountain.png" width="25" style="margin-bottom:0.3em" />
        </div>
        <div style="margin-left:5px; color: darkgreen;">山人同行</div>
      </div>
      <div class="userBlock">
        <!-- <div class="search">
          <input type="text" class="searchBar" placeholder="查找登山團" />
          <div class="glass"></div>
        </div>-->
        <div class="userPic"></div>
        <div class="userName">王曉明</div>
        <router-link to="/login" class="login">
          <i class="fa fa-sign-out" aria-hidden="true"></i>
          登出
        </router-link>
        <router-view />
        <!-- <button class="logOutBTN">登出</button> -->
        <div class="bell"></div>
      </div>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style  scoped>
#topB {
  width: 65%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: darkgreen;
  font-weight: bold;
  align-content: center;
}
#bk {
  display: flex;
  justify-content: center;
  background-color: rgb(241, 241, 241);
  height: 60px;
}
.webName {
  display: flex;
  font-size: 1.8em;
  align-items: center;
}
.userBlock {
  display: flex;
}

.userPic {
  background: url("../assets/head01.png") center/cover no-repeat;
  width: 23px;
  height: 23px;
  margin-right: 8px;
}
.userName {
  margin-right: 20px;
}
.bell {
  width: 23px;
  height: 23px;
  background: url("../assets/bell.png") center/cover no-repeat;
  margin-right: 15px;
}
.logOutBTN {
  font-size: 15px;
  margin-right: 15px;
  border: 1px gray soild;
}
.login {
  color: black;
  margin-right: 20px;
  padding-right: 8px;
  padding-left: 8px;
  /* border: 1px solid gray; */
  border-radius: 10px;
  background-color: rgb(223, 223, 223);
  /* font-weight: normal; */
}
</style>