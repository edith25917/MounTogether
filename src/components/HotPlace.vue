<template>
  <div class="hotPlace">
    <div v-show="false">
      test=
      {{area}}、{{city}}、{{altitude}}、{{difficultyP}}
      ||{{directiveCom}}||
      <br />
      {{searchResult}}
    </div>

    <div class="search" v-show="searchResultP[0]">
      <div class="title" style="width:65%;">
        <svg
          width="1em"
          height="1em"
          viewBox="0 0 16 16"
          class="bi bi-search"
          fill="currentColor"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fill-rule="evenodd"
            d="M10.442 10.442a1 1 0 0 1 1.415 0l3.85 3.85a1 1 0 0 1-1.414 1.415l-3.85-3.85a1 1 0 0 1 0-1.415z"
          />
          <path
            fill-rule="evenodd"
            d="M6.5 12a5.5 5.5 0 1 0 0-11 5.5 5.5 0 0 0 0 11zM13 6.5a6.5 6.5 0 1 1-13 0 6.5 6.5 0 0 1 13 0z"
          />
        </svg>
        <h3>搜尋結果</h3>
      </div>
      <div class="events">
        <div
          v-for="item in searchResultP"
          :key="item.event.eventId"
          class="aEvent"
          @click="toSearchEvent(item.event.eventId,item.event.mountainId);"
          style="position:relative;"
        >
          <img :src="item.photoPath" class="picInCenter" />
          <div class="item" style>
            <div
              class="itemName ellipsis"
              style="margin:0 auto; width:70%;"
            >{{item.event.eventName}}</div>
            <div
              style="width:80%; margin:0 auto; text-align:left; font-size:0.8em;"
            >{{item.event.date}}</div>
            <div
              style="width:80%; margin:0 auto; text-align:left; font-size:0.8em;"
            >{{item.mountainName}}</div>
            <div
              class="ellipsis3"
              style="width:80%; margin:0 auto; text-align:left; font-size:0.8em;"
            >{{item.event.description}}</div>
          </div>
        </div>
      </div>
    </div>
    <div class="recommended">
      <div
        style="display:flex; flex-direction:row; justify-content:space-between; 
        align-items:flex-end; width:65%;  min-width:320px;"
      >
        <div class="title" style="background:;">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            xmlns:xlink="http://www.w3.org/1999/xlink"
            version="1.1"
            id="Layer_1"
            x="0px"
            y="0px"
            viewBox="0 0 100 100"
            style="enable-background:new 0 0 100 100;"
            xml:space="preserve"
          >
            <path
              d="M21.8,12v76c0,1.6-1.3,3-3,3c-1.7,0-3-1.4-3-3V12c0-1.7,1.3-3,3-3C20.4,9,21.8,10.3,21.8,12z M74.3,38.6L84.2,28H63.8v24  h20.4l-9.9-10.6C73.6,40.6,73.6,39.4,74.3,38.6z M55.8,16h-30v24h30c1.5,0,2.8,0.4,4,1.1V20C59.8,17.8,58,16,55.8,16z M55.8,44h-8v4  c0,2.2,1.8,4,4,4h8v-4C59.8,45.8,58,44,55.8,44z"
            />
          </svg>
          <h3 style="background:;">為您推薦</h3>
        </div>
        <div class="hintTag" style="margin-right:1em;">{{hintTag}}</div>
      </div>

      <div
        v-show="!mountains[0]"
        style="font-size:1.5em; color:gray;  border:2px rgb(168, 177, 184) dotted; position:relative;
        width:63.5%; margin:0 auto; text-align:center; display:flex; flex-direction:row;
        justify-content:center; padding:1em;
        "
      >
        很可惜，還沒有人在這些地方揪團喔~~
        <router-link to="/groups/openGroup">
          <div class="createEvent">點我自己來揪團!</div>
        </router-link>
        <span style="opacity:0%; z-index:-1;">點我自己來揪團!</span>
      </div>
      <div class="photos">
        <button
          v-for="(item,index) in mountains"
          :key="item.mountainId"
          class="aImg"
          v-show="index==0"
          :style="{ background: `url(${item.photoPath})` }"
          style="position:relative;"
        >
          <!-- 為您推薦 山1 -->
          <div
            class="groupsCount"
            style="background:#F4011B  ; position:absolute; right:1.1em; top:1em; border-radius:99em; 
             width:2.2em; height:2.2em; box-shadow:1px 1px 2px gray; border:1px white solid;
            color:white; text-align:center; line-height:2em; font-weight:bold;
            "
          >{{item.events.length}}</div>
          <div class="mountainTags">
            <div class="tag">{{item.district}}</div>
            <div class="tag">難度{{difficulty(item.difficulty)}}</div>
            <div class="tag">海拔高度 {{item.altitude}}m</div>
          </div>
          <div class="groups">
            <div
              class="aGroup"
              v-for="(item2,index2) in item.events"
              :key="index2"
              @click="toEvent(item2.eventId, item2.mountainId);"
            >
              <div class="avatar picContainer" style="background:;">
                <img :src="item2.leaderPhoto" class="picInCenter" />
              </div>
              <div class="shortInfo">
                <div class="shortInfoTitle ellipsis">{{item2.eventName}}</div>
                <div class="ellipsis">團長：{{item2.leaderName}}</div>
              </div>
              <router-link :to="'/groups/singleGroup/'+item2.eventId+'/'+item2.mountainId">
                <svg
                  width="1em"
                  height="1em"
                  viewBox="0 0 16 16"
                  class="infoBtn"
                  fill="currentColor"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fill-rule="evenodd"
                    d="M0 2a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V2zm8.93 4.588l-2.29.287-.082.38.45.083c.294.07.352.176.288.469l-.738 3.468c-.194.897.105 1.319.808 1.319.545 0 1.178-.252 1.465-.598l.088-.416c-.2.176-.492.246-.686.246-.275 0-.375-.193-.304-.533L8.93 6.588zM8 5.5a1 1 0 1 0 0-2 1 1 0 0 0 0 2z"
                  />
                </svg>
              </router-link>
            </div>
          </div>
          <div class="itemName">{{item.mountainName}}</div>
        </button>
        <!-- 為您推薦 山1 -->
        <button
          v-for="(item,index) in mountains"
          :key="item.mountainName"
          class="aImg2"
          v-show="index!=0&&index<indexLimit"
          :style="{ background: `url(${item.photoPath})` }"
          style="position:relative;"
        >
          <!-- 為您推薦 山2~~-->
          <div
            class="groupsCount"
            style="background:#F4011B  ; position:absolute; right:1.1em; top:1em; border-radius:99em; 
            width:2em; height:2em; box-shadow:1px 1px 2px gray; border:1px white solid;
            color:white; text-align:center; line-height:1.8em; font-weight:bold;
            "
          >{{item.events.length}}</div>
          <div class="mountainTags">
            <div class="tag">{{item.district}}</div>
            <div class="tag">
              難度
              {{difficulty(item.difficulty)}}
            </div>
            <div class="tag">海拔高度 {{item.altitude}}m</div>
          </div>
          <div class="groups">
            <div
              class="aGroup"
              v-for="(item2,index2) in item.events"
              :key="index2"
              @click="toEvent(item2.eventId, item2.mountainId);"
            >
              <div class="avatar picContainer" style="background:;">
                <img :src="item2.leaderPhoto" class="picInCenter" />
              </div>
              <div class="shortInfo">
                <div class="shortInfoTitle ellipsis">{{item2.eventName}}</div>
                <div class="ellipsis">團長：{{item2.leaderName}}</div>
                <router-link :to="'/groups/singleGroup/'+item2.eventId+'/'+item2.mountainId">
                  <svg
                    width="1em"
                    height="1em"
                    viewBox="0 0 16 16"
                    class="infoBtn"
                    fill="currentColor"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M0 2a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V2zm8.93 4.588l-2.29.287-.082.38.45.083c.294.07.352.176.288.469l-.738 3.468c-.194.897.105 1.319.808 1.319.545 0 1.178-.252 1.465-.598l.088-.416c-.2.176-.492.246-.686.246-.275 0-.375-.193-.304-.533L8.93 6.588zM8 5.5a1 1 0 1 0 0-2 1 1 0 0 0 0 2z"
                    />
                  </svg>
                </router-link>
              </div>
            </div>
          </div>
          <div class="itemName">{{item.mountainName}}</div>
        </button>
        <!-- 為您推薦 山2~~-->
      </div>
      <div
        v-show="!seeMore && mountains.length>6"
        style="display:flex; flex-direction:row; width:fit-content; justify-content:center; align-items:center;
        border:1px #C7C7C7 solid; padding:0.5em; font-size:1.2em; margin-top:1em; border-radius:99em; 
        padding-right:4em; padding-left:4em; cursor:pointer color:#DEDEDE ; cursor:pointer;"
        @click="seeMore=true; indexLimit=mountains.length;"
      >
        <div>查看更多</div>

        <svg
          width="1em"
          height="1em"
          viewBox="0 0 16 16"
          class="bi bi-chevron-double-down"
          fill="currentColor"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fill-rule="evenodd"
            d="M1.646 6.646a.5.5 0 0 1 .708 0L8 12.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708z"
          />
          <path
            fill-rule="evenodd"
            d="M1.646 2.646a.5.5 0 0 1 .708 0L8 8.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708z"
          />
        </svg>
      </div>
      <div
        v-show="seeMore  && mountains.length>6"
        style="display:flex; flex-direction:row; width:fit-content; justify-content:center; align-items:center;
        border:1px #C7C7C7 solid; padding:0.5em; font-size:1.2em; margin-top:1em; border-radius:99em; 
        padding-right:4em; padding-left:4em; cursor:pointer color:#DEDEDE ; cursor:pointer;"
        @click="seeMore=false; indexLimit=6;"
      >
        <div>精簡顯示</div>

        <svg
          width="1em"
          height="1em"
          viewBox="0 0 16 16"
          class="bi bi-chevron-double-up"
          fill="currentColor"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fill-rule="evenodd"
            d="M7.646 2.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1-.708.708L8 3.707 2.354 9.354a.5.5 0 1 1-.708-.708l6-6z"
          />
          <path
            fill-rule="evenodd"
            d="M7.646 6.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1-.708.708L8 7.707l-5.646 5.647a.5.5 0 0 1-.708-.708l6-6z"
          />
        </svg>
      </div>
    </div>
  </div>
