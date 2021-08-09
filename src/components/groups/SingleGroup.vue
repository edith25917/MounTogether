<template>
  <div class="singleGroup picContainer">
    <div class="topImg">
      <img :src="mountain.photoPath" alt />
      <h3>
        <div v-for="(item,index) in mountain.nameArr" :key="index">{{item}}</div>
      </h3>
    </div>
    <div style=" width:98%; max-width:1000px; margin:0 auto;">
      <div
        style="font-size:1.3em; text-align:right; background:; 
       margin:0 auto; padding-top:1em; color:gray; width:100%;"
      >
        <svg
          width="1em"
          height="1em"
          viewBox="0 0 16 16"
          class="bi bi-clock-history"
          fill="currentColor"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fill-rule="evenodd"
            d="M8.515 1.019A7 7 0 0 0 8 1V0a8 8 0 0 1 .589.022l-.074.997zm2.004.45a7.003 7.003 0 0 0-.985-.299l.219-.976c.383.086.76.2 1.126.342l-.36.933zm1.37.71a7.01 7.01 0 0 0-.439-.27l.493-.87a8.025 8.025 0 0 1 .979.654l-.615.789a6.996 6.996 0 0 0-.418-.302zm1.834 1.79a6.99 6.99 0 0 0-.653-.796l.724-.69c.27.285.52.59.747.91l-.818.576zm.744 1.352a7.08 7.08 0 0 0-.214-.468l.893-.45a7.976 7.976 0 0 1 .45 1.088l-.95.313a7.023 7.023 0 0 0-.179-.483zm.53 2.507a6.991 6.991 0 0 0-.1-1.025l.985-.17c.067.386.106.778.116 1.17l-1 .025zm-.131 1.538c.033-.17.06-.339.081-.51l.993.123a7.957 7.957 0 0 1-.23 1.155l-.964-.267c.046-.165.086-.332.12-.501zm-.952 2.379c.184-.29.346-.594.486-.908l.914.405c-.16.36-.345.706-.555 1.038l-.845-.535zm-.964 1.205c.122-.122.239-.248.35-.378l.758.653a8.073 8.073 0 0 1-.401.432l-.707-.707z"
          />
          <path
            fill-rule="evenodd"
            d="M8 1a7 7 0 1 0 4.95 11.95l.707.707A8.001 8.001 0 1 1 8 0v1z"
          />
          <path
            fill-rule="evenodd"
            d="M7.5 3a.5.5 0 0 1 .5.5v5.21l3.248 1.856a.5.5 0 0 1-.496.868l-3.5-2A.5.5 0 0 1 7 9V3.5a.5.5 0 0 1 .5-.5z"
          />
        </svg>
        <span v-show="countDownDays<0">本團活動時間已結束</span>
        <span v-show="countDownDays==0">出發日就是今天!</span>
        <span v-show="countDownDays>0">
          距離開始還有
          <span style="font-size:1.5em; color:orange;">{{countDownDays}}</span>天
        </span>
      </div>

      <div
        class="content"
        style="border:1px rgb(201, 202, 206) solid; box-shadow:2px 2px 2px rgb(201, 202, 206); 
      margin-bottom:2em;  background:;
      border-radius:10px; position:relative;
      "
      >
        <div
          style="position:absolute; right:-0.4em; top:1em; font-size:1.3em; color:white; 
          font-weight:bold; z-index:5;  cursor:default; opacity:80%;
        "
        >
          <div class="marks">
            <div
              v-show="userData && userData.user.userName===event.event.leader"
              class="rowDisplay isLeader"
              style="align-items:center; border-radius:20px 0 0 20px; padding-left:0.6em; padding-right:0.6em; 
            background:gold; margin-bottom:0.5em;"
            >
              <svg
                width="1em"
                height="1em"
                viewBox="0 0 16 16"
                class="bi bi-star-fill"
                fill="currentColor"
                xmlns="http://www.w3.org/2000/svg"
                style="margin-right:5px;"
              >
                <path
                  d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.283.95l-3.523 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z"
                />
              </svg>我是團長
            </div>
            <div
              v-show="event.event && event.event.currentNumOfMember>=event.event.numOfMember"
              class="rowDisplay isLeader"
              style="align-items:center; border-radius:20px 0 0 20px; padding-left:0.6em; padding-right:0.6em; 
            background:#AC33F4 ;"
            >
              <svg
                width="1em"
                height="1em"
                viewBox="0 0 16 16"
                class="bi bi-check2-all"
                fill="currentColor"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fill-rule="evenodd"
                  d="M12.354 3.646a.5.5 0 0 1 0 .708l-7 7a.5.5 0 0 1-.708 0l-3.5-3.5a.5.5 0 1 1 .708-.708L5 10.293l6.646-6.647a.5.5 0 0 1 .708 0z"
                />
                <path
                  d="M6.25 8.043l-.896-.897a.5.5 0 1 0-.708.708l.897.896.707-.707zm1 2.414l.896.897a.5.5 0 0 0 .708 0l7-7a.5.5 0 0 0-.708-.708L8.5 10.293l-.543-.543-.707.707z"
                />
              </svg>已滿團
            </div>
          </div>
        </div>
        <!-- above checked DONE -->
        <div class="eventData" style="padding: 1.5em;">
          <div style="display:flex; flex-direction:row;align-items:center;">
            <div
              v-show="event"
              class="picContainer"
              style="min-width:70px ; height:70px;  overflow:hidden; border:1px gray dotted;"
            >
              <img
                :src="event.event.leaderPhoto"
                :alt="event.event.leader+'的頭像'"
                class="picInCenter"
              />
            </div>
            <div style="margin-left:1em;">
              <div style="font-weight:bold; font-size:1.9em; height:fix-content;">
                {{event.event.eventName}}
                <span
                  style="font-weight:normal; font-size:0.7em;"
                >(ID:{{event.event.eventId}})</span>
              </div>
              <div style="font-size:1.3em; height:fix-content;">團長：{{event.event.leaderName}}</div>
            </div>
          </div>
          <div style="padding:3px; padding-top:1em; font-size:1.2em;">
            <div class="rowDisplay">
              <div class="tag" style>{{eventType(event.event.eventType)}}</div>
              <div class="tag">{{event.event.minNumOfMember}}人成團</div>
              <div class="tag">{{event.event.status}}</div>
            </div>

            <div style="margin:10px;">
              <div style="font-size:1.2em; margin-top:10px;" class="titleDecoration">
                <svg
                  width="1em"
                  height="1em"
                  viewBox="0 0 16 16"
                  class="bi bi-dot"
                  fill="currentColor"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path fill-rule="evenodd" d="M8 9.5a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3z" />
                </svg>
                公告
              </div>
              <div style="margin-left:1.4em;">
                <div v-show="!description && !editingDesc" style="color:#C7C7C7;">--暫無公告--</div>
                <div
                  v-show="!editingDesc"
                  style="width:100%; overflow:hidden; overflow-wrap: break-word;"
                >{{description}}</div>
              </div>
              <div
                style="background:; display:flex; flex-direction:row; justify-content:flex-end;padding-right:1em;"
              >
                <div
                  v-show="userData && userData.user.userName===event.event.leader && !editingDesc"
                  @click="editingDesc=true;"
                  class="editDesBtn"
                  style="width:fit-content; background:; text-decoration:underline; color:#A3C0C3 ; 
                cursor:pointer; font-size:0.9em;
                "
                >
                  <svg
                    width="1em"
                    height="1em"
                    viewBox="0 0 16 16"
                    class="bi bi-pencil"
                    fill="currentColor"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M11.293 1.293a1 1 0 0 1 1.414 0l2 2a1 1 0 0 1 0 1.414l-9 9a1 1 0 0 1-.39.242l-3 1a1 1 0 0 1-1.266-1.265l1-3a1 1 0 0 1 .242-.391l9-9zM12 2l2 2-9 9-3 1 1-3 9-9z"
                    />
                    <path
                      fill-rule="evenodd"
                      d="M12.146 6.354l-2.5-2.5.708-.708 2.5 2.5-.707.708zM3 10v.5a.5.5 0 0 0 .5.5H4v.5a.5.5 0 0 0 .5.5H5v.5a.5.5 0 0 0 .5.5H6v-1.5a.5.5 0 0 0-.5-.5H5v-.5a.5.5 0 0 0-.5-.5H3z"
                    />
                  </svg>編輯描述
                </div>
              </div>
              <div v-show="editingDesc" style=" width:95%; margin:0 auto;">
                <textarea
                  v-model="description"
                  rows="3"
                  maxlength="256"
                  style="background:#F9FAFB; font-size:0.9em; width:100%; margin-left:5px;  border:1px gray dotted; 
                padding:5px; padding-left:15px; padding-right:15px;
              "
                ></textarea>
                <div
                  style="display:flex; flex-direction:row; justify-content:flex-end; width:100%;font-size:0.9em;"
                >
                  <div
                    @click="editCancel();"
                    style="width:3em; text-align:center; cursor:pointer; margin-right:1em;
                background:#B5C0C2 ;  color:white; border-radius:5px;
                "
                  >取消</div>
                  <div
                    @click="editDes(); editingDesc=false;"
                    style="width:3em; text-align:center; cursor:pointer; background:#FDB94A;
                  color:white; border-radius:5px;
                  "
                  >確定</div>
                </div>
              </div>
            </div>

            <hr style="width:98%;" />
            <div style="margin:10px;">
              <div style="font-size:1.2em; margin-top:10px;" class="titleDecoration">
                <svg
                  width="1em"
                  height="1em"
                  viewBox="0 0 16 16"
                  class="bi bi-dot"
                  fill="currentColor"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path fill-rule="evenodd" d="M8 9.5a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3z" />
                </svg>揪團概況
              </div>
              <div style="margin-left:1.4em;">
                <div>出發日期：{{event.event.date}}</div>
                <div>人數上限：{{event.event.numOfMember}}</div>
                <div>目前團員數：{{event.event.currentNumOfMember}}</div>
              </div>

              <hr style="width:100%;" />
              <div style="font-size:1.2em; margin-top:10px;" class="titleDecoration">
                <svg
                  width="1em"
                  height="1em"
                  viewBox="0 0 16 16"
                  class="bi bi-dot"
                  fill="currentColor"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path fill-rule="evenodd" d="M8 9.5a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3z" />
                </svg>申請列表
              </div>
              <div class="rowDisplay" style="justify-content:flex-start; margin-left:1.4em;">
                <div></div>
                <div
                  v-for="(item,index) in event.memberWithNameAndPhoto"
                  v-show="index>0 && item.member.status!=2"
                  :key="item.emId"
                  class="aMember rowDisplay"
                  style="justify-content:space-around; align-items:center;"
                >
                  <div
                    class="imgContainer"
                    style="width:80px; height:80%; background:rgb(237, 245, 245); border-radius:99em;
                    cursor:pointer;"
                    @click="toUserPage(item.member.userName)"
                  >
                    <img :src="item.photoPath" alt class="imgInCenter" />
                  </div>
                  <div
                    style="width:120px; height:75%;;  text-align:left; display:flex; flex-direction:column; justify-content:space-between;"
                  >
                    <div
                      style="font-size:1.1em; line-height:1.1em; overflow-wrap: break-word;"
                      class="ellipsis2"
                    >{{item.name}}</div>
                    <div v-if="item.member.status==1" style="font-size:0.9em; color:green;">
                      <svg
                        width="1em"
                        height="1em"
                        viewBox="0 0 16 16"
                        class="bi bi-check-circle-fill"
                        fill="currentColor"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          fill-rule="evenodd"
                          d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zm-3.97-3.03a.75.75 0 0 0-1.08.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-.01-1.05z"
                        />
                      </svg>已入團
                    </div>
                    <div v-if="item.member.status==0" style="font-size:0.9em; color:orange;">
                      <svg
                        width="1em"
                        height="1em"
                        viewBox="0 0 16 16"
                        class="bi bi-exclamation-circle"
                        fill="currentColor"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          fill-rule="evenodd"
                          d="M8 15A7 7 0 1 0 8 1a7 7 0 0 0 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"
                        />
                        <path
                          d="M7.002 11a1 1 0 1 1 2 0 1 1 0 0 1-2 0zM7.1 4.995a.905.905 0 1 1 1.8 0l-.35 3.507a.552.552 0 0 1-1.1 0L7.1 4.995z"
                        />
                      </svg>核准中
                    </div>
                  </div>
                </div>
                <div
                  v-show="canApply()"
                  class="aMember rowDisplay add"
                  style="justify-content:space-around; align-items:center; width: 240px;"
                  @click="applyIn()"
                >
                  <div
                    class="imgContainer addAvatar"
                    style="width:80px; height:80%; background:rgb(237, 245, 245); border-radius:99em;"
                  >
                    <img src="@/assets/addLogo.webp" alt class="imgInCenter" />
                  </div>
                  <div
                    class="join"
                    style="font-size:1.5em; font-weight:bold; text-align:center; width:140px; overflow:hidden;"
                  >我要入團!</div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div
          style="display:flex; flex-direction:row; 
        justify-content:flex-start;align-items:flex-end; width:93%;
        margin:0 auto;"
        >
          <div
            class="rowDisplay"
            style="margin-top:10px; padding:4px; font-size:1.3em; align-items:center;"
          >
            <svg
              width="1em"
              height="1em"
              viewBox="0 0 16 16"
              class="bi bi-chat-left-dots"
              fill="currentColor"
              xmlns="http://www.w3.org/2000/svg"
              style="margin-right:5px;"
            >
              <path
                fill-rule="evenodd"
                d="M14 1H2a1 1 0 0 0-1 1v11.586l2-2A2 2 0 0 1 4.414 11H14a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1zM2 0a2 2 0 0 0-2 2v12.793a.5.5 0 0 0 .854.353l2.853-2.853A1 1 0 0 1 4.414 12H14a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2z"
              />
              <path
                d="M5 6a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm4 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm4 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0z"
              />
            </svg>
            <div>留言區</div>
          </div>
        </div>
        <div class="msgBoard">
          <div class="msgs">
            <div class="aMsg" v-for="item in message" :key="item.messageId" style=";">
              <div class="rowDisplay" style="justify-content:space-between;">
                <div class="rowDisplay" style="align-items:center;">
                  <div class="avatar">
                    <img :src="item.photoPath" alt />
                  </div>
                  <div style="width:fit-content; font-weight:bold; font-size:1.1em;">{{item.name}}</div>
                  <div
                    class="deleteMsg rowDisplay"
                    style="align-items:center;"
                    @click="deleteMsg(item.message.messageId)"
                    v-show="userData && userData.user.userName===item.message.userName"
                  >
                    <svg
                      width="1em"
                      height="1em"
                      viewBox="0 0 16 16"
                      fill="currentColor"
                      xmlns="http://www.w3.org/2000/svg"
                      style="margin-right:5px;"
                    >
                      <path
                        fill-rule="evenodd"
                        d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zm-4.146-3.146a.5.5 0 0 0-.708-.708L8 7.293 4.854 4.146a.5.5 0 1 0-.708.708L7.293 8l-3.147 3.146a.5.5 0 0 0 .708.708L8 8.707l3.146 3.147a.5.5 0 0 0 .708-.708L8.707 8l3.147-3.146z"
                      />
                    </svg>
                    <div>刪除</div>
                  </div>
                </div>

                <div
                  style="font-size:0.8em; color:rgb(141, 212, 224);"
                >{{dayFromCreate(item.message.date)}}</div>
              </div>

              <div class="saying" style="margin-top:0.5em; padding-left:2.5em;">{{item.message.msg}}</div>
            </div>
          </div>
          <div v-show="userId()" style="display:flex; flex-direction:column; background:white; ">
            <div
              style="background:; align-items:center; display:flex; flex-direction:row;
          justify-content:space-between; width:100%; margin:0 auto;
          "
            >
              <textarea
                style="border:0; width:90%; margin:0 auto; margin-top:2em;"
                rows="4"
                v-model="msg"
                maxlength="254"
              ></textarea>
            </div>
            <div
              style="text-align:right; margin:0 auto; margin-top:1em; margin-bottom:1em; width:89%; "
            >
              <button class="btn" @click="addMsg()" style="width:4em; ">送出</button>
            </div>
          </div>
          <div
            v-show="!userId()"
            style="text-align:center; background:white; font-size:1.5em;
        padding-top:2em; padding-bottom:2em;
        "
          >
            ---
            <router-link to="/signin">登入</router-link>即可留言喔!---
          </div>
        </div>
        <!-- insertHERE -->
      </div>
    </div>
    <!--class=content -->

    <!-- test -->

    <div v-show="false">
      <div>
        userData=
        <br />
        {{userData}}
      </div>
      <br />
      <div style="color:rgb(141, 212, 224);">
        message=
        <br />
        {{message}}
      </div>
      <br />
      <div style="color:blue;">
        event=
        <br />
        {{event}}
      </div>
    </div>
  </div>
