<template>
  <div>
    <router-link to="/groups/singleGroup">
      <div class="title">
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
        <h3>即將開始</h3>
      </div>
    </router-link>
    <div class="photos">
      <div
        class="pic"
        v-for="(item,index) in events"
        :key="item.eventId"
        v-show="index<8"
        :style="{ 'background-image': `url(${item.photoPath})` }"
        @click="toSearchEvent(item.event.eventId,item.event.mountainId)"
      >
        <div class="item">
          <div class="itemName ellipsis1" style="width:70%; margin:0 auto;">{{item.event.eventName}}</div>
          <div class="itemContent">
            <div>{{item.event.date}}</div>
            <div>{{item.mountainName}}</div>
            <div class="ellipsis3">{{item.event.description}}</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import api from "@/utils/api.js";
export default {
  data() {
    return {
      events: [],
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
        { name: "義西請馬至山", id: 105 },
      ],
    };
  },
  methods: {
    getClosestEvents() {
      api
        .closestEvents()
        .then((res) => {
          this.events = res.data.data;
          this.setMountainData();
          // console.log("getClosestEvents() events=", this.events);
        })
        .catch((err) => {
          // console.log("getClosestEvents() err", err);
        });
    },
    setMountainData() {
      for (let i = 0; i < this.events.length; i++) {
        this.events[i].event.date = this.events[i].event.date.split("T")[0];
      }
    },
    toSearchEvent(eventId, mountainId) {
      this.$router.push({
        path: "/groups/singleGroup/" + eventId + "/" + mountainId,
      });
    },
  },
  mounted() {
    this.getClosestEvents();
  },
};
</script>

<style scoped>
a:hover {
  text-decoration: none;
}
.title {
  display: flex;
  flex-direction: row;
  width: 64%;
  min-width: 320px;
  align-items: center;
}
.title svg {
  width: 2em;
  height: 2em;
  color: rgb(224, 146, 72);
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
  /* background: red; */
}

.pic {
  position: relative;
  flex-grow: 1;
  width: 220px;
  height: 250px;
  box-shadow: 2px 2px 5px #a2a7a8e0;
  border-radius: 5%;
  text-align: center;
  /* margin-top: 10px; */
  margin: 10px;
  overflow: hidden;
  background-position: center !important;
  background-size: cover !important;
  /* background-color: blue ; */
}

.pic:hover {
  cursor: pointer;
}
.pic:hover .item {
  height: 50%;
}
.pic:hover .itemName {
  font-weight: bold;
}

.pic .item {
  position: absolute;
  bottom: 0%;
  padding-top: 0.28em;
  margin-top: 160px;
  width: 100%;
  height: 26%;
  background: rgba(53, 49, 49, 0.808);
  transition: all 0.3s ease;
}

.pic .item .itemName {
  /* filter: blur(4px); */
  color: rgb(255, 255, 255);
  /* font-weight: bold; */
  font-size: 1.1em;
  margin-bottom: 0.2em;
}
.pic .item .itemContent {
  /* filter: blur(4px); */
  color: rgb(255, 255, 255);
  /* font-weight: bold; */
  padding-left: 2em;
  padding-right: 2em;
  font-size: 0.7em;
  text-align: left;
}
.ellipsis3 {
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  white-space: normal;
}
.ellipsis1 {
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
  white-space: normal;
}
</style>