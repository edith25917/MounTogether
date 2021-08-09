<template>
  <div class="body" v-on:="getInfo()">
    <!-- 封面照 -->
    <div class="coverphoto"></div>
    <br />
    <!-- 大頭照 -->

    <div class="personalInfo">
      <div class="wrap">
        <div class="profilephoto">
          <img :src="image" />
          <input
            style="display:none"
            type="file"
            ref="fileInput"
            @change="onFileSelected"
            accept=".jpg, .jpeg, .png"
          />
          <button v-if="isMyProfile" class="btnIcon" @click="$refs.fileInput.click()">+</button>
        </div>
        <div class="item-basic">
          <h5>{{name}}</h5>
          <!-- <div class="item-name">
            <div class="levelBar">--------------</div>
            <span>小菜鳥</span>
          </div>-->
        </div>
      </div>
      <div class="item-intro">
        <p class="placeholder" v-if="!aboutMySelf&&isMyProfile">新增自介，讓大家認識你吧!</p>
        <p>{{aboutMySelf}}</p>
      </div>

      <div class="setting" v-if="isMyProfile">
        <router-link
          :to="'/dashboard/'+this.$store.getters.myUserName+'/edit'"
          type="button"
          class="btnSetting"
          v-on:inPersonalPage="inPersonalPage"
        >編輯個人資料</router-link>
      </div>
      <friendsButton v-if="!isMyProfile" class="setting" v-bind:friend="friend"></friendsButton>
    </div>

    <div>
      <nav>
        <ul v-if="!inPersonalPage" class="ul">
          <li>
            <router-link class="menu" :to="'/dashboard/'+this.$store.getters.userId" exact>
              <i class="fa fa-flag" aria-hidden="true"></i>
              <span>足跡</span>
            </router-link>
          </li>
          <li v-if="isMyProfile">
            <router-link
              class="menu"
              :to="'/dashboard/'+this.$store.getters.userId+'/activity'"
              exact
            >
              <i class="fas fa-hiking"></i>
              <span>活動</span>
            </router-link>
          </li>
          <li>
            <router-link class="menu" :to="'/dashboard/'+this.$store.getters.userId+'/album'">
              <i class="fa fa-photo"></i>
              <span>回憶相簿</span>
            </router-link>
          </li>
          <li>
            <router-link class="menu" :to="'/dashboard/'+this.$store.getters.userId+'/friends'">
              <i class="fa fa-user" aria-hidden="true"></i>
              <span>好友</span>
            </router-link>
          </li>
        </ul>
        <h6 v-if="inPersonalPage">編輯個人資料</h6>
      </nav>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import FormData from "form-data";
import api from "../../utils/api.js";
import friendsButton from "../dashboard/friends/friendsButton";

