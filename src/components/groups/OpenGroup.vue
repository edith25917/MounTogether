 <template>
  <div class="openGroup">
    <div class="applyBlock">
      <h3>開團</h3>
      <form>
        <div class="aSelection">
          <div class="name">團名</div>
          <div class="input">
            <input type="text" v-model="eventSetting.eventName" required maxlength="12" />
          </div>
        </div>
        <div class="aSelection">
          <div class="name">地點</div>
          <select
            name="mountainListName"
            id="mountainListId"
            class="inputList"
            v-model="eventSetting.mountainId"
            required
          >
            <option
              class="mountainListOption"
              v-for="(item ,index) in mountainList"
              :key="index"
              :value="item.id"
            >
              {{item.name}}
              <span v-show="index>0">(id_{{item.id}})</span>
            </option>
          </select>
        </div>
        <div class="aSelection">
          <div class="name">出發時間</div>
          <div class="input">
            <input type="date" v-model="eventSetting.date" :min="today" required />
          </div>
        </div>
        <div class="aSelection">
          <div class="name">團隊步調</div>
          <select
            name="mountainListName"
            id="mountainListId"
            class="inputList"
            v-model="eventSetting.eventType"
            required
          >
            <option
              class="mountainListOption"
              v-for="(item ,index) in eventTypes"
              :key="index"
              :value="item.id"
            >{{item.eventType}}</option>
          </select>
        </div>
        <div class="aSelection">
          <div class="name">成團人數</div>
          <div class="memberNum">
            <div class="input2">
              <input type="number" min="1" max="99" value="1" v-model="eventSetting.minNumOfMember" />
            </div>
            <div class="people">人～</div>
            <div class="input2">
              <input
                type="number"
                :min="eventSetting.minNumOfMember"
                max="99"
                v-model="eventSetting.numOfMember"
              />
            </div>
            <div class="people">人</div>
          </div>
        </div>

        <div class="aSelection">
          <div class="name">描述</div>
          <div class="input">
            <textarea type="text" v-model="eventSetting.description" maxlength="1000" />
          </div>
        </div>
        <div class="aSelection">
          <div class="name">入團驗證</div>
          <div
            class="verify"
            style="background:; display:flex; flex-direction:row; justify-content:space-around;
            margin-top:0.3em; margin-bottom:0.5em;
            "
          >
            <div style="display:flex; flex-direction:row; align-items:center;">
              <input
                type="radio"
                v-model="eventSetting.status"
                name="verify"
                value="1"
                required
                style="width:1em; margin-right:0.5em;"
              />
              <span>團長核准</span>
            </div>
            <div style="display:flex; flex-direction:row; align-items:center;">
              <input
                type="radio"
                v-model="eventSetting.status"
                name="verify"
                value="0"
                required
                style="width:1em; margin-right:0.5em;"
              />
              <span>自動加入</span>
            </div>
          </div>
        </div>

        <div class="btnBlock">
          <router-link to="/">
            <button class="btn">取消</button>
          </router-link>
          <!-- <router-link to="/"> -->
          <!-- <router-link :to="'/groups/singleGroup/'+resResult.eventId+'/'+resResult.mountainId"> -->
          <button class="btn" type="button" @click="createEvent();">確定</button>
          <!-- </router-link> -->
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import api from "@/utils/api.js";

export default {
  data() {
    return {
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
      ],
      eventTypes: [
        { id: "", eventType: "---請選擇步調---" },
        { id: 0, eventType: "走馬看花" },
        { id: 1, eventType: "健行為主" },
        { id: 2, eventType: "強健體魄" },
        { id: 3, eventType: "登峰造極" }
      ],
      eventSetting: {
        status: 1,
        description: "",
        eventType: "",
        eventName: "",
        minNumOfMember: 1,
        numOfMember: 1,
        mountainId: "",
        date: "",
      },
      resResult: "",
      today: "",
      test01: 354,
      test02: 88,
    };
  },
  methods: {
    setToday() {
      var moment = require("moment");
      let dateTime = moment().format();
      let now = dateTime.toString().split("T")[0];
      this.today = now;
    },
    createEvent() {
      if (
        this.eventSetting.minNumOfMember > this.eventSetting.numOfMember ||
        this.eventSetting.eventType == -1 ||
        this.eventSetting.mountainId == -1 ||
        this.eventSetting.date == "" ||
        this.eventSetting.eventName == ""
      ) {
        alert("請填入正確資訊");
        return;
      }
      api
        .createEvent(this.eventSetting, this.$store.getters.idToken)
        .then((res) => {
          this.resResult = res;
          //成功創團後跳轉頁面
          this.$router.push({
            // path: `/groups/singleGroup/${this.test01}/${this.test02}`
            // path: "/groups/singleGroup/354/88"
            path: "/",
          });
        })
        .catch((err) => {});
    },
  },
  mounted() {
    // this.createEvent();
    this.setToday();
  },
  beforeCreate() {
    document
      .querySelector("body")
      .setAttribute(
        "style",
        "background:	url('https://images.pexels.com/photos/417173/pexels-photo-417173.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940')"
      );
  },
  beforeDestroy() {
    document.querySelector("body").removeAttribute("style");
  },
};
</script>

<style scoped>
h3 {
  margin: 0 auto;
  margin-top: 10px;
  font-weight: bold;
  font-size: 1.7em;
  height: 1.5em;
}
.openGroup {
  display: flex;
  justify-content: center;
  /* background: rgba(216, 237, 245, 0.671); */
  height: inherit;
}

.applyBlock {
  margin-top: 2em;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-content: center;
  padding: 20px;
  width: 400px;
  background: rgb(255, 255, 255);
  box-shadow: 2px 2px 2px rgba(153, 160, 161, 0.603);
  border-radius: 5px;
  font-size: 1.2em;
}

.aSelection {
  width: 90%;
  /* background: lightpink; */
  margin: 0px auto;
  margin-bottom: 15px;
}

.aSelection input,
.inputList {
  width: 100%;
  height: 1.5em;
  outline: none;
  border: none;
  background: rgb(245, 245, 245);
  padding-left: 0.5em;
  padding-right: 0.7em;
}

.aSelection .input2 {
  width: 20%;
  height: 1.5em;
  outline: none;
  border: none;
  background: rgb(245, 245, 245);
  padding-left: 0.2em;
  /* padding-right: 0.2em; */
}
.aSelection .input2 input {
  /* width: 120%; */
}

.memberNum {
  display: flex;
  flex-direction: row;
  width: 100%;
  /* background: yellow; */
}

.people {
  margin-left: 10px;
}

.aSelection textarea {
  font-size: 0.9em;
  width: 100%;
  height: 5em;
  outline: none;
  border: none;
  background: rgb(245, 245, 245);
  padding-left: 0.5em;
  padding-right: 0.7em;
}

.verify {
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
}

.btnBlock {
  margin: 0 auto;
  width: 90%;
  display: flex;
  justify-content: flex-end;
  /* background: khaki; */
}

.btnBlock .btn {
  font-weight: bold;
  width: 3.5em;
  height: 3.5em;
  border-radius: 99em;
  border: none;
  outline: none;
  margin-left: 10px;
  background: rgb(235, 235, 235);
}
.btnBlock .btn:hover {
  background: rgb(255, 188, 81);
}

.mountainListOption {
  outline: none;
  border: none;
}
.name {
  font-weight: bold;
  font-size: 1.1em;
  color: rgb(110, 154, 179);
}
</style>