</template>

<script>
import api from "@/utils/api.js";

export default {
  data() {
    return {
      mountainIds: [],
      mountain: {},
      eventId: 0,
      event: {},
      message: [],
      userData: "",
      msg: "",
      description: "",
      editingDesc: false,
      countDownDays: "",
      defaultImage: require("@/assets/defaultProfile.png"),
    };
  },
  methods: {
    setParams() {
      this.mountainIds.push(this.$route.params.mountainId);
      this.eventId = this.$route.params.eventId;
      this.findMountainByIds();
      this.findEventById();
    },
    findMountainByIds() {
      api
        .findMountainByIds(this.mountainIds)
        .then((res) => {
          // console.log("mountainIds=", this.mountainIds);
          this.mountain = res.data.data[0];
          this.mountain.nameArr = this.mountain.mountainName.split("");
          // console.log("this.mountain=", this.mountain);
        })
        .catch((err) => {});
    },
    findEventById() {
      // console.log("eventId=",eventId);
      api
        .findEventById(this.eventId)
        .then((res) => {
          this.event = res.data.data;
          if (
            this.event.event.leaderPhoto == "http://35.194.165.190:80/user/null"
          ) {
            this.event.event.leaderPhoto = this.defaultImage;
          }
          for (let i = 0; i < this.event.memberWithNameAndPhoto.length; i++) {
            if (
              this.event.memberWithNameAndPhoto[i].photoPath ==
              "http://35.194.165.190:80/user/null"
            ) {
              this.event.memberWithNameAndPhoto[
                i
              ].photoPath = this.defaultImage;
            }
          }
          this.event.event.date = this.event.event.date.split("T")[0];
          switch (this.event.event.status) {
            case 0:
              this.event.event.status = "自動加入";
              break;
            case 1:
              this.event.event.status = "團長審核";
              break;
            default:
              break;
          }
          this.description = this.event.event.description;
          // console.log(this.event);
          this.setCountdown();
        })
        .catch((err) => {
          // console.log( err);
        });
    },
    eventType(eventType) {
      switch (eventType) {
        case 0:
          return "走馬看花";
          break;
        case 1:
          return "健行為主";
          break;
        case 2:
          return "強健體魄";
          break;
        case 3:
          return "挑戰極限";
          break;
        default:
          return "err";
          break;
      }
    },
    enterTime() {
      return new Date();
    },
    memberIsVerfy(number) {
      switch (number) {
        case 0:
          return "--待驗證--";
          break;
        case 1:
          return "OK";
          break;
        default:
          return "err";
          break;
      }
    },
    getMessage() {
      api
        .findMsgByEventId(this.eventId)
        .then((res) => {
          this.message = res.data.data;
          for (let i = 0; i < this.message.length; i++) {
            if (
              this.message[i].photoPath == "http://35.194.165.190:80/user/null"
            ) {
              this.message[i].photoPath = this.defaultImage;
            }
          }
          // console.log("this.message=", this.message);
        })
        .catch((err) => {
          console.log("err=", err);
        });
    },
    setCountdown() {
      var moment = require("moment");
      this.countDownDays = Math.ceil(
        moment(this.event.event.date).diff(moment().format()) / 86400000
      );
    },
    dayFromCreate(time) {
      var moment = require("moment");
      return moment(time).fromNow();
    },
    userId() {
      return this.$store.getters.userId;
    },
    getUserData() {
      if (this.userId()) {
        api
          .visitOtherUser(this.userId())
          .then((res) => {
            this.userData = res.data.data;
          })
          .catch((err) => {
            // console.log(err);
          });
      }
    },
    canApply() {
      //---------->是否顯示入團申請按鈕
      //未登入-->顯示
      if (!this.$store.getters.userId) {
        return true;
      }

      //團人數已達上限
      if (this.event.event.currentNumOfMember >= this.event.event.numOfMember) {
        return false;
      }

      //已申請
      let members = this.event.memberWithNameAndPhoto;
      for (let i = 0; i < members.length; i++) {
        if (members[i].member.userName === this.userId()) {
          return false;
        }
      }

      return true;
    },
    applyIn() {
      if (!this.userId()) {
        this.$router.push({ path: "/signin" });
        return;
      }
      api
        .applyIn(this.event.event.eventId, this.$store.getters.idToken)
        .then((res) => {
          this.findEventById();
        })
        .catch((err) => {});
    },
    addMsg() {
      if (this.msg) {
        api
          .addMsg(
            this.event.event.eventId,
            this.msg,
            this.$store.getters.idToken
          )
          .then((res) => {
            this.getMessage();
          })
          .catch((err) => {});
      } else {
        alert("請輸入留言");
      }
    },
    deleteMsg(messageId) {
      api
        .deleteMsg(messageId, this.$store.getters.idToken)
        .then((res) => {
          this.getMessage();
        })
        .catch((err) => {});
    },
    editDes() {
      api
        .editDescription(
          this.eventId,
          this.description,
          this.$store.getters.idToken
        )
        .then((res) => {})
        .catch((err) => {
          alert("編輯失敗");
        });
    },
    editCancel() {
      this.editingDesc = false;
      // window.location.reload();
    },
    toUserPage(userName) {
      this.$router.push({ path: "/dashboard/" + userName });
    },
  },
  mounted() {
    this.setParams();
    this.getMessage();
    this.getUserData();
    this.canApply();
  },
  beforeUpdate() {
    console.log("beforeUpdate() run");
  },
};
</script>

