<template>
  <div class="body">
    <div class="noData" v-if="!invitations||this.invitations.length==0">
      <span>目前沒有好友邀請。</span>
    </div>
    <div class="block" v-bind:key="index" v-for="(invitation,index) in invitations">
      <div class="item1">
        <img class="profile" :src="invitation.user.photoPath" />
        <span>{{invitation.user.name}}</span>
      </div>
      <div class="item2">
        <button
          class="btn btnAccept"
          @click="update(1,invitation.relationship.relationshipId,index)"
        >接受</button>
        <button
          class="btn btnSkip"
          @click="update(2,invitation.relationship.relationshipId,index)"
        >拒絕</button>
      </div>
    </div>
  </div>
</template>
<script>
import api from "@/utils/api.js";

export default {
  data() {
    return {
      invitations: [],
    };
  },
  methods: {
    getInvitations() {
      api
        .getInvitations(this.$store.getters.idToken)
        .then((res) => {
          this.invitations = res.data.data;
          if (this.invitations) {
            this.$store.commit("setHasInvitation", true);
          } else {
            this.$store.commit("setHasInvitation", false);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
    update(status, relationshipId, index) {
      api
        .update(relationshipId, status, this.$store.getters.idToken)
        .then((res) => {
          this.invitations.splice(index, 1);
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
  mounted() {
    this.getInvitations();
  },
};
</script>
<style scoped>
.body {
  width: 100%;
  margin: auto;
  /* padding: 40px 0 60px 0; */
  display: flex;
  flex-wrap: wrap;
}

.noData {
  height: 100px;
  text-align: center;
  width: 100%;
}
.noData > span {
  line-height: 100px;
  color: #888;
}

.block {
  /* background-color: #f7f9fc; */
  margin: 10px;
  width: 100%;
  border-radius: 5px;
  display: flex;
  flex-direction: column;
  align-items: space-around;
  justify-content: space-around;
}

.item1 {
  display: flex;
  max-width: 90%;
}

.item1 > span {
  word-wrap: break-word;
  overflow: hidden;
}

.item2 {
  text-align: right;
  max-width: 90%;
}

span {
  font-weight: bold;
  margin-left: 10px;
  overflow: hidden;

  font-size: 16px;
}

.btnSkip {
  border-radius: 5px;
  border: 1px solid#b8b8b8;
  background-color: #b8b8b8;
  color: #fff;
  font-size: 12px;
  font-weight: bold;
  padding: 3px 14px;
  margin: 0px 5px;
  letter-spacing: 1px;
  transition: transform 80ms ease-in;
}

.btnAccept {
  border-radius: 5px;
  border: 1px solid #34d483;
  background-color: #34d483;
  color: #fff;
  font-size: 12px;
  font-weight: bold;
  padding: 3px 14px;
  margin: 0px 2px;
  letter-spacing: 1px;
  transition: transform 80ms ease-in;
}

button {
  transition: transform 80ms ease-in;
  box-shadow: 2px 2px 8px #888;
}

button:hover {
  color: #fff;
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
</style>