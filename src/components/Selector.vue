<template>
  <div class="allsel">
    <div class="title" style="display:flex; flex-direction:row; flex-wrap:wrap;">
      <div style="height:fit-content; max-width:100%; padding-right:0.5em;">再蜿蜒的山路</div>
      <div style="height:fit-content; max-width:100%;">都有人與你同行</div>
    </div>

    <div class="subTitle">
      <svg
        style="width:1em; height:1em; color:white; margin-right:5px; margin-left:2px;margin-bottom:3px;"
        viewBox="0 0 16 16"
        fill="currentColor"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          fill-rule="evenodd"
          d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM8.5 5a.5.5 0 0 0-1 0v4.793L5.354 7.646a.5.5 0 1 0-.708.708l3 3a.5.5 0 0 0 .708 0l3-3a.5.5 0 0 0-.708-.708L8.5 9.793V5z"
        />
      </svg>快來看看哪裡有人揪爬山~
    </div>

    <div class="search" style="z-index:5;">
      <input v-model="keyword" type="search" class="searchBar" placeholder="請輸入團名" required />
      <div class="glass" @click="toEventPage()"></div>
      <div v-show="keyword" class="popUpWindow">
        <div v-show="!(searchEvents[0])">--查無結果--</div>
        <div
          v-for="(item,index) in searchEvents"
          :key="item.event.eventId"
          class="searchResult"
          @click="toKeyword(item.event.eventName)"
        >
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
          <span v-show="index!=0"></span>
          <span>{{item.event.eventName}}</span>
        </div>
      </div>
    </div>
    <div class="subTitle" style="z-index:2;">
      想去的地方沒人揪嗎?
      <router-link to="/groups/openGroup">點我來揪團!</router-link>
    </div>
    <div class="choosePart">
      <div class="titles" style="min-width: fit-content;">
        依地區
        <br />依縣市
        <br />依難度
        <br />依高度
      </div>
      <div class="titles">
        ｜
        <br />｜
        <br />｜
        <br />｜
      </div>
      <div class="tagPart">
        <div class="tags">
          <div class="tag" @click="setArea(1)">北部</div>
          <div class="tag" @click="setArea(2)">中部</div>
          <div class="tag" @click="setArea(3)">南部</div>
        </div>
        <div class="tags">
          <div
            class="tag"
            v-for="item in citys"
            @click="setCity(item.id)"
            :key="item.id"
          >{{item.city}}</div>
        </div>
        <div class="tags">
          <div class="tag" @click="setDifficulty(1)">低</div>
          <div class="tag" @click="setDifficulty(2)">中</div>
          <div class="tag" @click="setDifficulty(3)">高</div>
        </div>
        <div class="tags">
          <div class="tag" @click="setAltitude('findByAltitudeFrom3600')">3.6km以上</div>
          <div class="tag" @click="setAltitude('findByAltitude3301To3600')">3.3km-3.6km</div>
          <div class="tag" @click="setAltitude('findByAltitude3000To3300')">3.3km以下</div>
        </div>
      </div>
    </div>
    <div v-show="false">{{setKeyword}}</div>
  </div>
</template>