</template>

<script>
import api from "@/utils/api.js";
export default {
  //props => 負責接收父元件傳遞的資料(directive)
  props: ["area", "city", "altitude", "difficultyP", "dir", "searchResultP"],
  computed: {
    directiveCom() {
      console.log("enter directiveCom() in hotPlace");
      if (this.area) {
        this.directive.area = this.area;
        this.directive.city = "";
        this.directive.altitude = "";
        this.directive.difficulty = "";
        this.setMountains();
        return this.directive;
      }
      if (this.city) {
        this.directive.area = "";
        this.directive.city = this.city;
        this.directive.altitude = "";
        this.directive.difficulty = "";
        this.setMountains();
        return this.directive;
      }
      if (this.altitude) {
        this.directive.area = "";
        this.directive.city = "";
        this.directive.altitude = this.altitude;
        this.directive.difficulty = "";
        this.setMountains();
        return this.directive;
      }
      if (this.difficultyP) {
        this.directive.area = "";
        this.directive.city = "";
        this.directive.altitude = "";
        this.directive.difficulty = this.difficultyP;
        this.setMountains();
        return this.directive;
      }
      this.directive.area = "";
      this.directive.city = "";
      this.directive.altitude = "";
      this.directive.difficulty = "";
      this.setMountains();
      return this.directive;
    },
  },
  data() {
    return {
      mountainIds: [],
      mountains: [],
      directive: {
        area: "",
        city: "",
        altitude: "",
        difficulty: "",
      },
      directiveTranslator: {
        area: ["地區", "北部", "中部", "南部"],
        city: [
          "縣市",
          "南投縣",
          "苗栗縣",
          "台中縣",
          "高雄縣",
          "花蓮縣",
          "屏東縣",
          "新竹縣",
          "宜蘭縣",
          "台東縣",
        ],
        altitude: ["海拔高度", "3.3km以下", "3.3km-3.6km", "3.6km以上"],
        difficulty: ["難度", "低", "中", "高"],
      },
      seeMore: false,
      hintTag: "依開團數",
      indexLimit: 6,
    };
  },
  methods: {
    setMountains() {
      this.setHintTag();
      // console.log("test comma", "enter setMountains()");
      if (this.directive.city) {
        api
          .findMountainByCity(this.directive.city)
          .then((res) => {
            // console.log("findMountainByCity() Success,res.data=", res.data);
            // console.log("findMountainByCity() Success,res.data=");
            // console.log(res.data);

            this.mountains = res.data.data;
          })
          .catch((err) => {
            // console.log("findMountainByCity() Failed!!!", err);
          });
        return;
      }

      if (this.directive.area) {
        // console.log("enter findMountainByArea(this.directive.area)");
        api
          .findMountainByArea(this.directive.area)
          .then((res) => {
            // console.log("findMountainByArea() Success,res.data=", res.data);
            // console.log(res.data);
            this.mountains = res.data.data;
            // console.log("this.mountains=", this.mountains);
          })
          .catch((err) => {
            // console.log("findMountainByArea() Failed!!!", err);
          });
        return;
      }

      if (this.directive.difficulty) {
        api
          .findMountainByDifficulty(this.directive.difficulty)
          .then((res) => {
            // console.log("findMountainByDifficulty() Success,res.data=",res.data);
            this.mountains = res.data.data;
            // console.log("this.mountains=",this.mountains);
          })
          .catch((err) => {
            // console.log("findMountainByDifficulty() Failed!!!", err);
          });
        return;
      }
      if (this.directive.altitude) {
        api
          .findMountainByAltitude(this.directive.altitude)
          .then((res) => {
            // console.log("findMountainByAltitude() Success,res.data=");
            // console.log(res.data);
            this.mountains = res.data.data;
            // console.log("this.mountains=", this.mountains);
          })
          .catch((err) => {
            // console.log("findMountainByAltitude() Failed!!!", err);
          });
        return;
      }
      api
        .findMountainByPopularity()
        .then((res) => {
          // console.log("findMountainByPopularity() Success,res.data=",res.data);
          this.mountains = res.data.data;
        })
        .catch((err) => {
          // console.log("findMountainByPopularity() Failed!!!", err);
        });
    },
    setHintTag() {
      if (this.directive.area) {
        this.hintTag =
          this.directiveTranslator.area[0] +
          " " +
          this.directiveTranslator.area[this.directive.area];
        return;
      }
      if (this.directive.city) {
        this.hintTag =
          this.directiveTranslator.city[0] +
          " " +
          this.directiveTranslator.city[this.directive.city];
        return;
      }
      if (this.directive.altitude) {
        let str = this.directive.altitude.split("ByAltitude")[1] + "m";
        this.hintTag =
          // this.directiveTranslator.altitude[0] + " " +
          str;
        return;
      }
      if (this.directive.difficulty) {
        this.hintTag =
          this.directiveTranslator.difficulty[0] +
          " " +
          this.directiveTranslator.difficulty[this.directive.difficulty];
        return;
      }
    },
    difficulty(difficulty) {
      switch (difficulty) {
        case 1:
          return "低";
          break;
        case 2:
          return "中";
          break;
        case 3:
          return "高";
          break;
        default:
          return "err";
          break;
      }
    },
    toSearchEvent(eventId, mountainId) {
      this.$router.push({
        path: "/groups/singleGroup/" + eventId + "/" + mountainId,
      });
    },
    toEvent(eventId, mountainId) {
      //  <router-link :to="'/groups/singleGroup/'+item2.eventId+'/'+item2.mountainId">
      this.$router.push({
        path: "/groups/singleGroup/" + eventId + "/" + mountainId,
      });
    },
  },
  mounted() {
    this.setMountains();

    this.searchResultP = [];
    // this.setMountains(this.directive.altitude);
    // console.log("TEST");
    // this.findEventsByMountain(30, ()=> {});
  },
};
</script>