<style scoped>
.titleDecoration {
  color: rgb(120, 183, 202);
  /* font-weight: bold; */
}

.deleteMsg {
  padding-left: 0.5em;
  padding-right: 0.5em;
  border-radius: 4px;
  background: rgb(238, 238, 238);
  margin-left: 1em;
  color: white;
  font-size: 0.8em;
  height: fit-content;
}

.deleteMsg:hover {
  cursor: pointer;
  background: rgb(255, 214, 167);
}

.btn {
  background: rgb(141, 212, 224);
  color: white;
  font-weight: bold;
}

.btn:hover {
  background: rgb(255, 196, 102);
  color: white;
}

.addAvatar {
  transition-duration: 0.2s;
}

.add:hover .addAvatar {
  /* border: 5px rgba(69, 240, 246, 0.924) solid; */
  box-shadow: 3px 3px 3px rgba(108, 109, 148, 0.596);
}

.add:hover .join {
  opacity: 100%;
  color: rgb(47, 217, 223);
  text-shadow: 1px 1px 2px rgba(161, 176, 194, 0.596);
}

.join {
  opacity: 0;
  transition-duration: 0.2s;
}

.add {
  cursor: pointer;
}

.imgContainer {
  position: relative;
  overflow: hidden;
  border: 1px solid rgb(182, 182, 182);
  /* color: rgb(237, 245, 245); */
}

