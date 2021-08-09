<template>
  <div class="body">
    <div class="noData" v-if="activities==null">
      <h5 :style="{'font-weight':'bold'}">目前沒有活動喔!</h5>
    </div>
    <div class="cards">
      <article
        class="card card--1"
        v-bind:key="activity.event.eventId"
        v-for="activity in activitiesInner"
      >
        <div class="card__info-top">
          <div class="card__clock-info">
            <svg class="card__clock" viewBox="0 0 24 24">
              <path
                d="M12,20A7,7 0 0,1 5,13A7,7 0 0,1 12,6A7,7 0 0,1 19,13A7,7 0 0,1 12,20M19.03,7.39L20.45,5.97C20,5.46 19.55,5 19.04,4.56L17.62,6C16.07,4.74 14.12,4 12,4A9,9 0 0,0 3,13A9,9 0 0,0 12,22C17,22 21,17.97 21,13C21,10.88 20.26,8.93 19.03,7.39M11,14H13V8H11M15,1H9V3H15V1Z"
              />
            </svg>
            <span
              v-if="activity.event.dayLeft>=0"
              class="card__time"
            >距離開始還有{{activity.event.dayLeft}}天</span>
            <span v-if="activity.event.dayLeft<0" class="card__time">旅程已經結束啦!</span>
          </div>

          <div
            @click="clickStatus(activity.event.eventId,activeItem)"
            class="card_option"
            v-if="activity.event.dayLeft>=0"
          >
            <!-- <div class="circle" v-if="activity.event.role=='團長'&&candidates==null">
              <i class="fa fa-exclamation-circle" aria-hidden="true"></i>
            </div>-->

            <i class="fas fa-ellipsis-h"></i>

            <div class="card_option_submenu" v-if="activeItem==activity.event.eventId&&click">
              <!-- 即將開始 "團員 -->
              <button
                class="btnmenu"
                data-toggle="modal"
                data-target="#exampleModal"
                v-on-clickaway="away"
                v-if="activeItem==activity.event.eventId && activity.event.role=='團員' &&!activity.isApplying"
                @click="showModal(1,activity.event.eventId)"
              >我要退團</button>

              <!-- 即將開始"團長" -->
              <button
                class="btnmenu"
                data-toggle="modal"
                data-target="#exampleModal"
                v-on-clickaway="away"
                v-if="activeItem==activity.event.eventId && activity.event.role=='團長'"
                @click="showModal(2,activity.event.eventId)"
              >查看申請人</button>
              <button
                class="btnmenu"
                data-toggle="modal"
                data-target="#exampleModal"
                v-on-clickaway="away"
                v-if="activeItem==activity.event.eventId&& activity.event.role=='團長'"
                @click="showModal(4,activity.event.eventId)"
              >刪除此團</button>

              <!-- 申請中 -->
              <button
                class="btnmenu"
                data-toggle="modal"
                data-target="#exampleModal"
                v-on-clickaway="away"
                v-if="activeItem==activity.event.eventId&& activity.event.role=='團員' &&activity.isApplying"
                @click="showModal(3,activity.event.eventId)"
              >取消申請</button>
            </div>

            <!-- Modal -->
            <div
              class="modal fade"
              id="exampleModal"
              tabindex="-1"
              role="dialog"
              aria-labelledby="exampleModalLabel"
              aria-hidden="true"
            >
              <div class="modal-dialog modal-dialog-centered">
                <div class="modal-content">
                  <div class="modal-header text-center">
                    <h5 class="modal-title w-100" id="exampleModalLabel">{{modalTitle}}</h5>
                    <button
                      type="button"
                      class="close"
                      @click="setActiveItem"
                      data-dismiss="modal"
                      aria-label="Close"
                    >
                      <span aria-hidden="true">&times;</span>
                    </button>
                  </div>

                  <div class="modal-body">
                    <p v-if="modalTitle=='取消申請'">確定要取消申請團嗎?</p>
                    <p v-if="modalTitle=='申請退團'">確定要退出團嗎?</p>
                    <p v-if="modalTitle=='刪除團'">確定要刪除團嗎?</p>
                    <div v-if="modalTitle=='申請人列表'" class="wrap2">
                      <div class="verification">
                        <p class="alert" v-if="candidates==null">目前沒有其他申請人!</p>
                        <div
                          class="block"
                          v-bind:key="index"
                          v-for="(candidate,index) in candidates"
                        >
                          <div class="vef-photo">
                            <img :src="candidate.applicantPhoto" />
                          </div>
                          <div class="vef-other">
                            <p class="name ellipsis">{{candidate.applicantName}}</p>
                            <div class="btncheck">
                              <button class="btnskip" @click="updateStatus(2,candidate)">拒絕</button>
                              <button class="btnverify" @click="updateStatus(1,candidate)">確認</button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div class="modal-footer">
                    <button
                      type="button"
                      class="btn btn-secondary"
                      data-dismiss="modal"
                      @click="setActiveItem()"
                    >{{cancel}}</button>
                    <button
                      type="button"
                      class="btn btn-primary"
                      data-dismiss="modal"
                      @click="confirm()"
                    >{{submit}}</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div
          @click="goto(activity)"
          class="card__img"
          :style="{ backgroundImage: 'url(' + activity.photoPath + ')' }"
        ></div>

        <div @click="goto(activity)" class="card__info">
          <span class="card__category">{{activity.event.date}}</span>
          <h5 class="card__title ellipsis">{{activity.event.eventName}}</h5>
          <div class="card_detail">
            <div class="card_detail_title">
              <p>目前人數:</p>
              <p>爬山地點:</p>
              <p>團隊步調:</p>
            </div>
            <div class="card_detail_content">
              <p>{{activity.event.currentNumOfMember}}</p>
              <p>{{activity.mountainName}}</p>
              <span>{{activity.event.eventType}}</span>
              <p class="normal" :class="{'role':activity.event.role=='團長'}">{{activity.event.role}}</p>
            </div>
          </div>
        </div>
      </article>
    </div>
  </div>
