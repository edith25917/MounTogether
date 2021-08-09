<template>
  <div class="topClimber">
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
      <h3 class="king">百岳霸王</h3>
    </div>

    <h3 style="font-weight:bold; margin-bottom:30px;">
      <svg
        width="1em"
        height="1em"
        viewBox="0 0 16 16"
        fill="gray"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          fill-rule="evenodd"
          d="M9.669.864L8 0 6.331.864l-1.858.282-.842 1.68-1.337 1.32L2.6 6l-.306 1.854 1.337 1.32.842 1.68 1.858.282L8 12l1.669-.864 1.858-.282.842-1.68 1.337-1.32L13.4 6l.306-1.854-1.337-1.32-.842-1.68L9.669.864zm1.196 1.193l-1.51-.229L8 1.126l-1.355.702-1.51.229-.684 1.365-1.086 1.072L3.614 6l-.25 1.506 1.087 1.072.684 1.365 1.51.229L8 10.874l1.356-.702 1.509-.229.684-1.365 1.086-1.072L12.387 6l.248-1.506-1.086-1.072-.684-1.365z"
        />
        <path d="M4 11.794V16l4-1 4 1v-4.206l-2.018.306L8 13.126 6.018 12.1 4 11.794z" />
      </svg>攀登最高海拔
    </h3>
    <div class="outUsers">
      <marquee style="width:65%;   min-width:320px;" BEHAVIOR="ALTERNATE" SCROLLAMOUNT="5">
        <div style="display:flex; flex-direction:row;">
          <div
            class="aUser"
            v-for="(item,index) in topAltitudes"
            :key="item.userName"
            v-show="index<10"
          >
            <img :src="item.photoPath" class="headPic" @click="toUserPage(item.userName)" />
            <div class="rank">
              <img :src="getRankImg(index+1)" />
            </div>

            <div class="name">{{item.name}}</div>
            <div class="achievement">
              <div>總海拔(公尺)</div>
              <div class="number">{{item.totalAltitude}}</div>
            </div>
          </div>
        </div>
      </marquee>
    </div>

    <br />
    <h3 style="font-weight:bold; margin-bottom:30px;">
      <svg
        width="1em"
        height="1em"
        viewBox="0 0 16 16"
        fill="gray"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          fill-rule="evenodd"
          d="M9.669.864L8 0 6.331.864l-1.858.282-.842 1.68-1.337 1.32L2.6 6l-.306 1.854 1.337 1.32.842 1.68 1.858.282L8 12l1.669-.864 1.858-.282.842-1.68 1.337-1.32L13.4 6l.306-1.854-1.337-1.32-.842-1.68L9.669.864zm1.196 1.193l-1.51-.229L8 1.126l-1.355.702-1.51.229-.684 1.365-1.086 1.072L3.614 6l-.25 1.506 1.087 1.072.684 1.365 1.51.229L8 10.874l1.356-.702 1.509-.229.684-1.365 1.086-1.072L12.387 6l.248-1.506-1.086-1.072-.684-1.365z"
        />
        <path d="M4 11.794V16l4-1 4 1v-4.206l-2.018.306L8 13.126 6.018 12.1 4 11.794z" />
      </svg>登山次數最多
    </h3>
    <div class="outUsers">
      <marquee style="width:65%;  min-width:320px;" BEHAVIOR="ALTERNATE" SCROLLAMOUNT="5">
        <div style="display:flex; flex-direction:row;">
          <div
            class="aUser"
            v-for="(item,index) in topTimes"
            :key="item.userName"
            v-show="index<10"
          >
            <img :src="item.photoPath" class="headPic" @click="toUserPage(item.userName)" />
            <div class="rank">
              <img :src="getRankImg(index+1)" />
            </div>

            <div class="name">{{item.name}}</div>
            <div class="achievement">
              <div>登山次數</div>
              <div class="number">{{item.totalNumOfRecords}}</div>
            </div>
          </div>
        </div>
      </marquee>
    </div>
  </div>
</template>

<script>
import api from "@/utils/api.js";
export default {
  data() {
    return {
      topAltitudes: [],
      topTimes: [],
      defaultImage: require("@/assets/defaultProfile.png"),
    };
  },
  methods: {
    getRankImg(index) {
      if (index > 10) return 10;
      return require("@/assets/ranks/rank" + index + ".png");
    },
    topClimbersByAltitude() {
      api
        .topClimbersByAltitude()
        .then((res) => {
          this.topAltitudes = res.data.data;
          for (let i = 0; i < this.topAltitudes.length; i++) {
            if (
              this.topAltitudes[i].photoPath ==
              "http://35.194.165.190:80/user/null"
            ) {
              this.topAltitudes[i].photoPath = this.defaultImage;
            }
          }
        })
        .catch((err) => {});
    },
    topClimbersByRecords() {
      api
        .topClimbersByRecords()
        .then((res) => {
          this.topTimes = res.data.data;
          for (let i = 0; i < this.topTimes.length; i++) {
            if (
              this.topTimes[i].photoPath == "http://35.194.165.190:80/user/null"
            ) {
              this.topTimes[i].photoPath = this.defaultImage;
            }
          }
        })
        .catch((err) => {});
    },
    toUserPage(userName) {
      this.$router.push({ path: "/dashboard/" + userName });
    },
  },
  mounted() {
    this.topClimbersByAltitude();
    this.topClimbersByRecords();
  },
};
</script>

<style scoped>
.title {
  display: flex;
  flex-direction: row;
  width: 64%;
  min-width: 320px;
  align-items: center;
  margin-bottom: 1em;
}
.title svg {
  width: 2em;
  height: 2em;
  color: rgb(73, 73, 73);
}

.king {
  font-weight: bold;
  text-align: left;
  color: rgb(99, 102, 104);
}

.king::first-letter {
  font-size: 1.3em;
}

.outUsers {
  display: flex;
  justify-content: center;
  align-items: center;
}

/* 隱藏卷軸 */
.users::-webkit-scrollbar {
  display: none;
}

.aUser {
  width: 120px;
  height: 220px;
  margin-left: 20px;
  margin-right: 20px;
  text-align: center;
}

.aUser img:hover {
  cursor: pointer;
}

.userPause {
  animation-play-state: paused;
}
.userContinue {
  animation-play-state: running;
}

.headPic {
  width: 100px;
  height: 100px;
  border-radius: 99em;
  background-color: rgb(240, 246, 246);
  box-shadow: 2px 2px 5px #969b9ce0;
}
.rank {
  font-size: 1em;
  width: 100%;
  /* background: yellow; */
  /* margin-right: -75%; */
  text-align: right;
  margin-top: -30%;
  /* z-index: 5; */
  overflow: hidden;
}
.rank img {
  width: 25px;
  /* height: 100%; */
  -webkit-filter: drop-shadow(2px 2px 1px rgba(174, 180, 180, 0.7));
}
.name {
  width: 90%;
  height: 1.6em;
  margin-top: 3px;
  margin-bottom: 3px;
  font-weight: bold;
  line-height: 1.6em;
  border-bottom: 1px rgb(177, 177, 177) solid;
  overflow: hidden;
}

.achievement {
  font-weight: bold;
  font-size: 0.7em;
}
.achievement .number {
  color: rgb(46, 180, 192);
  font-size: 1.5em !important;
}

img {
  object-fit: cover;
}
</style>