.imgInCenter {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 100%;
}

.aMember {
  margin-right: 5px;
  /* margin-bottom: 10px; */
  /* border: 1px gray solid; */
  width: 230px;
  height: 100px;
  /* background: aquamarine; */
}

textarea {
  background: rgb(241, 243, 243);
}

.rowDisplay {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
}

.columnDisplay {
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
}

.bk {
  width: 100%;
  opacity: 70%;
  position: absolute;
  bottom: -350px;
  left: 0;
  z-index: -1;
}

.tag {
  font-size: 0.85em;
  background: rgb(176, 245, 230);
  padding-left: 0.8em;
  padding-right: 0.8em;
  border-radius: 30px;
  margin-right: 1em;
  margin-top: 5px;
}

.topImg div {
  line-height: 1.1em;
}

.topImg h3 {
  position: absolute;
  font-size: 4em;
  font-weight: bold;
  top: 50px;
  left: 5%;
  transform: translate(0, 0);
  color: white;
  /* text-shadow: 5px 5px 5px rgb(137, 212, 191); */
  z-index: 5;
  /* background: rgba(185, 255, 255, 0.233); */
  /* border: salmon 2px solid; */
}
.topImg {
  width: 100%;
  height: 500px;
  position: relative;
  text-align: center;
  margin: 0;
  /* background: rgba(255, 106, 198, 0.466); */
  overflow: hidden;
  position: relative;
}
.topImg::-webkit-scrollbar {
  display: none;
}

