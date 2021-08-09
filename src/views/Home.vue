<template>
  <div class="home" align="center">
    <div class="homeContent" style="max-width:100%; overflow-x:scroll;">
      <main>
        <a href="/#selector" class="item">揪爬山</a>
        <a href="/#popularLocation" class="item">熱門景點</a>
        <!-- <a href="#celebrity" :class="menu03" @mouseover="mOver03();">人氣山友</a> -->
        <a href="/#topClimber" class="item">百岳霸王</a>
      </main>
    </div>

    <div class="topImg">
      <div class="selector">
        <Selector @chlidEmitEvent="recieveChildEvent" @searchEvents="recieveSearchEvents" />
      </div>
    </div>
    <br id="selector" />
    <br />
    <!-- <button @click="testProp++;">testProp</button> -->
    <HotPlace
      :area="testProp.area"
      :city="testProp.city"
      :altitude="testProp.altitude"
      :difficultyP="testProp.difficulty"
      :searchResultP="searchEventFromSelector"
    />
    <div class="blank" />
    <Arriving />
    <div class="blank" id="popularLocation" />
    <PopularLocation />
    <div class="blank" id="celebrity" />
    <!-- <Celebrity /> -->
    <div class="blank" id="topClimber" />
    <TopClimber />

    <Footer />
  </div>
</template>

<script>
import Selector from "@/components/Selector.vue";
import HotPlace from "@/components/HotPlace.vue";
import Arriving from "@/components/Arriving.vue";
import PopularLocation from "@/components/PopularLocation.vue";
import Celebrity from "@/components/Celebrity.vue";
import TopClimber from "@/components/TopClimber.vue";

import Footer from "@/components/Footer.vue";

export default {
  name: "Home",
  components: {
    Selector,
    HotPlace,
    Arriving,
    PopularLocation,
    Celebrity,
    TopClimber,
    Footer
  },
  data() {
    return {
      testProp: {
        area: "",
        city: "",
        altitude: "",
        difficulty: "",
      },
      searchEventFromSelector: [],
    };
  },
  methods: {
    recieveChildEvent(result) {
      this.testProp = result;
    },
    recieveSearchEvents(result) {
      this.searchEventFromSelector = result;
    },
  },
};
</script>

<style scoped>
* {
  box-sizing: border-box;
}

.homeContent::-webkit-scrollbar {
  display: none;
}

body {
  background: #f6f5f7;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  font-family: "Montserrat", sans-serif;
  height: 100vh;
  margin: -20px 0 50px;
}

h1 {
  font-weight: bold;
  margin: 0;
}

h2 {
  text-align: center;
}

p {
  font-size: 14px;
  font-weight: 100;
  line-height: 20px;
  letter-spacing: 0.5px;
  margin: 20px 0 30px;
}

span {
  font-size: 12px;
}

a {
  color: #333;
  font-size: 14px;
  text-decoration: none;
  margin: 15px 0;
}

button {
  border-radius: 20px;
  border: 1px solid #01a2a6;
  background-color: #01a2a6;
  color: #ffffff;
  font-size: 12px;
  font-weight: bold;
  padding: 12px 30px;
  margin: 10px;
  letter-spacing: 1px;
  text-transform: uppercase;
  transition: transform 80ms ease-in;
}

button:active {
  transform: scale(0.95);
}

button:focus {
  outline: none;
}

button.ghost {
  background-color: transparent;
  border-color: #ffffff;
}

form {
  background-color: #ffffff;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  padding: 0 50px;
  height: 100%;
  text-align: center;
}

input {
  background-color: #eee;
  border: none;
  padding: 12px 15px;
  margin: 8px 0;
  width: 100%;
}

.modal-body {
  position: relative;
}

.close {
  position: absolute;
  top: 0;
  padding: 10px;
  right: 0;
}

.closeIcon {
  font-size: 20px;
  color: gray;
}

b {
  color: #01a2a6;
  cursor: pointer;
}

.fab {
  color: white;
}

.social-container {
  margin: 20px 0;
}

.social-container a {
  border: 1px solid #dddddd;
  background: #dc4e41;
  border-radius: 50%;
  display: inline-flex;
  justify-content: center;
  align-items: center;
  margin: 0 5px;
  height: 40px;
  width: 40px;
  text-decoration: none;
}

div .topImg {
  width: 100%;
  height: 32em;
  background: url("https://images.pexels.com/photos/584327/pexels-photo-584327.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940")
    center/cover no-repeat;
  border-radius: 0 0 0% 0%;
  position: relative;
  z-index: 1;
}

.selector {
  width: 100%;
  position: absolute;
  left: 0%;
  top: 50%;
  transform: translate(0, -50%);
  z-index: 2;
}

.blank {
  height: 100px;
}
/* ----------for menu */
.homeContent {
  padding-top: 0.1em;
  position: sticky;
  top: 0%;
  background: rgba(125, 190, 166, 0.808);
  height: fit-content;

  width: 100%;
  box-shadow: 0px 5px 5px rgba(51, 83, 88, 0.356);
  transform: translate(0);
  z-index: 3;
}
main {
  /* background-color: pink; */
  width: 40%;
  max-height: 2.5em;
  display: flex;
  justify-content: space-around;
  align-items: center;
  padding: 5px;
}
main a {
  color: #ffffff;
  text-decoration: none;
}
main > .item {
  color: #ffffff;
  font-size: 1.5em;
  flex: none;
  min-width: 4.5em;
  margin: 0px;
  margin-right: 0.5em;
  margin-left: 0.5em;
  padding-bottom: 0px;
  cursor: pointer;
}

main > .item:hover {
  font-weight: bold;
}

main > .underLine {
  font-size: 1.5em;
  font-weight: bold;
  /* border-bottom: 2px solid #f8ac3b !important; */
  width: 100px;
  height: 100%;
  margin: 0px;
  margin-bottom: 0px;
  padding-bottom: 0px;
  cursor: pointer;
  /* background-color: #3a8486fa; */
}
</style>