<style scoped>
@keyframes colorSwitch {
  0% {
    color: rgb(255, 29, 29);
  }
  25% {
    color: rgb(111, 255, 28);
  }
  50% {
    color: rgb(10, 204, 230);
  }
  75% {
    color: rgb(161, 26, 240);
  }
  100% {
    color: rgb(255, 29, 29);
  }
}
.testBTN {
  /* background: aquamarine; */
}

.testBTN:focus {
  background: aquamarine;
}

.hintTag {
  color: rgb(50, 145, 173);
  /* background: rgb(250, 255, 255); */
  font-size: 1em;
  padding: 2px;
  padding-left: 0.7em;
  padding-right: 0.7em;
  margin: 10px;
  border: rgb(50, 145, 173) 1px solid;
  border-radius: 99em;
}

.createEvent {
  color: rgb(243, 97, 52);
  position: absolute;

  font-weight: bold;
  margin-left: 10px;
}
.createEvent:hover {
  text-decoration: none;
  color: rgb(255, 29, 29);
  scale: 1.1;
  animation-name: colorSwitch;
  animation-duration: 2s;
  animation-iteration-count: infinite;
}

.aEvent:hover .item {
  /* color:rgb(168, 177, 184); */
  height: 50%;
}
.aEvent:hover .itemName {
  font-weight: bold;
}

