<template>
  <div>
    <div class="item" v-if="status(friend)==1">
      <button class="btnFriend" @click="deleteFriend(index,friend,isFriend(friend))">
        <i class="fa fa-check" aria-hidden="true"></i>
        朋友
      </button>
    </div>
    <div class="item" v-if="status(friend)==4">
      <button class="btnFriend" @click="addFriend(friend)">加為朋友</button>
    </div>

    <div class="item-reply" v-if="status(friend)==2">
      <button class="btnFriend" @click="changeClicked(friend.user.userName)">回覆交友邀請</button>
      <div class="friend-response" v-if="activeItem==friend.user.userName&&clicked">
        <button class="btnmenu" @click="update(1,hasInvitations(friend))">確認</button>
        <button class="btnmenu" @click="update(2,hasInvitations(friend))">刪除邀請</button>
      </div>
    </div>

    <div class="item-reply" v-if="status(friend)==3">
      <button class="btnFriend" @click="changeClicked(friend.user.userName)">已送出邀請</button>
      <div class="friend-response" v-if="activeItem==friend.user.userName&&clicked">
        <button class="btnmenu" @click="cancelInvitations(friend)">刪除邀請</button>
      </div>
    </div>
  </div>
</template>
<script>
import api from "@/utils/api.js";
import { mixin as clickaway } from "vue-clickaway";

export default {
  props: ["friend"],
  mixins: [clickaway],

  data() {
    return {
      friends: [],
      myFriends: [],
      invitations: null,
      clicked: false,
      sentInvitations: null,
      activeItem: "",
      buttonStatus: "",
    };
  },
  methods: {
    status(friend) {
      if (this.isFriend(friend) != -1) {
        return 1;
      } else if (this.hasInvitations(friend) != -1) {
        //回覆
        return 2;
      } else if (this.hasSentInvitations(friend)) {
        //已送出交友邀請
        return 3;
      } else {
        //加為朋友
        return 4;
      }
    },
    changeClicked(userName) {
      this.activeItem = userName;
      this.clicked = !this.clicked;
    },
    getFriends() {
      api
        .getFriends(this.$store.getters.userId)
        .then((res) => {
          if (!res.data.data) {
            return;
          }
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
    getMyFriends() {
      api
        .getFriends(this.$store.getters.myUserName)
        .then((res) => {
          if (!res.data.data) {
            return;
          }
          this.myFriends = res.data.data;
        })
        .catch((err) => {
          console.log(err);
        });
    },
    isFriend(friend) {
      for (let i = 0; i < this.myFriends.length; i++) {
        if (this.myFriends[i].user.userName == friend.user.userName) {
          return this.myFriends[i].relationship.relationshipId;
        }
      }
      return -1;
    },
    away: function () {
      this.clicked = false;
    },
    deleteFriend(index, friend, relationshipId) {
      let check = confirm("確定要刪除" + friend.user.name + "嗎?");
      if (check) {
        api
          .update(relationshipId, 2, this.$store.getters.idToken)
          .then((res) => {
            if (this.$store.getters.userId == this.$store.getters.myUserName) {
              this.friends.splice(index, 1);
            }
            if (res.data.status == 200) {
              window.location.reload();
            }
          })
          .catch((err) => {
            console.log(err);
          });
      }
    },
    addFriend(friend) {
      api
        .add(friend.user.userName, this.$store.getters.idToken)
        .then((res) => {
          if (res.data.status == 200) {
            window.location.reload();
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
    //別人給我的邀請
    getInvitations() {
      api
        .getInvitations(this.$store.getters.idToken)
        .then((res) => {
          if (!res.data.data) {
            return;
          }
          this.invitations = res.data.data;
        })
        .catch((err) => {
          console.log(err);
        });
    },
    hasInvitations(friend) {
      if (this.invitations == null) {
        return -1;
      }
      for (let i = 0; i < this.invitations.length; i++) {
        if (this.invitations[i].user.userName == friend.user.userName) {
          return this.invitations[i].relationship.relationshipId;
        }
      }
      return -1;
    },
    update(status, relationshipId) {
      api
        .update(relationshipId, status, this.$store.getters.idToken)
        .then((res) => {
          if (res.data.status == 200) {
            window.location.reload();
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
    //我給別人的邀請
    getSentInvitations() {
      api
        .sentInvitation(this.$store.getters.idToken)
        .then((res) => {
          if (res.data.status == 200) {
            this.sentInvitations = res.data.data;
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
    hasSentInvitations(friend) {
      if (this.sentInvitations == null) {
        return false;
      }
      for (let i = 0; i < this.sentInvitations.length; i++) {
        if (this.sentInvitations[i].userName == friend.user.userName) {
          return true;
        }
      }
      return false;
    },
    cancelInvitations(friend) {
      let check = confirm("確定要刪除交友邀請嗎?");
      if (check) {
        api
          .cancelInvitations(friend.user.userName, this.$store.getters.idToken)
          .then((res) => {
            console.log(res);
            if (res.data.status == 200) {
              window.location.reload();
            }
          })
          .catch((err) => {
            console.log(err);
          });
      } else {
        return;
      }
    },
  },
  mounted() {
    this.getFriends();
    this.getMyFriends();
    this.getInvitations();
    this.getSentInvitations();
  },
  created() {
    this.$store.commit("setUserId", this.$route.params.userId);
  },
};
</script>
<style scoped>
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
  min-width: fit-content;
  white-space: nowrap;
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
</style>