<template>
  <div class="body">
    <div v-if="browseAlbums()">
      <router-link :to="'/dashboard/'+this.$store.getters.myUserName+'/album/create'" exact>
        <div
          type="button"
          class="btnAddAlbum"
          @click="createAlbum"
          v-if="currentTab!=3&&isMyProfile"
        >
          <i class="fa fa-plus" aria-hidden="true"></i>
          <span>新增相簿</span>
        </div>
      </router-link>
      <div class="ul">
        <button @click="selectTab(1)" :class="{'btnActive':currentTab==1}" v-if="currentTab!=3">最新相片</button>
        <button @click="selectTab(2)" :class="{'btnActive':currentTab==2}" v-if="currentTab!=3">我的相簿</button>
      </div>

      <myAlbums v-if="currentTab==2"></myAlbums>
      <latestPhoto v-if="currentTab==1"></latestPhoto>
    </div>

    <router-view></router-view>
  </div>
</template>

<script>
import myAlbums from "./myAlbums";
import latestPhoto from "./latestPhoto";
import create from "./create";
import singleAlbum from "./singleAlbum";

export default {
  data() {
    return {
      activities: [
        {
          date: "2020/6/21",
          title: "三人同行悠哉爬山團",
          currentPeople: "2",
          place: "象山",
          pace: "走馬看花",
          role: "團長",
          dayLeft: "3",
        },
        {
          date: "2020/6/23",
          title: "三人同行悠哉爬山團",
          currentPeople: "2",
          place: "象山",
          pace: "走馬看花",
          role: "團員",
          dayLeft: "23",
        },
        {
          date: "2020/6/24",
          title: "三人同行悠哉爬山團",
          currentPeople: "2",
          place: "象山",
          pace: "走馬看花",
          role: "團長",
          dayLeft: "3",
        },
        {
          date: "2020/6/25",
          title: "三人同行悠哉爬山團",
          currentPeople: "10",
          place: "象山",
          pace: "走馬看花",
          role: "團長",
          dayLeft: "30",
        },
      ],
      currentTab: "1",
    };
  },
  components: {
    myAlbums,
    latestPhoto,
    create,
    singleAlbum,
  },
  computed: {
    isMyProfile() {
      return this.$store.getters.userId == this.$store.getters.myUserName;
    },
  },
  watch: {
    $route: {
      handler(val, oldval) {
        if (
          oldval.fullPath ==
          "/dashboard/" + this.$store.getters.myUserName + "/album/create"
        ) {
          this.currentTab = 1;
          this.$store.commit("setFolderName", "");
          // console.log(this.$store.getters.folderName);
        }
      },
    },
  },
  methods: {
    selectTab(selectedTab) {
      this.currentTab = selectedTab;
    },
    createAlbum() {
      this.currentTab = 3;
      this.$router.push(
        "/dashboard/" + this.$store.getters.myUserName + "/album/create"
      );
    },
    setTab(tab) {
      this.currentTab = tab;
    },
    browseAlbums() {
      return this.$store.getters.folderName == "";
    },
  },
  mounted() {
    this.$store.commit("setFolderName", "");
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
  padding-bottom: 60px;
}

button {
  background-color: #f6f5f7;
  border-radius: 30px;
  color: #3d454d;
  font-size: 14px;
  font-weight: bold;
  padding: 3px 20px;
  border: 1px solid #f6f5f7;
  transition: transform 80ms ease-in;
  box-shadow: 1px 1px 5px #888;
  text-decoration: none;
  margin-right: 20px;
  margin: 10px;
}

.btnActive {
  background-color: #6e5de3;
  color: #fff;
  border: 1px solid #6e5de3;
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

.btnAddAlbum {
  float: right;
  margin-top: 20px;
  color: #6e5de3;
  cursor: pointer;
  padding: 10px;
}

.btnAddAlbum > span {
  font-weight: bold;
  margin-left: 10px;
}

.btnAddAlbum:hover {
  background-color: #f6f5f7;
  border-radius: 10px;
  text-decoration: none;
}

.ul {
  overflow-x: scroll;
  margin-top: 40px;
}

.ul::-webkit-scrollbar {
  display: none;
}
</style>