.topImg img {
  min-width: 100%;
  min-height: 100%;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
.content {
  width: 100%;
  min-width: fit-content;
  margin: 0 auto;
  /* padding: 20px; */
  /* background: cornsilk; */
}

.msgBoard {
  width: 93%;
  /* background: rgb(236, 237, 240); */
  /* min-width: 450px; */
  /* border-radius: 10px; */
  border: 1px rgb(192, 192, 192) solid;
  margin: 0 auto;
  margin-bottom: 2em;
  /* margin-top: 20px; */
  /* padding: 10px; */
  /* padding-bottom: 2em; */
}
h4 {
  /* background: lavenderblush; */
  font-size: 1.2em;
  text-align: center;
  margin: 0px;
}

h4:hover {
  /* background: lavenderblush; */

  background: rgb(181, 253, 255);
}
.msgBoard .aMsg {
  /* background: lavender; */
  /* margin-top: 10px; */
  padding: 10px;
  padding-left: 2.2em;
  padding-right: 2.4em;
  display: flex;
  flex-direction: column;
  border: 1px rgb(219, 219, 219) dotted;
}

.avatar {
  position: relative;
  border-radius: 99em;
  /* background: chartreuse; */
  min-width: 25px;
  max-width: 25px;
  height: 25px;
  margin-right: 1em;
  overflow: hidden;
  box-shadow: 1px 1px 2px rgba(124, 134, 143, 0.425);
}

.avatar img {
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  width: 25px;
}

.msgBoard textarea {
  width: 80%;
  margin-top: 20px;
  padding: 10px;
  margin-left: 2.2em;
  margin-right: 2.4em;
  border-radius: 5px;
}

textarea:focus {
  outline: none;
}

.ellipsis2 {
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
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