<script>
import api from "@/utils/api.js";
export default {
  data() {
    return {
      area: 0,
      city: "",
      citys: [
        { id: 5, city: "花蓮縣" },
        { id: 7, city: "新竹縣" },
        { id: 8, city: "宜蘭縣" },
      ],
      citySets: [
        [
          { id: 5, city: "花蓮縣" },
          { id: 7, city: "新竹縣" },
          { id: 8, city: "宜蘭縣" },
        ],
        [
          { id: 1, city: "南投縣" },
          { id: 2, city: "苗栗縣" },
          { id: 3, city: "台中縣" },
          { id: 9, city: "台東縣" },
        ],
        [
          { id: 4, city: "高雄縣" },
          { id: 6, city: "屏東縣" },
        ],
      ],
      altitude: "",
      difficulty: "",
      directive: {
        area: "",
        city: "",
        altitude: "",
        difficulty: ""
      },
      searchEvents: [],
      keyword: "",
      mountainList: [
        { name: "---請選擇山---", id: "" },
        { name: "玉山", id: 1 },
        { name: "玉山西峰", id: 2 },
        { name: "玉山前鋒", id: 3 },
        { name: "雪山", id: 4 },
        { name: "雪山東峰", id: 5 },
        { name: "向陽山", id: 6 },
        { name: "三叉山", id: 7 },
        { name: "合歡北峰", id: 8 },
        { name: "合歡東峰", id: 9 },
        { name: "合歡主峰", id: 10 },
        { name: "石門山", id: 11 },
        { name: "合歡西峰", id: 12 },
        { name: "畢祿山", id: 13 },
        { name: "羊頭山", id: 14 },
        { name: "奇萊南峰", id: 15 },
        { name: "南華山", id: 16 },
        { name: "塔關山", id: 17 },
        { name: "關山嶺山", id: 18 },
        { name: "庫哈諾辛山", id: 19 },
        { name: "志佳陽山", id: 20 },
        { name: "北大武山", id: 21 },
        { name: "郡大山", id: 22 },
        { name: "巒大山", id: 23 },
        { name: "奇萊北峰", id: 24 },
        { name: "奇萊主峰", id: 25 },
        { name: "品田山", id: 26 },
        { name: "桃山", id: 27 },
        { name: "池有山", id: 28 },
        { name: "喀拉業山", id: 29 },
        { name: "秀姑巒山", id: 30 },
        { name: "大水窟山", id: 31 },
        { name: "八通關山", id: 32 },
        { name: "大霸尖山", id: 33 },
        { name: "小霸尖山", id: 34 },
        { name: "伊澤山", id: 35 },
        { name: "加利山", id: 36 },
        { name: "六順山", id: 37 },
        { name: "屏風山", id: 38 },
        { name: "白姑大山", id: 39 },
        { name: "玉山東峰", id: 40 },
        { name: "玉山北峰", id: 41 },
        { name: "玉山南峰", id: 42 },
        { name: "南玉山", id: 43 },
        { name: "鹿山", id: 44 },
        { name: "東小南山", id: 45 },
        { name: "大劍山", id: 46 },
        { name: "佳陽山", id: 47 },
        { name: "劍山", id: 48 },
        { name: "南湖大山", id: 49 },
        { name: "南湖東峰", id: 50 },
        { name: "巴巴山", id: 51 },
        { name: "南湖北山", id: 52 },
        { name: "審馬陣山", id: 53 },
        { name: "中央尖山", id: 54 },
        { name: "南湖南峰", id: 55 },
        { name: "馬比衫山", id: 56 },
        { name: "關山", id: 57 },
        { name: "卑南主山", id: 58 },
        { name: "小關山", id: 59 },
        { name: "海諾南山", id: 60 },
        { name: "雲峰", id: 61 },
        { name: "南雙頭山", id: 62 },
        { name: "轆轆山", id: 63 },
        { name: "尖山", id: 64 },
        { name: "塔芬山", id: 65 },
        { name: "能高南鋒", id: 66 },
        { name: "能高山", id: 67 },
        { name: "白石山", id: 68 },
        { name: "安東軍山", id: 69 },
        { name: "光頭山", id: 70 },
        { name: "新康山", id: 71 },
        { name: "布拉克桑山", id: 72 },
        { name: "卓社大山", id: 73 },
        { name: "干卓萬山", id: 74 },
        { name: "火山", id: 75 },
        { name: "牧山", id: 76 },
        { name: "大雪山", id: 77 },
        { name: "頭鷹山", id: 78 },
        { name: "火石山", id: 79 },
        { name: "中雪山", id: 80 },
        { name: "雪山北峰", id: 81 },
        { name: "太魯閣大山", id: 82 },
        { name: "", id: 0 },
        { name: "", id: 0 },
        { name: "", id: 0 },
        { name: "", id: 0 },
        { name: "", id: 0 },
        { name: "磐石山", id: 88 },
        { name: "帕托魯山", id: 89 },
        { name: "立霧主山", id: 90 },
        { name: "馬博拉斯山", id: 91 },
        { name: "馬利加南山", id: 92 },
        { name: "馬西山", id: 93 },
        { name: "盆駒山", id: 94 },
        { name: "喀西帕山", id: 95 },
        { name: "無明山", id: 96 },
        { name: "鈴鳴山", id: 97 },
        { name: "閂山", id: 98 },
        { name: "甘薯山", id: 99 },
        { name: "東郡大山", id: 100 },
        { name: "東巒大山", id: 101 },
        { name: "丹大山", id: 102 },
        { name: "無雙山", id: 103 },
        { name: "內嶺爾山", id: 104 },
        { name: "義西請馬至山", id: 105 }
      ]
    };
  },
  methods: {
    setCity(cityId) {
      this.resetSel();
      this.city = cityId;
      // console.log(this.city);
      this.emitChildEvent();
    },
    setArea(areaId) {
      this.resetSel();
      this.area = areaId;
      // console.log(this.area);
      this.citys = this.citySets[--areaId];
      // console.log(this.citys);
      this.emitChildEvent();
    },
    setAltitude(alt) {
      this.resetSel();
      this.altitude = alt;
      // console.log(this.altitude);
      this.emitChildEvent();
    },
    setDifficulty(dif) {
      this.resetSel();
      this.difficulty = dif;
      // console.log(this.difficulty);
      this.emitChildEvent();
    },
    resetSel() {
      this.area = "";
      this.city = "";
      this.altitude = "";
      this.difficulty = "";
    },
    setDirective() {
      // console.log("setDirective()");
      this.directive.area = this.area;
      this.directive.city = this.city;
      this.directive.altitude = this.altitude;
      this.directive.difficulty = this.difficulty;
    },
    emitChildEvent() {
      this.setDirective();
      this.$emit("chlidEmitEvent", this.directive);
    },
    searchResult() {
      // console.log("enter searchResult(keyword)");
      if (!this.keyword) {
        this.searchEvents = [];
        return;
      }
      //利用關鍵字找團
      api
        .searchEventByKeyword(this.keyword)
        .then((res) => {
          this.searchEvents = res.data.data;
          this.setMountainData();
          // console.log("this.searchEvents(ByName)=", this.searchEvents);
        })
        .catch((err) => {
          // console.log("searchEventByKeyword(this.keyword) err", err);
        });
    },
    setMountainData() {
      for (let i = 0; i < this.searchEvents.length; i++) {
        this.searchEvents[i].mountainName = this.mountainList[
          this.searchEvents[i].mountainId
        ].name;
        this.searchEvents[i].date = this.searchEvents[i].date.split("T")[0];
      }
    },
    toKeyword(value) {
      this.keyword = value;
    },
    toEventPage() {
      if (this.searchEvents.length <= 0) {
        alert("查無搜尋結果!");
        return;
      }

      if (this.searchEvents.length == 1) {
        this.$router.push(
          `/groups/singleGroup/${this.searchEvents[0].event.eventId}/${this.searchEvents[0].event.mountainId}`
        );
        return;
      }
      // console.log("this.$emit(searchEventsthis.searchEvents) run");
      this.$emit("searchEvents", this.searchEvents);
      this.keyword = "";
    },
  },
  computed: {
    setKeyword() {
      // console.log("setKeyword()");
      this.searchResult();
      return this.keyword;
    },
  },
  mounted() {
    this.searchResult();
  },
};
</script>