.aEvent .item {
  position: absolute;
  bottom: 0%;
  padding-top: 0.28em;
  margin-top: 160px;
  width: 100%;
  height: 27.5%;
  background: rgba(53, 49, 49, 0.808);
  transition: all 0.3s ease;
  color: white;
}

.search {
  /* height: 10px; */
  /* font-size: 3em; */
  /* background: rgba(74, 71, 255, 0.13); */
  margin-bottom: 4em;

  transition: all 3s ease;
}

.height0 {
  height: 5px;
  background: yellow;
  overflow: hidden;
}

.events {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  flex-wrap: wrap;
  width: 65%;
  margin: 0 auto;

  /* background: rgba(255, 251, 0, 0.322); */
}

.aEvent {
  flex-grow: 1;
  margin: 10px;
  background: rgba(255, 99, 71, 0.514);
  position: relative;
  width: 220px;
  height: 250px;
  box-shadow: 2px 2px 5px #a2a7a8e0;
  border-radius: 20px;
  text-align: center;
  overflow: hidden;
}

.aEvent:hover {
  cursor: pointer;
}

a:hover {
  text-decoration: none;
}
.title {
  display: flex;
  flex-direction: row;
  /* width: 64%; */
  min-width: fit-content;
  align-items: center;
}
.title svg {
  width: 2em;
  height: 2em;
  color: rgb(73, 73, 73);
}

