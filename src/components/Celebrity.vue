<template>
  <div class="main">
    <h3 style="font-weight:bold;">人氣山友</h3>
    <div class="aRow">
      <div class="aUser">
        <div>{{celebrity[0].rank}}</div>
        <div class="pic">{{celebrity[0].pic}}</div>
        <div>
          <div>{{celebrity[0].name}}</div>
          <div>{{celebrity[0].fans}}追蹤</div>
        </div>
        <button>+追蹤</button>
      </div>
      <div class="aUser">
        <div>{{celebrity[1].rank}}</div>
        <div class="pic">{{celebrity[1].pic}}</div>
        <div>
          <div>{{celebrity[1].name}}</div>
          <div>{{celebrity[1].fans}}追蹤</div>
        </div>
        <button>+追蹤</button>
      </div>
      <div class="aUser">
        <div>{{celebrity[2].rank}}</div>
        <div class="pic">{{celebrity[2].pic}}</div>
        <div>
          <div>{{celebrity[2].name}}</div>
          <div>{{celebrity[2].fans}}追蹤</div>
        </div>
        <button>+追蹤</button>
      </div>
    </div>
    <div class="aRow">
      <div class="aUser">
        <div>{{celebrity[0].rank}}</div>
        <div class="pic">{{celebrity[0].pic}}</div>
        <div>
          <div>{{celebrity[0].name}}</div>
          <div>{{celebrity[0].fans}}追蹤</div>
        </div>
        <button>+追蹤</button>
      </div>
      <div class="aUser">
        <div>{{celebrity[1].rank}}</div>
        <div class="pic">{{celebrity[1].pic}}</div>
        <div>
          <div>{{celebrity[1].name}}</div>
          <div>{{celebrity[1].fans}}追蹤</div>
        </div>
        <button>+追蹤</button>
      </div>
      <div class="aUser">
        <div>{{celebrity[2].rank}}</div>
        <div class="pic">{{celebrity[2].pic}}</div>
        <div>
          <div>{{celebrity[2].name}}</div>
          <div>{{celebrity[2].fans}}追蹤</div>
        </div>
        <button>+追蹤</button>
      </div>
    </div>
    <div class="aRow">
      <div class="aUser">
        <div>{{celebrity[0].rank}}</div>
        <div class="pic">{{celebrity[0].pic}}</div>
        <div>
          <div>{{celebrity[0].name}}</div>
          <div>{{celebrity[0].fans}}追蹤</div>
        </div>
        <button>+追蹤</button>
      </div>
      <div class="aUser">
        <div>{{celebrity[1].rank}}</div>
        <div class="pic">{{celebrity[1].pic}}</div>
        <div>
          <div>{{celebrity[1].name}}</div>
          <div>{{celebrity[1].fans}}追蹤</div>
        </div>
        <button>+追蹤</button>
      </div>
      <div class="aUser">
        <div>{{celebrity[2].rank}}</div>
        <div class="pic">{{celebrity[2].pic}}</div>
        <div>
          <div>{{celebrity[2].name}}</div>
          <div>{{celebrity[2].fans}}追蹤</div>
        </div>
        <button>+追蹤</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      celebrity: [
        { rank: "1", pic: "pic01", name: "name01", fans: 9523 },
        { rank: "2", pic: "pic02", name: "name02", fans: 8567 },
        { rank: "3", pic: "pic03", name: "name03", fans: 8045 },
        { rank: "4", pic: "pic04", name: "name04", fans: 6012 },
        { rank: "5", pic: "pic05", name: "name05", fans: 9523 },
        { rank: "6", pic: "pic06", name: "name06", fans: 8567 },
        { rank: "7", pic: "pic07", name: "name07", fans: 8045 },
        { rank: "8", pic: "pic08", name: "name08", fans: 6012 }
      ]
    };
  }
};
</script>

<style scoped>
h3 {
  margin-bottom: 20px;
}
.main {
  width: 65%;
}
.aUser {
  width: 30%;
  display: flex;
  justify-content: space-around;
  align-items: center;
}
.aRow {
  display: flex;
  justify-content: space-between;
  margin-bottom: 30px;
}
.pic {
  width: 70px;
  height: 70px;
  border-radius: 99em;
  background-color: aqua;
}
button {
  background-color: cadetblue;
  color: white;
  border: none;
  border-radius: 99em;
  width: 80px;
}
button:focus {
  outline: none;
  background-color: white;
  color: black;
  border: 1px black solid;
}
</style>