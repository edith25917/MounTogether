<template>
  <div class="body" style="margin-bottom:10px;">
    <div class="ul">
      <button @click="selectTab(1)" :class="{'btnActive':currentTab==1}">即將開始</button>
      <button @click="selectTab(2)" :class="{'btnActive':currentTab==2}">申請中</button>
      <button @click="selectTab(3)" :class="{'btnActive':currentTab==3}">歷史活動</button>
    </div>
    <activityTabContent :activities="activity" style="margin-top:40px;"></activityTabContent>
  </div>
</template>

<script>
import activityTabContent from "./activityTabContent";
import api from "@/utils/api.js";
export default {
  components: {
    activityTabContent,
  },
  data() {
    return {
      currentTab: "1",
      activity: [
        // {
        //   eventId: 155,
        //   mountainId: 48,
        //   event_name: "second trial",
        //   leader: "test4@com",
        //   date: "2020-12-06",
        //   eventType: 3,
        //   minNumOfMember: 0,
        //   numOfMember: 2,
        //   currentNumOfMember: 2,
        //   description: "再來一次看看",
        //   status: 1,
        //   messages: null,
        //   eventMembers: null,
        //   verifications: [],
        //   role: "團長",
        //   dayLeft: 6
        // },
        // {
        //   eventId: 164,
        //   mountainId: 35,
        //   event_name: "這是test4的團",
        //   leader: "test4@com",
        //   date: "2020-09-10",
        //   eventType: 2,
        //   minNumOfMember: 0,
        //   numOfMember: 3,
        //   currentNumOfMember: 1,
        //   description: "",
        //   status: 1,
        //   messages: null,
        //   eventMembers: null,
        //   dayLeft: 6,
        //   role: "團長",
        //   verifications: []
        // },
        // {
        //   eventId: 173,
        //   mountainId: 35,
        //   event_name: "想去嘉明湖",
        //   leader: "test4@com",
        //   date: "2020-09-10",
        //   eventType: 2,
        //   minNumOfMember: 0,
        //   numOfMember: 3,
        //   currentNumOfMember: 1,
        //   description: "",
        //   status: 1,
        //   messages: null,
        //   eventMembers: null,
        //   dayLeft: 6,
        //   role: "團員",
        //   verifications: []
        // },
        // {
        //   eventId: 175,
        //   mountainId: 49,
        //   event_name: "不然拉拉山",
        //   leader: "test4@com",
        //   date: "2020-12-10",
        //   eventType: 2,
        //   minNumOfMember: 0,
        //   numOfMember: 5,
        //   currentNumOfMember: 1,
        //   description: "",
        //   status: 1,
        //   dayLeft: 6,
        //   role: "團員",
        //   messages: null,
        //   eventMembers: null,
        //   verifications: []
        // }
      ],
      activitiesUpcoming: [],
      activitiesApplying: [],
      activitiesPast: [],
    };
  },

  methods: {
    selectTab(selectedTab) {
      this.currentTab = selectedTab;
      if (this.currentTab == 1) {
        this.activity = this.activitiesUpcoming;
      } else if (this.currentTab == 2) {
        this.activity = this.activitiesApplying;
      } else {
        this.activity = this.activitiesPast;
      }
    },
    manageActivity(activities, isApplyingEvent) {
      if (activities == null) {
        return;
      }
      for (let i = 0; i < activities.length; i++) {
        if (isApplyingEvent) {
          activities[i].isApplying = true;
        }
        activities[i].event.role = this.checkLeader(activities[i].event.leader); //確認是團長或團員
        activities[i].event.date = this.dateFormat(
          activities[i].event.date.split("T")[0]
        ); //把Date改成用/分隔格式
        activities[i].event.dayLeft = this.calculateDayLeft(
          activities[i].event.date
        ); //算dayleft
        activities[i].event.eventType = this.eventType(
          activities[i].event.eventType
        ); //加入步調
      }
      return activities;
    },
    eventType(type) {
      if (type == 0) {
        return "走馬開花";
      } else if (type == 1) {
        return "健行為主";
      } else if (type == 2) {
        return "強健體魄";
      } else if (type == 3) {
        return "挑戰極限";
      }
    },
    calculateDayLeft(arrDate) {
      let eventDate = new Date(arrDate).getTime();
      let today = new Date().getTime();
      let days = (eventDate - today) / (60 * 60 * 24 * 1000);
      return Math.floor(days);
    },
    dateFormat(arrDate) {
      let date = arrDate.split("-");
      return date[0] + "/" + date[1] + "/" + date[2];
    },
    checkLeader(leader) {
      if (leader == this.$store.getters.userId) {
        return "團長";
      } else {
        return "團員";
      }
    },
    getUpcomingEvents() {
      api
        .getUpcomingEvents(this.$store.getters.idToken)
        .then((res) => {
          // console.log(res);
          this.activitiesUpcoming = this.manageActivity(res.data.data, false);
          this.activity = this.activitiesUpcoming;
        })
        .catch((err) => {
          // console.log(err);
        });
    },
    getPastEvents() {
      api
        .getPastEvents(this.$store.getters.idToken)
        .then((res) => {
          this.activitiesPast = this.manageActivity(res.data.data, false);
        })
        .catch((err) => {
          console.log(err);
        });
    },
    getApplyingEvents() {
      api
        .getApplyingEvents(this.$store.getters.idToken)
        .then((res) => {
          this.activitiesApplying = this.manageActivity(res.data.data, true);
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
  mounted() {
    this.getUpcomingEvents();
    this.getPastEvents();
    this.getApplyingEvents();
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

.ul {
  overflow-x: scroll;
  margin-top: 40px;
}

.ul::-webkit-scrollbar {
  display: none;
}
</style>