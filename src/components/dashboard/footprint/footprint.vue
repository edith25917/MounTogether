<template>
  <div class="body">
    <div id="mymap"></div>
    <div class="right">
      <div class="right-title" v-if="!isMyProfile">
        <h6>個人成就紀錄</h6>
      </div>
      <button
        v-if="isMyProfile"
        type="button"
        class="add"
        data-toggle="modal"
        data-target="#addFootprintModal"
        @click="getMyEvents()"
      >新增足跡</button>

      <!-- 新增足跡pop-up -->
      <div
        class="modal fade"
        id="addFootprintModal"
        tabindex="-1"
        role="dialog"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div class="modal-dialog modal-dialog-centered">
          <div class="modal-content">
            <div class="modal-header text-center">
              <h5 class="modal-title w-100" id="exampleModalLabel">新增足跡</h5>
              <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div class="modal-body">
              <h6 v-if="myEventsToVerify!=0">尚未驗證的活動</h6>
              <h5
                v-if="myEventsToVerify==0"
                style="color:black; line-height:50px; text-align:center; font-weight:bold"
              >目前沒有可以驗證的活動喔!</h5>

              <div class="verification" v-if="myEventsToVerify!=0">
                <div
                  class="block block-modal"
                  v-bind:key="index"
                  v-for="(myEvents,index) in myEventsToVerify"
                >
                  <Multiselect :myEvents="myEvents" v-on:apply="apply"></Multiselect>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- 統計數字 -->
      <div class="wrap">
        <div class="item title">
          <p>累計海拔高度(公尺)</p>
          <p>累計爬山次數(次)</p>
          <p>共爬了幾座山</p>
        </div>
        <div class="item value">
          <p>{{totalAltitude}}</p>
          <p>{{totalTimes}}</p>
          <p>{{totalMountain}}</p>
        </div>
      </div>

      <!-- 山友驗證 -->
      <div class="wrap2" v-if="isMyProfile">
        <h4>為山友驗證足跡</h4>
        <div class="outside" v-if="!myRequests||myRequests.length==0">
          <span class="outside-content">目前沒有人發驗證請求喔!</span>
        </div>

        <div class="verification" v-if="myRequests">
          <div class="block" v-bind:key="request.verId" v-for="request in myRequests">
            <div class="item-vef">
              <img class="profile" :src="request.userPhoto" />
              <p class="item-vef-content">
                <span class="item-vef-content-bold">{{request.name}}</span>發送了攻頂驗證
                <br />在
                <span class="item-vef-content-bold">{{request.date}}</span>你們一起去了
                <span class="item-vef-content-bold">{{request.mountainName}}</span>
              </p>
            </div>
            <div class="item-vefbtn">
              <button
                class="btndetail"
                data-toggle="modal"
                data-target="#checkPhotoModal"
                @click="setImage(request)"
              >查看相片</button>
              <div
                class="modal fade"
                id="checkPhotoModal"
                tabindex="-1"
                role="dialog"
                aria-labelledby="exampleModalLabel"
                aria-hidden="true"
              >
                <div class="modal-dialog modal-dialog-centered">
                  <div class="modal-content">
                    <div class="modal-body">
                      <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                      </button>
                      <img class="img-responsive" :src="verifyImageUrl" />
                    </div>
                  </div>
                </div>
              </div>
              <div class="btncheck">
                <button class="btnverify" @click="verify(request.verification.verId,1)">確認</button>
                <button class="btnskip" @click="verify(request.verification.verId,2)">略過</button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- 足跡檔案 -->
      <div class="wrap3" v-if="!isMyProfile">
        <h4>足跡檔案</h4>
        <div class="noData" v-if="achievementsInfo.length==0">
          <div>還沒有驗證過的足跡喔!</div>
        </div>
        <b-carousel
          v-if="achievementsInfo"
          id="carousel-1"
          ref="myCarousel"
          v-model="slide"
          :interval="2500"
          controls
          background="#ababab"
          img-width="1024"
          img-height="300"
          style="text-shadow: 1px 1px 2px #333; max-width:100%; max-height:300px !important;"
          @sliding-start="onSlideStart"
          @sliding-end="onSlideEnd"
        >
          <!-- Text slides with image -->
          <b-carousel-slide
            :key="index"
            v-for="(a,index) in achievementsInfo"
            :caption="a.mountainName"
            :text="a.date"
            :img-src="a.photo"
          ></b-carousel-slide>
        </b-carousel>
      </div>
    </div>
  </div>