<style  scoped>
@keyframes upAndDown {
  0% {
    bottom: 0%;
  }
  50% {
    bottom: 15%;
  }
  100% {
    bottom: 0%;
  }
}
a {
  color: rgb(255, 243, 71);
  position: absolute;
  margin-left: 10px;
}
a:hover {
  text-decoration: none;
  color: rgb(251, 255, 36);
  font-weight: bold;
  scale: 1.1;
  animation-name: upAndDown;
  animation-duration: 0.3s;
  animation-iteration-count: infinite;
}

.allsel {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  text-align: left;
  /* background: rgba(255, 238, 143, 0.521); */
  padding-left: 7%;
}
.title {
  font-size: 2.5em;
  font-weight: bold;
  color: white;
  text-shadow: 2px 4px 3px rgba(0, 0, 0, 0.3);
  /* background: rgba(211, 164, 255, 0.37); */
}

.title::-webkit-scrollbar {
  display: none;
}
.subTitle {
  font-size: 1.3em;
  color: white;
  margin-top: 10px;
  text-shadow: 2px 4px 3px rgba(0, 0, 0, 0.3);
  position: relative;
}
.search {
  height: 45px;
  display: flex;
  /* background-color: green; */
  justify-content: flex-start;
  position: relative;
}
.glass {
  background: url("../assets/scope.png") center/cover no-repeat;
  background-size: contain;
  background-color: rgb(255, 193, 111);
  width: 60px;
  height: 45px;
  margin-right: 30px;
  border-radius: 0px 5pt 5pt 0px;
  border-width: 0;
  cursor: pointer;
  box-shadow: 0px 3px 3px rgba(141, 134, 125, 0.548);
}
.glass:active {
  border-width: 0;
  outline: none;
  background-color: rgb(255, 37, 55);
}
.search > input {
  max-width: 600px;
  width: 90%;
  background-color: rgb(255, 255, 255);
  border-radius: 5pt 0 0 5pt;
  /* border-block: none; */
  padding-left: 18px;
  /* border-color: darkgrey; */
  border: 0 solid gray;
  margin-right: 0px;
  box-shadow: 0px 3px 3px rgba(141, 134, 125, 0.548);
}

