<template>
  <div class="body">
    <div type="button" class="btnAddAlbum" @click="uploadPhoto" v-if="isMyProfile">
      <i class="fa fa-plus" aria-hidden="true"></i>
      <span>新增相片</span>
    </div>

    <div class="back" @click="back">
      <i class="fa fa-arrow-left" aria-hidden="true"></i>
    </div>
    <div class="title">
      <h5>{{folderName}}</h5>
    </div>
    <photoGallery v-bind:images="images" v-if="images.length"></photoGallery>
    <div class="noData" v-if="!images.length">
      <div>這本相簿還沒有照片喔!</div>
    </div>
  </div>
</template>

<script>
import api from "@/utils/api.js";

import photoGallery from "./photoGallery";

export default {
  data() {
    return {
      images: [],
      folderName: this.$store.getters.folderName,
    };
  },
  components: {
    photoGallery,
  },
  computed: {
    isMyProfile() {
      return this.$store.getters.userId == this.$store.getters.myUserName;
    },
  },
  methods: {
    back() {
      this.$store.commit("setFolderName", "");
      this.$router.push("/dashboard/" + this.$store.getters.userId + "/album");
    },
    getPhotoByAlbum() {
      api
        .getPhotoByAlbum(this.folderName, this.$store.getters.userId)
        .then((res) => {
          this.images = res.data.data;
        })
        .catch((err) => {
          // console.log(err);
        });
    },
    uploadPhoto() {
      this.$router.push(
        "/dashboard/" + this.$store.getters.myUserName + "/album/create"
      );
    },
  },
  mounted() {
    this.getPhotoByAlbum();
  },
  created() {
    this.$store.commit("setUserId", this.$route.params.userId);
  },
};
</script>

<style scoped>
.body {
  width: 100%;
}

.title {
  text-align: center;
  margin: 20px;
  margin-left: 0;
  width: 100%;
}

h5 {
  font-weight: bold;
  font-size: 28px;
  padding: 12px;
}

.noData {
  width: 100%;
  border: 1px solid #e9e9e9;
  border-radius: 10px;
  margin: 20px 0;
}

.noData > div {
  line-height: 500px;
  text-align: center;
  color: rgb(184, 184, 184);
  font-weight: bold;
  font-size: 20px;
}

.fa {
  font-size: 20px;
}
.fa.fa-arrow-left {
  background-color: #e9e9e9;
  padding: 14px;
  border-radius: 50px;
  color: #333;
  margin-top: 20px;
  cursor: pointer;
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
</style>