h3 {
  font-weight: bold;
  text-align: left;
  color: rgb(99, 102, 104);
}
h3::first-letter {
  font-size: 1.3em;
}
.photos {
  width: 65%;
  min-width: 320px;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: center;
}
.aImg {
  position: relative;
  flex-grow: 8;
  text-align: center;
  margin: 15px;
  border-radius: 8px;
  border-radius: 20px 20px 20px 20px;
  margin: 10px;
  width: 440px;
  height: 220px;
  background-color: violet;
  background-position: center !important;
  background-size: cover !important;
  box-shadow: 2px 2px 5px #a2a7a8e0;
  overflow: hidden;
  cursor: pointer;
  outline: none;
  border: none;

  transition: 0.7s ease;
}
.aImg:focus,
.aImg2:focus {
  width: 100%;
  height: 550px;
  outline: none;
  border: none;
  cursor: default !important;
  /* border-radius: 5em 0px 5em 0px; */
}

.aImg2:focus {
  width: 100%;
  height: 550px;
  outline: none;
  border: none;
  /* border-radius: 5em 0px 5em 0px; */
}

.aImg2 {
  position: relative;
  flex-grow: 1;
  text-align: center;
  margin: 15px;
  border-radius: 8px;
  border-radius: 20px 20px 20px 20px;
  margin: 5px;
  width: 220px;
  height: 220px;
  background-color: violet;
  background-position: center !important;
  background-size: cover !important;
  box-shadow: 2px 2px 6px rgba(167, 167, 167, 0.616);
  overflow: hidden;
  transition: 0.7s ease;
  cursor: pointer;
  outline: none;
  border: none;
}
.aImg .itemName {
  position: absolute;
  bottom: 0%;
  right: 0;
  padding: 0.1em;
  margin-top: 178px;
  width: 100%;
  height: 1.8em;
  background: rgba(53, 49, 49, 0.808);
  /* filter: blur(4px); */
  color: rgb(255, 255, 255);
  /* font-weight: bold; */
  font-size: 1.5em;
}
.aImg2 .itemName {
  position: absolute;
  bottom: 0%;
  right: 0;
  padding: 0.1em;
  margin-top: 178px;
  width: 100%;
  height: 1.8em;
  background: rgba(53, 49, 49, 0.808);
  /* filter: blur(4px); */
  color: rgb(255, 255, 255);
  /* font-weight: bold; */
  font-size: 1.5em;
}

.mountainTags {
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  flex-wrap: wrap;
  /* position: absolute; */
  /* margin-top: 18px; */
  margin-right: 20px;
  /* background: rgba(220, 20, 60, 0.411); */
}

