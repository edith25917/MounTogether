<template>
  <div class="body">
    <div class="back">
      <router-link :to="'/dashboard/'+this.$store.getters.myUserName+'/album'" exact>
        <i class="fa fa-arrow-left" aria-hidden="true"></i>
      </router-link>
    </div>

    <div class="wrap">
      <div class="inputfield">
        <input
          v-if="!alreadyCreated()"
          type="text"
          class="input"
          v-model="albumName"
          placeholder="相簿名稱"
          required
        />
        <div v-if="alreadyCreated()">
          <p>{{existingFolderName}}</p>
        </div>
      </div>

      <div class="wrap2">
        <input
          style="display:none"
          type="file"
          ref="fileInput"
          multiple="multiple"
          @change="previewMultiImage"
          accept=".jpg, .jpeg, .png"
        />
        <div type="button" class="btn btnChoose" @click="$refs.fileInput.click()">
          <i class="fa fa-plus" aria-hidden="true"></i>
          <span>選擇相片</span>
        </div>
        <div>
          <button class="btn btnupdate" @click="upload()">
            <i class="fa fa-upload" aria-hidden="true"></i>
            <span>上傳</span>
          </button>
        </div>
      </div>
    </div>

    <div class="noData" v-if="!previewList.length">
      <div>尚未選擇照片</div>
    </div>

    <div class="gallery-section" v-if="previewList.length">
      <div class="gallery-item" :key="index" v-for="(item, index) in previewList">
        <img :src="item" />
        <div class="tab" @click="deletePhoto(index)">
          <i class="fa fa-times" aria-hidden="true"></i>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import FormData from "form-data";
import api from "@/utils/api.js";

export default {
  data() {
    return {
      albumName: this.$store.getters.folderName,
      previewList: [],
      imageList: [],
      existingFolderName: this.$store.getters.folderName,
    };
  },

  methods: {
    back() {
      this.$router.push(
        "/dashboard/" + this.$store.getters.myUserName + "/album"
      );
    },
    alreadyCreated() {
      if (this.existingFolderName) {
        return true;
      }
      return false;
    },
    async createFolder() {
      await api
        .createFolders(this.albumName, this.$store.getters.idToken)
        .then((res) => {
          // console.log(res);
        })
        .catch((err) => {
          // console.log(err);
        });
    },
    async upload() {
      if (this.imageList.length == 0) {
        alert("尚未選擇相片");
        return;
      }
      if (!this.alreadyCreated() && this.albumName == "") {
        alert("請填寫相簿名稱");
        return;
      }
      if (!this.alreadyCreated()) {
        await this.createFolder();
      }
      const fd = new FormData();
      for (let i = 0; i < this.imageList.length; i++) {
        fd.append("files", this.imageList[i]);
      }
      fd.append("folder", this.albumName);

      api
        .uploadAlbumPhoto(fd, this.$store.getters.idToken)
        .then((res) => {
          // console.log("upload");
          // console.log(res);
          if (res.data.status == 200) {
            alert("上傳成功");
            this.$router.push(
              "/dashboard/" + this.$store.getters.myUserName + "/album"
            );
          }
        })
        .catch((err) => {
          // console.log(err);
        });
    },
    previewMultiImage: function (event) {
      var input = event.target;
      var count = input.files.length;
      var index = 0;
      if (input.files) {
        while (count--) {
          var reader = new FileReader();
          reader.onload = (e) => {
            this.previewList.push(e.target.result);
          };
          this.imageList.push(input.files[index]);
          reader.readAsDataURL(input.files[index]);
          index++;
        }
      }
    },
    deletePhoto(index) {
      this.previewList.splice(index, 1);
      this.imageList.splice(index, 1);
    },
  },
};
</script>

<style scoped>
.body {
  width: 100%;
}

.wrap {
  display: flex;
  width: 100%;
  margin: 40px 0;
  justify-content: space-between;
}

.wrap2 {
  display: flex;
  width: 100%;
  justify-content: flex-end;
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

.fa.fa-upload {
  color: #6e5de3;
  font-size: 16px;
}

.btn {
  float: right;
  color: #6e5de3;
  cursor: pointer;
  padding: 10px;
  min-width: fit-content;
  white-space: nowrap;
}

.btn > span {
  font-weight: bold;
  margin-left: 10px;
}

.btn:hover {
  background-color: #f6f5f7;
  color: #6e5de3;
  border-radius: 10px;
  text-decoration: none;
}

.btnupdate {
  margin-left: 30px;
}

p {
  color: #757575;
  font-size: 20px;
  font-weight: bold;
}

.inputfield {
  width: 80%;
}

.inputfield .input {
  width: 100%;
  outline: none;
  border: 1px solid #d5dbd9;
  font-size: 15px;
  padding: 8px 10px;
  border-radius: 3px;
  transition: all 0.3s ease;
}

.preview {
  width: 100%;
  height: 500px;
}

/* button {
  background-color: #f7f7f7;
  border-radius: 10px;
  color: #3d454d;
  font-size: 14px;
  font-weight: bold;
  padding: 6px 20px;
  border: 1px solid #f7f7f7;
  transition: transform 80ms ease-in;
  box-shadow: 1px 1px 5px #888;
}

button:active {
  transform: scale(0.95);
}

button:focus {
  outline: none;
} */

/* .btnupdate {
  border: 1px solid #f6f5f7;
  background: #f6f5f7;
  color: #333;
  float: right;
  margin-bottom: 50px;
  margin-right: 20px;
}

.btnupdate :hover {
  filter: brightness(1.1);
} */

img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.gallery-section {
  display: grid;
  height: 100%;
  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: repeat(1, 1fr);
  grid-gap: 40px;
  margin: 40px 20px;
}

.gallery-item {
  height: 300px;
  position: relative;
}

.tab {
  position: absolute;
  top: 0;
  right: 0;
  margin-right: -12px;
  margin-top: -12px;
  cursor: pointer;
  background-color: rgba(0, 0, 0, 0.4);
  border-radius: 50%;
  transition: all 0.6s cubic-bezier(0.175, 0.885, 0, 1);
}

.fa.fa-times {
  padding: 6px 8px;
  color: #fff;
  font-size: 18px;
}

.tab:hover {
  transform: scale(1.1, 1.1);
}

@media screen and (max-width: 780px) {
  .gallery-section {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media screen and (max-width: 480px) {
  .gallery-section {
    grid-template-columns: repeat(1, 1fr);
  }
  .gallery-item {
    height: 250px;
  }
}
</style>