export default {
  data() {
    return {
      selectedFile: null,
      defaultImage: require("@/assets/defaultProfile.png"),
      image: "",
      name: "",
      aboutMySelf: "",
      myFriends: [],
      relationshipId: "",
      friend: [],
      isDone: false,
    };
  },
  watch: {
    $route: {
      handler: function (old, newval) {
        this.getInfo();
        this.getPhoto();
        this.friend = {
          user: {
            userName: this.$store.getters.userId,
          },
        };
      },
    },
  },
  computed: {
    auth() {
      return this.$store.getters.isAuthenticated;
    },
    inPersonalPage() {
      return this.$store.getters.inPersonalPage;
    },
    isMyProfile() {
      return this.$store.getters.userId == this.$store.getters.myUserName;
    },
    myUserName() {
      return this.$store.getters.myUserName;
    },
    userId() {
      return this.$store.getters.userId;
    },
    idToken() {
      return this.$store.getters.idToken;
    },
  },
  components: {
    friendsButton,
  },
  methods: {
    onFileSelected(event) {
      this.selectedFile = event.target.files[0];
      this.onUpload();
    },
    onUpload() {
      const fd = new FormData();
      fd.append("file", this.selectedFile, this.selectedFile.name);
      api
        .uploadPhoto(fd, this.idToken)
        .then((res) => {
          this.getPhoto();
        })
        .catch((err) => {
          console.log(err);
        });
    },
    getPhoto() {
      api
        .loadPhoto(this.userId)
        .then((res) => {
          if (
            res.data.msg != "http://35.194.165.190:80/user/null" &&
            res.data.msg != "http://35.194.165.190:80/user/defaultUserPhoto.jpg"
          ) {
            this.image = res.data.msg;
          } else {
            this.image = this.defaultImage;
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
    toEditPage() {
      this.$router.push("/dashboard/" + this.userId + "/edit");
    },
    getInfo() {
      api
        .getInfo(this.userId)
        .then((res) => {
          this.name = res.data.data.name;
          this.aboutMySelf = res.data.data.aboutMySelf;
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
  mounted() {
    this.getInfo();
    this.getPhoto();
    this.friend = {
      user: {
        userName: this.$store.getters.userId,
      },
    };
  },
  created() {
    this.$store.commit("setUserId", this.$route.params.userId);
  },
};
</script>

<style scoped>
* {
  margin: 0;
  box-sizing: border-box;
}

h6 {
  margin: 10px;
  font-weight: bold;
  font-size: 20px;
}

.body {
  max-width: 100%;
  margin: auto;
}
.coverphoto {
  background-image: url("../../assets/coverPhoto.jpg");
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
  border-radius: 50%;
}

.btnIcon {
  background-color: #f7f7f7;
  border-radius: 50%;
  color: #3d454d;
  font-size: 20px;
  position: absolute;
  padding: 0px 7px;
  bottom: 0;
  right: 0;
  margin: 5px;
  border: 1px solid #f7f7f7;
}

.btnSetting,
.btnAdd {
  background-color: #f7f7f7;
  border-radius: 5px;
  color: #3d454d;
  font-size: 14px;
  font-weight: bold;
  padding: 6px 20px;
  border: 1px solid #f7f7f7;
  transition: transform 80ms ease-in;
  box-shadow: 1px 1px 5px rgb(216, 215, 215);
  text-decoration: none;
}

.btnSetting.router-link-active {
  background-color: #f9a428;
  color: #fff;
  border: 1px solid #f9a428;
}

button {
  transition: transform 80ms ease-in;
  box-shadow: 2px 2px 8px #888;
}

button:active {
  transform: scale(0.95);
}

button:focus {
  outline: none;
}

.profilephoto > img {
  border: 2px solid lightgray;
  border-radius: 50%;
  width: 150px;
  height: 150px;
}

.personalInfo {
  width: 90%;
  display: flex;
  align-items: left;
  justify-content: space-between;
  flex-wrap: wrap;
  padding: 10px;
  margin-top: -80px;
}

.personalInfo .wrap {
  flex: 1;
}

.item-intro {
  flex: 2;
  width: 100%;
  align-self: center;
  margin-top: 50px;
}

.placeholder {
  font-size: 14px;
  color: #9f9f9f;
  word-spacing: 2px;
}

.setting {
  flex: 1;
  align-self: center;
  text-align: right;
  min-width: fit-content;
  white-space: nowrap;
}

.item-basic {
  margin-top: 10px;
  margin-left: 20px;
}

.item-name div {
  display: inline-block;
}

h5 {
  font-size: 28px;
}

nav {
  height: 100%;
  border-bottom: 1px solid lightgray;
  margin-top: 30px;
}

ul {
  list-style: none;
  padding: 0;
  height: 100%;
  display: flex;
  flex-flow: row;
  align-items: center;
  overflow-x: scroll;
}

.ul::-webkit-scrollbar {
  display: none;
}

li {
  margin: 0 16px;
  width: 100px;
  display: flex;
  justify-content: center;
}

li a {
  text-decoration: none;
  font-size: 14px;
  color: rgb(173, 173, 173);
}

li a:hover,
li a:active,
.active,
li a.router-link-active {
  color: rgb(58, 58, 58);
}

li a.router-link-active {
  padding: 0 8px 0px 0;
  border-bottom: 2px solid black;
}

span {
  font-weight: bold;
}

i {
  margin: 0 10px 10px 8px;
}

.fa-check {
  margin: 0;
}

.menu {
  min-width: fit-content;
  white-space: nowrap;
}
</style>