</template>
<script>
import Multiselect from "./multiselect";
import api from "@/utils/api.js";

export default {
  data() {
    return {
      totalAltitude: "",
      totalTimes: "",
      totalMountain: "",
      climbedMountain: [],
      verifyImageUrl: "",
      myRequests: [],
      activeItem: "",
      achievementsInfo: [],
      myEventsToVerify: [],
      slide: 0,
      sliding: null,
    };
  },
  components: {
    Multiselect,
  },
  computed: {
    isMyProfile() {
      return this.$store.getters.userId == this.$store.getters.myUserName;
    },
  },
  watch: {
    $route: {
      handler: function (old, newval) {
        this.getAchievements();
        this.getRequests();
      },
    },
  },
  methods: {
    onSlideStart(slide) {
      this.sliding = true;
    },
    onSlideEnd(slide) {
      this.sliding = false;
    },
    initMap() {
      //建立地圖
      var mymap = L.map("mymap", {
        center: [23.622431, 121.092207],
        zoom: 8,
      });
      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution:
          '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      }).addTo(mymap);

      //建立地標
      const cIcon = new L.Icon({
        iconUrl:
          "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-red.png",
        shadowUrl:
          "https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png",
        iconSize: [25, 41],
        iconAnchor: [12, 41],
        popupAnchor: [1, -34],
        shadowSize: [41, 41],
      });

      if (this.climbedMountain.length == 0) {
        return;
      }
      var self = this;

      for (let i = 0; i < this.climbedMountain.length; i++) {
        L.marker(
          [this.climbedMountain[i].latitude, this.climbedMountain[i].longitude],
          { icon: cIcon }
        )
          .addTo(mymap)
          .bindPopup(this.climbedMountain[i].mountainName)
          .on("click", function (e) {
            for (let i = 0; i < self.achievementsInfo.length; i++) {
              if (
                self.achievementsInfo[i].mountainName ==
                e.target.getPopup().getContent()
              ) {
                self.$refs.myCarousel.setSlide(i);
              }
            }
          });

        // .bindPopup(
        //   "<img src= 'http://35.194.165.190:8080/mountains/" +
        //     this.climbedMountain[i].photoPath +
        //     "'" +
        //     " class=popupImage " +
        //     "/><br>" +
        //     this.climbedMountain[i].mountainName,
        //   { maxWidth: "100px" }
        // );
      }
    },
    setImage(request) {
      this.verifyImageUrl = request.verification.photoPath;
    },
    //山資訊和成就
    async getAchievements() {
      await api
        .achievement(this.$store.getters.userId)
        .then((res) => {
          if (res.data.status != 200) {
            // console.log(res);
            return;
          }
          let height = res.data.data.totalAltitude;
          this.totalAltitude = parseInt(height).toLocaleString();
          this.totalTimes = res.data.data.totalNumOfRecords;
          this.totalMountain = res.data.data.numOfMountainsClimbed;
          this.climbedMountain = res.data.data.climbedMountain;
        })
        .catch((err) => console.log(err));
      this.initMap();
    },
    //新增足跡
    async getMyEvents() {
      await api
        .myEventsToVerify(this.$store.getters.idToken)
        .then((res) => {
          if (res.data.status != 200) {
            // console.log(res);
            return;
          }
          this.myEventsToVerify = res.data.data;
        })
        .catch((err) => {
          // console.log(err);
        });

      if (this.myEventsToVerify.length == 0) {
        return;
      }

      for (let i = 0; i < this.myEventsToVerify.length; i++) {
        this.dateFormat(this.myEventsToVerify[i].event);
      }
      this.members();
    },
    dateFormat(arr) {
      arr.date = arr.date.split("T")[0];
      let date = arr.date.split("-");
      arr.date = date[0] + "/" + date[1] + "/" + date[2];
    },
    members() {
      for (let i = 0; i < this.myEventsToVerify.length; i++) {
        for (let k = 0; k < this.myEventsToVerify[i].members.length; k++) {
          this.myEventsToVerify[i].value = [];
        }
      }
    },
    apply(data) {
      api
        .apply(data, this.$store.getters.idToken)
        .then((res) => {
          console.log(res);
          if (res.data.status != 200) {
            alert(res.data.msg);
            return;
          }
          alert("發送成功");

          if (this.myEventsToVerify.length <= 1) {
            window.location.reload();
          } else {
            this.myEventsToVerify = this.myEventsToVerify.filter(
              (myEvent) => myEvent.event.eventId !== data.event.eventId
            );
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },

    //山友驗證
    async getRequests() {
      await api
        .getRequests(this.$store.getters.idToken)
        .then((res) => {
          if (res.data.status != 200) {
            console.log(res);
            return;
          }
          this.myRequests = res.data.data;
        })
        .catch((err) => {
          console.log(err);
        });
      if (!this.myRequests) {
        return;
      }
      for (let i = 0; i < this.myRequests.length; i++) {
        this.dateFormat(this.myRequests[i]);
      }
    },
    verify(verId, status) {
      api
        .verify(verId, status, this.$store.getters.idToken)
        .then((res) => {
          if (res.data.status != 200) {
            // console.log(res);
            return;
          }
          if (this.myRequests.length == 1) {
            window.location.reload();
          } else {
            this.myRequests = this.myRequests.filter(
              (r) => r.verification.verId !== verId
            );
          }
        })
        .catch((err) => {
          // console.log(err);
        });
    },
    async getAchievementsInfo() {
      await api
        .getAchievementsInfo(this.$store.getters.userId)
        .then((res) => {
          this.achievementsInfo = res.data.data;
        })
        .catch((err) => {
          // console.log(err);
        });

      for (let i = 0; i < this.achievementsInfo.length; i++) {
        this.achievementsInfo[i].date = this.achievementsInfo[i].date.split(
          "T"
        )[0];
        let date = this.achievementsInfo[i].date.split("-");
        this.achievementsInfo[i].date = date[0] + "/" + date[1] + "/" + date[2];
      }
    },
  },
  mounted() {
    this.getAchievements();
    this.getRequests();
    this.getAchievementsInfo();
  },
  created() {
    this.$store.commit("setUserId", this.$route.params.userId);
  },
};
</script>
<style src="vue-multiselect/dist/vue-multiselect.min.css"></style>
<style scoped>
* {
  margin: 0;
  box-sizing: border-box;
}

.body {
  width: 90%;
  margin: auto;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  padding-bottom: 60px;
}

.popupImage {
  max-width: 100px;
  max-height: 100px;
  /* max-height: 20%; */
}

#mymap {
  height: 600px;
  width: 40%;
  margin: 30px;
}

.right {
  margin: 30px;
  width: 45%;
}

.right-title {
  border-bottom: 2px solid #f9a428;
  text-align: center;
}

.right-title > h6 {
  color: #f9a428;
  font-size: 20px;
}

/* 新增足跡 */

.test {
  width: 80%;
}

.add {
  border-radius: 10px;
  border: 1px solid #f9a428;
  background-color: #f9a428;
  color: #ffffff;
  width: 100%;
  font-size: 16px;
  font-weight: bold;
  padding: 6px 30px;
  margin: 10px;
  letter-spacing: 1px;
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

.btnicon {
  background-color: white;
  border-radius: 10px;
  color: #707070;
  font-size: 20px;
  width: 60px;
  height: 60px;
  border: 1px solid #707070;
  transition: transform 80ms ease-in;
}

.close {
  box-shadow: none;
}

h6 {
  color: red;
  font-size: 14px;
  margin: 10px;
  font-weight: bold;
}

form input {
  font-size: 12px;
  margin: 10px 0 0 10px;
}

.select {
  width: 100%;
  font-size: 12px;
  margin: 10px;
}

.block-modal {
  display: flex;
  align-items: flex-end;
  justify-content: space-around;
}

.modal-header {
  background-color: #34d483;
  color: #fff;
}

.modal-dialog {
  margin: auto;
}

.btncheck {
  margin: 10px;
  text-align: right;
}

/* 統計 */

.wrap {
  display: flex;
  margin: 20px;
}

.item {
  line-height: 40px;
  width: 100%;
}

.title {
  border-right: 1px solid lightgray;
  padding-right: 20px;
  margin-right: 20px;
  width: 60%;
}

.value {
  color: #01a2a6;
  font-size: 20px;
  font-weight: bold;
  width: 40%;
}

/* 山友驗證 */

.outside {
  width: 100%;
  border: 1px solid #cac9c9;
  margin-top: 10px;
  border-radius: 20px;
  text-align: center;
  line-height: 300px;
}

.outside-content {
  color: #cac9c9;
  font-weight: bold;
  font-size: 18px;
  line-height: 1;
}

.wrap2 {
  display: flex;
  flex-direction: column;
  width: 100%;
}

h4 {
  font-size: 18px;
  font-weight: bold;
  color: #707070;
  padding: 6px 60px;
  margin: auto;
  border-bottom: 2px solid #707070;
  letter-spacing: 1px;
  box-sizing: border-box;
}

.verification {
  height: 370px;
  max-width: 100%;
  overflow: scroll;
  overflow-x: hidden;
}

.block {
  background-color: #f7f9fc;
  margin: 10px;
  width: 100%;
  border-radius: 5px;
  padding: 0 10px;
}

.item-vef {
  display: flex;
  padding: 10px;
  font-size: 14px;
}

.item-vef-content {
  line-height: 25px;
}
.item-vef-content-bold {
  font-weight: bold;
}

.item-vefbtn {
  padding-bottom: 10px;
  display: flex;
  text-align: right;
}

.btndetail {
  margin-right: 20px;
  border: none;
  background-color: #f7f9fc;
  color: blue;
  font-size: 12px;
  width: 40%;
  box-shadow: none;
}

.btncheck {
  width: 70%;
}

.btnskip {
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

.btnverify {
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

.profile {
  width: 60px;
  height: 60px;
  border-radius: 50%;
  border: 1px solid lightgray;
  margin: 4px;
}

.img-responsive {
  max-width: 90%;
  float: left;
  margin-top: 10px;
}

.block p {
  margin: 0px 10px;
}

/* 足跡檔案 */

.noData {
  margin: 20px 0;
  width: 100%;
  border: 1px solid #e9e9e9;
  border-radius: 10px;
}

.noData > div {
  line-height: 250px;
  text-align: center;
  color: rgb(184, 184, 184);
  font-weight: bold;
  font-size: 20px;
}
.wrap3 {
  margin-top: 50px;
  text-align: center;
  max-height: 350px;
  overflow: hidden;
}

.carousel {
  margin-top: 20px;
}

.carousel-caption {
  background-color: rgba(0, 0, 0, 0.4);
}

/* scrollbar客製化 */

/* width */
.verification::-webkit-scrollbar {
  width: 8px;
}

/* Track */
.verification::-webkit-scrollbar-track {
  /* box-shadow: inset 0 0 5px grey; */
  /* border-radius: 10px; */
}

/* Handle */
.verification::-webkit-scrollbar-thumb {
  background: rgb(201, 201, 201);
  border-radius: 5px;
}

@media screen and (max-width: 960px) {
  .body {
    flex-direction: column;
  }
  #mymap {
    height: 500px;
    width: 90%;
  }

  .right {
    width: 95%;
  }
}

@media screen and (max-width: 680px) {
  .body {
    flex-direction: column;
  }
}
</style>