</template>

<script>
import api from "@/utils/api.js";
import axios from "axios";
import { mixin as clickaway } from "vue-clickaway";

export default {
  mixins: [clickaway],

  props: {
    activities: Array,
  },
  data() {
    return {
      imageUrl: "https://picsum.photos/id/237/200/300",
      nowtime: "",
      activeItem: "",
      click: false,
      submit: "",
      cancel: "",
      modalTitle: "",
      activitiesInner: this.activities,
      eventId: "",
      candidates: [
        {
          eventMember: {
            emId: 160,
            userName: "test5@com",
            eventId: 155,
            status: 0,
            photo_path: null,
          },
        },
        {
          eventMember: {
            emId: 158,
            userName: "test5",
            eventId: 155,
            status: 0,
            photo_path: null,
          },
        },
      ],
      isActive: true,
    };
  },
  watch: {
    activities(newval) {
      this.activitiesInner = newval;
    },
  },

  methods: {
    clickStatus(eventId, activeItem) {
      if (!this.isActive) {
        this.isActive = true;
        return;
      }

      this.activeItem = eventId;
      if (this.activeItem == activeItem) {
        this.click = !this.click;
        return;
      }
      this.click = true;
    },
    setActiveItem() {
      this.isActive = false;
    },
    away: function () {
      this.activeItem = 0;
      this.isActive = false;
    },
    confirm() {
      this.isActive = false;
      this.activeItem = 0;
      if (this.modalTitle == "申請退團") {
        this.quitEvent();
      }
      if (this.modalTitle == "取消申請") {
        this.deleteApplyingEvents();
      }
      if (this.modalTitle == "刪除團") {
        this.deleteEvent();
      }
      if (this.modalTitle == "申請人列表") {
        window.location.reload();
      }
    },
    showModal(button, eventId) {
      this.eventId = eventId;
      if (button == 1) {
        this.cancel = "再想想";
        this.submit = "確定退團";
        this.modalTitle = "申請退團";
      } else if (button == 2) {
        this.modalTitle = "申請人列表";
        this.cancel = "取消";
        this.submit = "完成";
        this.checkAppliedRequest(this.eventId);
      } else if (button == 3) {
        this.cancel = "再想想";
        this.submit = "取消申請";
        this.modalTitle = "取消申請";
      } else if (button == 4) {
        this.cancel = "再想想";
        this.submit = "刪除";
        this.modalTitle = "刪除團";
      }
    },
    goto(activity) {
      this.$router.push(
        "/groups/singleGroup/" +
          activity.event.eventId +
          "/" +
          activity.event.mountainId
      );
    },
    //取消申請
    deleteApplyingEvents() {
      api
        .deleteApplyingEvents(this.eventId, this.$store.getters.idToken)
        .then((res) => {
          if (res.data.status != 200) {
            // console.log(res);
            return;
          }
          alert("取消成功!");
          if (this.activitiesInner.length == 1) {
            window.location.reload();
          } else {
            this.activitiesInner = this.activitiesInner.filter(
              (ac) => ac.event.eventId !== this.eventId
            );
          }
        })
        .catch((err) => {
          // console.log(err);
        });
    },
    //查看申請人
    checkAppliedRequest(eventId) {
      this.eventId = eventId;
      api
        .checkAppliedRequest(this.eventId, this.$store.getters.idToken)
        .then((res) => {
          if (res.data.status != 200) {
            // console.log(res);
            return;
          }
          // if (res.data.data == null) {
          //   this.candidates;
          // }
          this.candidates = res.data.data;
          if (this.candidates && this.candidates.length > 0) {
            return true;
          }
          return false;
        })
        .catch((err) => {
          // console.log(err);
        });
    },
    //退團
    quitEvent() {
      api
        .quitEvent(this.eventId, this.$store.getters.idToken)
        .then((res) => {
          if (res.data.status != 200) {
            // console.log(res);
            return;
          }
          alert("退團成功!");
          if (this.activitiesInner.length == 1) {
            window.location.reload();
          } else {
            this.activitiesInner = this.activitiesInner.filter(
              (ac) => ac.event.eventId !== this.eventId
            );
          }
        })
        .catch((err) => {
          // console.log(err);
        });
    },
    //刪除團
    deleteEvent() {
      api
        .deleteEvent(this.eventId, this.$store.getters.idToken)
        .then((res) => {
          if (res.data.status != 200) {
            // console.log(res);
            return;
          }
          alert("刪除成功!");
          if (this.activitiesInner.length == 1) {
            window.location.reload();
          } else {
            this.activitiesInner = this.activitiesInner.filter(
              (ac) => ac.event.eventId !== this.eventId
            );
          }
        })
        .catch((err) => {
          // console.log(err);
        });
    },
    //審核申請人
    updateStatus(status, candidate) {
      if (status == 2) {
        confirm("確認要拒絕嗎?");
      }

      api
        .updateStatus(
          status,
          candidate.eventMember.emId,
          this.$store.getters.idToken
        )
        .then((res) => {
          if (res.data.status != 200) {
            // console.log(res);
            return;
          }
          if (status == 1) {
            alert(candidate.eventMember.userName + "已成功加入");
          }
          if (this.candidates.length == 1) {
            window.location.reload();
          } else {
            this.candidates = this.candidates.filter(
              (c) => c.eventMember.emId !== candidate.eventMember.emId
            );
          }
        })
        .catch((err) => {
          // console.log(err);
        });
    },
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
}

.noData {
  background-image: url("../../../assets/hiking2.png");
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  opacity: 0.8;
  max-width: 960px;
  width: 100%;
  height: 500px;
  margin: auto;
  border-radius: 20px;
  margin-top: 0;
  margin-bottom: 40px;
}

.cards {
  width: 100%;
  display: flex;
  display: -webkit-flex;
  flex-wrap: wrap;
}

.card_option {
  width: 40px;
  cursor: pointer;
  font-size: 24px;
  color: #707070;
  position: relative;
}

.circle {
  position: absolute;
  top: -10px;
  right: 5px;
}

.fa-exclamation-circle {
  font-size: 12px;
  color: red;
}

button {
  background-color: #fff;
  color: #3d454d;
  font-size: 14px;
  font-weight: bold;
  padding: 10px 20px;
  border: none;
  transition: transform 80ms ease-in;
}

button:active {
  transform: scale(0.95);
}

button:focus {
  outline: none;
}

.card_option_submenu {
  width: 120px;
  z-index: 3;
  position: absolute;
  right: 0;
  box-shadow: 1px 1px 5px rgb(194, 194, 194);
  border-radius: 10px;
  /* border: 1px solid #f7f7f7; */
  margin-top: 5px;
  margin-right: 5px;
}

.card_option_submenu > button {
  transform: none;
}

.btnmenu {
  width: 100%;
  font-size: 14px;
  display: block;
}

.btnmenu:hover {
  background: #e7edf8;
}

.card__info-top {
  display: flex;
  justify-content: space-between;
  align-items: space-between;
  border-bottom: 1px solid #d6d6d6;
}

.card__clock {
  width: 15px;
  vertical-align: middle;
  fill: #ad7d52;
}

.card__time {
  font-size: 14px;
  font-weight: bold;
  color: #ad7d52;
  vertical-align: middle;
  margin-left: 5px;
}

.card__clock-info {
  margin-left: 10px;
  margin-top: 10px;
  color: #707070;
}

.card__img {
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  opacity: 0.8;
  width: 100%;
  height: 135px;
  cursor: pointer;
}

.card {
  margin: 0 0 40px 20px;
  transition: all 0.8s cubic-bezier(0.175, 0.885, 0, 1);
  background-color: #fff;
  width: 30%;
  min-width: fit-content;
  white-space: nowrap;
  border-radius: 12px;
  max-height: 300px;
  box-shadow: 0px 13px 10px -7px rgba(0, 0, 0, 0.1);
  position: relative;
}

.card__info {
  height: 55%;
  z-index: 2;
  background-color: #fff;
  border-bottom-left-radius: 12px;
  border-bottom-right-radius: 12px;
  padding: 8px 24px 24px 24px;
  cursor: pointer;
}

.card__category {
  font-size: 13px;
  letter-spacing: 2px;
  /* font-weight: 500; */
  color: #868686;
}

.card__title {
  margin-top: 5px;
  margin-bottom: 2px;
  max-height: 70px;
}

.card_detail {
  padding: 10px;
  display: flex;
  color: #8d8d8d;
  font-size: 14px;
  line-height: 24px;
  width: 100%;
}

.card_detail_title {
  width: 40%;
}

.ellipsis {
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
  white-space: normal;
}

.normal {
  float: right;
  font-weight: bold;
  font-size: 16px;
  color: rgb(1, 138, 250);
}

.card_detail_content {
  width: 60%;
}

.role {
  color: darkorange;
}

.modal-header {
  /* background-color: #6e5de3; */
  /* color: white; */
  font-weight: bold;
}

.modal-dialog {
  width: 350px;
  margin: auto;
}

.modal-body > p {
  font-size: 18px;
}

.modal-footer {
  padding: 0;
  margin: 0;
  justify-content: space-between;
}

.modal-footer > button {
  width: 50%;
  margin: 0;
}

/* 申請人列表modal */
.wrap2 {
  display: flex;
  flex-direction: column;
  width: 100%;
}

.verification {
  max-width: 100%;
}

.block {
  background-color: #f7f9fc;
  margin: 10px;
  width: 95%;
  border-radius: 5px;
  display: flex;
}

.vef-other {
  justify-content: space-between;
  width: 100%;
  display: flex;
  flex-direction: column;
  padding: 10px;
  font-size: 14px;
}

.vef-photo {
  width: 25%;
}

.name {
  width: 100%;
  font-weight: bold;
}

.btncheck {
  width: 100%;
  align-self: flex-end;
  text-align: right;
}

.btnskip {
  border-radius: 10px;
  border: 1px solid#a1a1a1;
  background-color: #a1a1a1;
  color: #fff;
  font-size: 12px;
  font-weight: bold;
  padding: 3px 14px;
  margin: 0px 2px;
  letter-spacing: 1px;
  transition: transform 80ms ease-in;
}

.btnverify {
  border-radius: 10px;
  border: 1px solid #01a2a6;
  background-color: #01a2a6;
  color: #fff;
  font-size: 12px;
  font-weight: bold;
  padding: 3px 14px;
  margin: 0px 2px;
  letter-spacing: 1px;
  transition: transform 80ms ease-in;
}

img {
  width: 60px;
  height: 60px;
  border-radius: 50%;
  border: 1px solid lightgray;
  margin: 4px;
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