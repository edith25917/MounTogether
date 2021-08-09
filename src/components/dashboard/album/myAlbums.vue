<template>
  <div class="body">
    <div class="noData" v-if="!folders.length">
      <div>目前還沒有相簿喔!</div>
    </div>
    <div class="cards" v-if="folders.length">
      <article class="card card--1" v-bind:key="index" v-for="(f,index) in folders">
        <div class="card__img" :style="{ backgroundImage: 'url('+ f.photoPath + ')' }"></div>
        <div @click="toSingleAlbum(f)">
          <div class="nopicture" v-if="hasPicture(f)">
            <span>這本相簿還沒有照片喔!</span>
          </div>
          <div
            class="card__img--hover"
            :style="{ backgroundImage: 'url('+ f.photoPath+ ')' }"
            v-if="!hasPicture(f)"
          ></div>
        </div>
        <div class="card__info">
          <div>
            <h5 class="card__title ellipsis">{{f.folder.folderName}}</h5>
          </div>
          <div class="category">
            <span class="card__category">{{f.photoCount}}張照片</span>
          </div>
        </div>
      </article>
    </div>
  </div>
</template>


<script>
import api from "@/utils/api.js";

export default {
  data() {
    return {
      folders: [],
      isActive: true,
    };
  },
  methods: {
    getAllFolders() {
      api
        .getAllFolders(this.$store.getters.userId)
        .then((res) => {
          if (!res.data.data) {
            return;
          }
          this.folders = res.data.data;
        })
        .catch((err) => {
          // console.log(err);
        });
    },
    hasPicture(f) {
      return f.photoPath == "http://35.194.165.190:80/photo/null";
    },
    toSingleAlbum(f) {
      this.$store.commit("setFolderName", f.folder.folderName);
      this.$router.push(
        "/dashboard/" +
          this.$store.getters.userId +
          "/album/" +
          f.folder.folderName
      );
    },
  },
  mounted() {
    this.getAllFolders();
  },
  created() {
    this.$store.commit("setUserId", this.$route.params.userId);
  },
};
</script>

<style scoped>
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
  margin: 40px 10px;
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

.cards {
  width: 100%;
  display: flex;
  display: -webkit-flex;
  flex-wrap: wrap;
}

.nopicture {
  transition: 0.4s all ease-out;
  background-color: rgb(219, 219, 219);
  width: 100%;
  position: absolute;
  height: 135px;
  border-top-left-radius: 12px;
  border-top-right-radius: 12px;
  top: 0;
  text-align: center;
}

.nopicture > span {
  color: #333;
  font-weight: bold;
  line-height: 140px;
}

.card__img {
  visibility: hidden;
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  width: 100%;
  height: 135px;
  border-top-left-radius: 12px;
  border-top-right-radius: 12px;
  padding-top: 16px;
}

.card__img--hover {
  transition: 0.4s all ease-out;
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  width: 100%;
  position: absolute;
  height: 135px;
  border-top-left-radius: 12px;
  border-top-right-radius: 12px;
  top: 0;
}
.card {
  margin: 25px 0 25px 25px;
  transition: all 0.8s cubic-bezier(0.175, 0.885, 0, 1);
  background-color: rgba(255, 255, 255, 0.8);
  width: 30%;
  position: relative;
  border-radius: 12px;
  border: none;
  max-height: 300px;
  /* overflow: hidden; */
  cursor: pointer;
  box-shadow: 0px 13px 10px -7px rgba(0, 0, 0, 0.1);
}
.card:hover {
  box-shadow: 0px 30px 18px -8px rgba(0, 0, 0, 0.1);
  transform: scale(1.1, 1.1);
}

.card__info {
  height: 40%;
  z-index: 2;
  background-color: rgba(252, 252, 252, 0.8);
  border-bottom-left-radius: 12px;
  border-bottom-right-radius: 12px;
  border: none;
  padding: 16px 24px 8px 24px;
}

.card__category {
  font-size: 13px;
  letter-spacing: 2px;
  font-weight: 500;
  color: #868686;
}

.category {
  float: right;
}

.card__title {
  color: rgb(97, 97, 97);
  font-weight: bold;
  margin-top: 5px;
  margin-bottom: 10px;
  max-height: 70px;
}

.card:hover .card__img--hover {
  height: 100%;
  opacity: 0.3;
}

.card:hover .card__info {
  background-color: transparent;
  position: relative;
}

.card:hover .card__info-hover {
  opacity: 1;
}

.ellipsis {
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  white-space: normal;
}

@media screen and (max-width: 820px) {
  .card {
    width: 45%;
  }
}

@media screen and (max-width: 680px) {
  .card {
    width: 90%;
  }
}
</style>