.search > input::placeholder {
  color: rgb(218, 218, 218);
}

.search > input:focus {
  /* border: none; */
  outline: none;
  border-color: darkgrey;
  /* background: yellow; */
}

.popUpWindow {
  position: absolute;
  top: 2.8em;
  left: 0em;
  /* font-size: 1.2em; */
  color: rgb(141, 141, 141);
  padding: 5px;
  padding-left: 1em;
  padding-right: 1em;
  border-radius: 0px 0px 5px 5px;
  border: 1px gray solid;
  background: white;
  max-width: 600px;
  line-height: 2.3em;
  width: 80%;
  box-shadow: 2px 2px 2px rgba(128, 134, 138, 0.479);
  overflow-y: scroll;
  max-height: 230px;
}

.search svg {
  margin-right: 3px;
  padding-bottom: 2px;
}

.search .searchResult:hover {
  background: rgb(254, 255, 202);
  border-radius: 10px;
}

.search .searchResult:focus {
  background: rgb(254, 255, 202);
  border-radius: 10px;
}

.choosePart {
  margin-top: 5px;
  display: flex;
  flex-direction: row;
  line-height: 1.9em;
  color: white;
  font-size: 1.1em;
  text-shadow: 2px 4px 3px rgba(0, 0, 0, 0.384);
}

.choosePart .titles {
  font-weight: bold;
  /* background: cornflowerblue; */
  margin-left: 3px;
}

.tagPart .tags {
  /* margin-top: 5px; */
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  height: 1.85em;
  align-items: center;
  min-width: fit-content;
  /* background: rgba(255, 127, 80, 0.568); */
  overflow-x: scroll;
}

.tagPart .tags::-webkit-scrollbar {
  display: none;
}

.tagPart .tags .tag {
  line-height: 1.2em;
  padding-left: 0.7em;
  padding-right: 0.7em;
  font-size: 0.9em;
  margin-left: 0.5em;
  margin-right: 0.3em;
  margin-top: 0.5em;
  border: 1px white solid;
  border-radius: 99em;
  min-width: fit-content;
  /* background: rgba(255, 127, 80, 0.568); */
}

.tagPart .tags .tag:hover {
  background: rgb(255, 255, 255);
  color: rgb(56, 97, 124);
  cursor: pointer;

  text-shadow: 0px 0px 0px rgba(0, 0, 0, 0.384);
}

.ellipsis {
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
  white-space: normal;
}
</style>