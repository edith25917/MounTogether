<template>
  <div id="header">
    <div class="home" style="margin-left:2%;">
      <!-- <router-link to="/"></router-link> -->
      <div class="home">
        <router-link to="/" exact>
          <img class="logo" src="@/assets/mountain-green.png" style />山人同行
        </router-link>
      </div>
    </div>
    <nav>
      <div class="list">
        <!-- <li class="home">
          <router-link to="/" exact>山人同行</router-link>
        </li>-->
        <li v-if="!auth" class="signUp">
          <router-link to="/signup">註冊</router-link>
        </li>
        <li v-if="!auth" class="signIn">
          <router-link to="/signin">登入</router-link>
        </li>

        <!-- 交友邀請icon -->
        <li v-if="auth">
          <div class="friend-icon" v-on-clickaway="away">
            <div class="invitations" @click="changeClick()">
              <div class="circle" v-if="hasInvitation"></div>
              <span style=" color:gray;">
                <i class="fa fa-user-plus" aria-hidden="true"></i>
              </span>
            </div>
            <dropdown class="dropdown" v-show="clicked" ref="dropdownMenu"></dropdown>
          </div>
        </li>
        <!-- 會員icon -->
        <li v-if="auth" class="dashboard" @click="changeUserId()">
          <!-- <router-link :to="'/dashboard/'+this.$store.getters.myUserName"> -->
          <div>
            <img class="profile" :src="image" />
          </div>
          <!-- </router-link> -->
          <div class="submenu">
            <li class="logOut">
              <button @click="onLogout" class="logout">
                <i class="fa fa-sign-out" aria-hidden="true"></i>
                <span>登出</span>
              </button>
            </li>
          </div>
        </li>
      </div>
    </nav>
  </div>
</template>
 
<script>
import dropdown from "../dashboard/friends/dropdown.vue";
import { mixin as clickaway } from "vue-clickaway";
import api from "@/utils/api.js";

export default {
  mixins: [clickaway],

  data() {
    return {
      clicked: false,
      defaultImage: require("@/assets/defaultProfile.png"),
      image: "",
      name: "",
    };
  },
  computed: {
    auth() {
      return this.$store.getters.isAuthenticated;
    },
    hasInvitation() {
      return this.$store.getters.hasInvitation;
    },
  },
  components: {
    dropdown,
  },
  watch: {
    $route: {
      handler: function (old, newval) {
        this.getInfo();
        this.getPhoto();
      },
    },
  },
  methods: {
    onLogout() {
      this.$store.dispatch("logout");
    },
    changeUserId() {
      this.$store.commit("setUserId", this.$store.getters.myUserName);
      this.$router.push("/dashboard/" + this.$store.getters.myUserName);
    },
    changeClick() {
      this.clicked = !this.clicked;
    },
    away: function (e) {
      this.clicked = false;
    },
    getPhoto() {
      api
        .loadPhoto(this.$store.getters.myUserName)
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
    getInfo() {
      api
        .getInfo(this.$store.getters.myUserName)
        .then((res) => {
          if (!res.data.data) {
            return;
          }
          this.name = res.data.data.name;
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
  mounted() {
    this.getPhoto();
    this.getInfo();
  },
};
</script>

<style scoped>
.list {
  font-weight: bold;
  list-style: none;
  margin: 0;
  padding: 0;
  height: 100%;
  display: flex;
  flex-flow: row;
  align-items: center;
}

.home {
  font-size: 1.8rem;
  color: rgb(249, 250, 250) !important;
  margin: 0;
}

.dashboard {
  cursor: pointer;
}

#header {
  width: 100%;
  height: 4em;
  display: flex;
  flex-flow: row;
  align-items: center;
  justify-content: space-between;
  /* background-color: #cccccce5; */
  background-color: rgb(248, 250, 249);
  /* background: url("https://lh3.googleusercontent.com/proxy/od0HiQpyAdKNNzrx_Sg1tmLHapn9tgZ6nK3DiFKG83QnB9dm8eYYBcVkK6M6qB0bSEHZvj7nnxASVNdQd0uVg_fGk9dasItmV6hXELhc9RRs-T1UtQkhl2VMvITiY7UM0_FUWWkTA-W3oyGQI-OcRU7vx_E0KftWa1SKdWq1KJ1jkJEUhw"); */
  /* padding: 0 10px; */
}

/* .logo {
  font-weight: bold;
  color: white;
}

.logo a {
  text-decoration: none;
  color: white;
} */

.logo {
  max-width: 2.8rem;
  max-height: 2.8rem;
}

nav {
  height: 100%;
  position: relative;
  margin-right: 3%;
}

li {
  margin: 0 10px;
}

li a {
  text-decoration: none;
  color: gray;
  padding: 10px 20px;
}

.home a {
  color: #365347;
  font-weight: bold;
}

.home a:hover,
.home a:active,
.home a.router-link-active {
  color: #2d6823;
  text-decoration: none;
}

.list a:hover,
.list a:active,
.list a.router-link-active {
  color: white;
  background-color: #99ce90;
  padding: 10px 20px;
  border-radius: 10px;

  text-decoration: none;
}

.submenu {
  display: none;
}

.dashboard:hover .submenu {
  display: block;
  position: absolute;
  background-color: #f7f9fc;
  z-index: 100;
  right: 1.2em;
  padding: 0.6em;
  border-radius: 5px;
  box-shadow: 1px 1px 5px rgb(194, 194, 194);
}

.logout {
  background-color: transparent;
  border: none;
  font: inherit;
  color: #455053;
  cursor: pointer;
}
span {
  font-size: 0.9em;
}

.invitations {
  display: inline-block;
  position: relative;
  background-color: #fff;
  box-shadow: 1px 1px 5px rgb(194, 194, 194);
  transition: transform 80ms ease-in;
  border-radius: 50%;
  padding: 10px 10px 10px 15px;
  cursor: pointer;
}

.invitations:active {
  transform: scale(0.95);
}

.friend-icon {
  position: relative;
}

.dropdown {
  background-color: #f7f9fc;
  width: 250px;
  z-index: 4;
  position: absolute;
  right: 0;
  box-shadow: 1px 1px 5px rgb(194, 194, 194);
  border-radius: 10px;
  margin-top: 5px;
}

.circle {
  padding: 6px;
  border-radius: 50%;
  border: 2px solid #fff;
  background-color: red;
  position: absolute;
  top: 0;
  right: 0;
}

.profile {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  border: 1px solid lightgray;
  box-shadow: 1px 1px 5px rgb(194, 194, 194);
  margin: 4px;
}
</style>