.tag {
  line-height: 1.6em;
  padding-left: 0.6em;
  padding-right: 0.6em;

  margin-left: 0.5em;
  margin-right: 0.3em;
  margin-top: 0.5em;
  color: rgb(255, 255, 255, 0);
  background: rgba(58, 223, 209, 0.39);
  /* border: 1px white solid; */
  border-radius: 99em;
  box-shadow: 1px 1px 1px rgba(28, 31, 32, 0);
  text-shadow: 1px 1px 1px rgba(47, 52, 53, 0);

  /* 動畫設定的部分 */
  /* opacity: 0%; */
  background-color: rgba(58, 223, 209, 0);

  transition: 1s ease 0.5s;
  /* font-size: 0em; */
}

.aImg:focus .tag {
  /* opacity: 100%; */
  color: rgb(255, 255, 255, 1);
  border: 1px white solid;
  border-radius: 99em;
  box-shadow: 1px 1px 1px rgba(28, 31, 32, 0.384);
  text-shadow: 1px 1px 1px rgba(47, 52, 53, 0.384);
  background-color: rgba(58, 223, 209, 1);

  /* font-size: 1em; */
}

.aImg2:focus .tag {
  /* opacity: 100%; */
  color: rgb(255, 255, 255, 1);
  border: 1px white solid;
  border-radius: 99em;
  box-shadow: 1px 1px 1px rgba(28, 31, 32, 0.384);
  text-shadow: 1px 1px 1px rgba(47, 52, 53, 0.384);
  background-color: rgba(58, 223, 209, 1);
  /* font-size: 1em; */
}

.aImg .aGroup,
.aImg2 .aGroup {
  visibility: hidden;
  cursor: pointer;
}

.aImg:focus .aGroup,
.aImg2:focus .aGroup {
  visibility: visible;
}

.groups {
  display: flex;
  flex-direction: column;
  align-content: flex-start;
  flex-wrap: wrap;
  max-width: 100%;
  height: 78%;
  margin-top: 1em;
  margin-left: 5px;
  padding: 5px;
  overflow-x: scroll;
}

.groups::-webkit-scrollbar {
  display: none;
}

.aGroup {
  position: relative;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  width: 270px;
  height: 70px;
  background: rgba(255, 255, 255, 0);
  margin-left: 10px;
  margin-right: 10px;
  margin-bottom: 15px;
  padding-right: 3px;
  box-shadow: 2px 2px 5px rgba(212, 212, 212, 0);

  overflow: hidden;
  /* 動畫設定部分 */
  transition: all 1s ease 1.5s;
}

.groupsCount {
  background: rgb(221, 30, 30, 1);
  transition: all 1s ease;
}

.aImg:focus .groupsCount {
  opacity: 0%;
}

.aImg2:focus .groupsCount {
  opacity: 0%;
}

.aGroup .infoBtn:focus {
  height: 270px;
}

.aImg:focus .aGroup {
  background: rgba(255, 255, 255, 1);
  scale: 1;
}

.aImg2:focus .aGroup {
  background: rgba(255, 255, 255, 1);
  scale: 1;
}

.aGroup .avatar {
  margin-left: 5px;
  width: 60px;
  height: 60px;
  overflow: hidden;
}

.aGroup .shortInfo {
  display: flex;
  flex-direction: column;
  justify-self: center;
  padding-left: 0.5em;
  /* padding-top: 4px; */
  text-align: left;
  /* line-height: 33px; */
  width: 200px;
  max-height: 70px;
  color: gray;
  /* font-size: 1.1em; */
  /* background: rgba(251, 255, 217, 0.719); */
}

.aGroup .shortInfo .shortInfoTitle {
  color: rgb(197, 195, 192);
  font-weight: bold;
  font-size: 1.1em;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
  white-space: normal;
}

.aGroup .infoBtn {
  align-items: center;
  display: flex;
  justify-content: center;
  position: absolute;
  bottom: 5px;
  right: 7px;
  width: 1.1em;
  height: 1.1em;
  background: rgb(255, 255, 255);
  color: rgb(224, 209, 190);
  overflow: hidden;
}
.aGroup .infoBtn:hover {
  color: rgb(255, 182, 87);
  cursor: pointer;
}

.ellipsis {
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
  white-space: normal;
}

.ellipsis3 {
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  white-space: normal;
}
</style>