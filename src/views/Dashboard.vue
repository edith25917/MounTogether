<template>
  <div class="body">
    <dHeader></dHeader>
    <router-view></router-view>
  </div>
</template>

<script>
import axios from "axios";
import dHeader from "../components/header/dHeader";

export default {
  data() {
    return {
      selectedFile: null,
    };
  },
  components: {
    dHeader,
  },
};
</script>

<style scoped>
* {
  margin: 0;
  box-sizing: border-box;
}

.body {
  max-width: 960px;
  width: 90%;
  margin: auto;
}

.coverphoto {
  background-image: url("../assets/coverPhoto.jpg");
  background-color: #cccccc;
  height: 250px;
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  border-radius: 10px;
  margin-top: 30px;
}

.profilephoto {
  position: relative;
  width: 150px;
  margin: -80px 0 0 20px;
  border-radius: 50%;
}

.btnIcon {
  background-color: rgba(1, 162, 166);
  border-radius: 50%;
  color: white;
  font-size: 20px;
  position: absolute;
  padding: 0px 7px;
  bottom: 0;
  right: 0;
  margin: 5px;
  border: 1px solid rgba(1, 162, 166);
  transition: transform 80ms ease-in;
}

.btnIcon:active {
  transform: scale(0.95);
}

.btnIcon:focus {
  outline: none;
}

.profilephoto > img {
  border: 2px solid lightgray;
  border-radius: 50%;
  width: 150px;
}

.personalInfo .wrap {
  display: flex;
  align-items: left;
  justify-content: left;
}

.item-basic {
  margin-top: 5px;
  margin-left: 40px;
  width: 25%;
}

.item-name div {
  display: inline-block;
}

h5 {
  font-size: 28px;
}

.item-intro {
  margin-top: -30px;
  width: 400px;
}
/* .item .txt {
  width: 55%;
  background-color: #fa8;
  flex-shrink: 0;
  padding: 50px 30px;
  box-sizing: border-box;
  position: relative;
  z-index: 1;
}

.item > fist-child {
  margin-right: -10%;
} */
</style>