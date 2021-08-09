<template>
  <div class="body">
    <div class="noData" v-if="!friends.length">
      <div>目前還沒有朋友喔!</div>
    </div>
    <div class="block" v-bind:key="index" v-for="(friend,index) in friends">
      <div class="item-navigate">
        <ul>
          <li>
            <router-link :to="'/dashboard/'+friend.user.userName">
              <img class="profile" :src="friend.user.photoPath" />
              <span>{{friend.user.name}}</span>
            </router-link>
          </li>
        </ul>
      </div>
      <friendsButton v-bind:friend="friend"></friendsButton>
    </div>
  </div>
</template>
<script>
import api from "@/utils/api.js";
import friendsButton from "./friendsButton";

export default {
  data() {
    return {
      friends: [],
      myFriends: [],
      invitations: null,
      clicked: false,
      sentInvitations: null,
      activeItem: "",
    };
  },
  components: {
    friendsButton,
  },
  methods: {
    changeClicked(userName) {
      this.activeItem = userName;
      this.clicked = !this.clicked;
    },
    getFriends() {
      api
        .getFriends(this.$store.getters.userId)
        .then((res) => {
          this.friends = res.data.data;
          for (let i = 0; i < this.friends.length; i++) {
            if (
              this.friends[i].user.userName == this.$store.getters.myUserName
            ) {
              this.friends.splice(i, 1);
            }
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
  mounted() {
    this.getFriends();
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

.body {
  margin: auto;
  padding: 40px 0 120px 0;
  display: flex;
  flex-wrap: wrap;
}

.noData {
  margin: 20px 0;
  width: 100%;
  border: 1px solid #e9e9e9;
  border-radius: 10px;
}

.noData > div {
  line-height: 500px;
  text-align: center;
  color: rgb(184, 184, 184);
  font-weight: bold;
  font-size: 20px;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  /* margin: 0 10px; */
}

li a {
  text-decoration: none;
  color: #455053;
}

li a:hover,
li a:active,
li a.router-link-active {
}

.block {
  background-color: #f7f9fc;
  margin: 10px 0 10px 20px;
  width: 45%;
  border-radius: 5px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 20px;
}

span {
  font-weight: bold;
  margin-left: 10px;
  font-size: 18px;
}

.btnFriend {
  background-color: #ffffff;
  border-radius: 5px;
  color: #3d454d;
  font-size: 14px;
  font-weight: bold;
  padding: 6px 20px;
  border: 1px solid #f7f7f7;
  transition: transform 80ms ease-in;
  text-decoration: none;
  box-shadow: 1px 1px 5px rgb(216, 215, 215);
}
button:active {
  transform: scale(0.95);
}
button:focus {
  outline: none;
}
img {
  width: 60px;
  height: 60px;
  border-radius: 50%;
  border: 1px solid lightgray;
  margin: 4px;
}

.item-navigate {
  cursor: pointer;
}

.item-reply {
  display: flex;
  flex-direction: row;
  position: relative;
}

.friend-response {
  width: 120px;
  z-index: 3;
  position: absolute;
  right: 0;
  top: 40px;
  box-shadow: 1px 1px 5px rgb(194, 194, 194);
  border-radius: 10px;
  margin-top: 5px;
  margin-right: 5px;
}

.btnmenu {
  background-color: #fff;
  color: #3d454d;
  font-size: 14px;
  font-weight: bold;
  padding: 10px 20px;
  border: none;
  transition: transform 80ms ease-in;
  width: 100%;
  font-size: 14px;
  display: block;
  /* border-radius: 10px; */
}

.btnmenu:hover {
  background: #e7edf8;
}

@media screen and (max-width: 780px) {
}

@media screen and (max-width: 780px) {
  .body {
    flex-direction: column;
  }
  .block {
    width: 100%;
  }
}
</style>