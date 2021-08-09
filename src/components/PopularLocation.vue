<template>
  <div class="popularLocation">
    <div class="title" style="min-width:350px;">
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
      <h3>熱門景點</h3>
    </div>
    <div class="allRanks" style="background:; width:65%; margin:auto 0; min-width:360px;">
      <div
        v-for="(item,index) in mountains"
        :key="item.mountainId"
        v-show="index==0"
        style="background:; min-height:250px; padding:10px;
        display:flex; flex-direction:row align-items:strecth;
        "
      >
        <div
          class="pic picContainer"
          style="
          background:green; border-radius:15px; width:50%; min-width:120px;
          overflow:hidden; max-height:250px; flex-grow:1;;    
        "
        >
          <img :src="item.photoPath" class="picInCenter" />
        </div>
        <div
          class="textArea"
          style="margin-left:1em; background:; position:relative; flex-grow:8; "
        >
          <div
            style="background:; position:relative; text-align:left; margin-bottom:10px; font-size:1.7em; font-weight:bold;"
          >
            <div>{{item.mountainName}}</div>
            <div
              style="width:fit-content; position:absolute; right:5px; bottom:-8px; font-size:0.8em; font-weight:normal;"
            >
              最熱門／
              <span style="font-size:2.2em; color:red;
              ">1</span>
            </div>
          </div>
          <div
            class="paragraph"
            style="text-align:left; margin-bottom:15px; min-height:100px; overflow-y:scroll; max-height:110px;"
          >{{item.description}}</div>
          <div class="tags" style="background:; position:absolute; bottom:0px; width:100%;">
            <div class="tag">
              <svg
                class="icon"
                xmlns="http://www.w3.org/2000/svg"
                id="Capa_1"
                enable-background="new 0 0 512 512"
                height="512"
                viewBox="0 0 512 512"
                width="512"
              >
                <g>
                  <path
                    d="m381.148 160.07s-20.652 54.278-59.78 42.54c-32.684-9.805-30.809-54.137-15.091-90.711 27.233-63.371-50.539-111.899-50.539-111.899s1.216 64.276-48.22 88.759c-42.359 20.979-53.983 66.736-34.241 100.91 18.305 31.686-1.109 50.899-18.157 57.743-43.368 17.412-68.606-36.458-68.606-36.458-18.246 29.978-28.742 65.182-28.742 102.837 0 108.984 87.953 197.393 196.749 198.189-49.745-.791-89.989-41.476-90.036-91.396-.229-19.778 4.514-40.885 14.095-62.737l5.293-12.072 26.814 7.837c4.302-21.175 15.154-40.033 31.966-55.284 15.853-14.381 31.32-20.48 33.032-21.128l18.258-6.914 1.977 19.423c2.021 19.872 7.155 36.313 15.692 50.264 7.657 12.494 14.76 22.975 23.066 34.865 8.363 11.994 12.922 28.219 12.845 45.7-.008 24.425-9.528 47.39-26.809 64.67-17.276 17.278-40.259 26.792-64.717 26.792h.003c109.478 0 198.228-88.729 198.228-198.208 0-62.019-28.49-117.386-73.08-153.722z"
                  />
                  <path
                    d="m317.522 420.435c.054-11.202-2.66-21.562-7.445-28.425-7.448-10.661-15.522-22.454-24.05-36.367-7.479-12.221-12.894-25.697-16.366-40.809-13.545 9.978-30.488 28.421-31.059 58.467l-.373 19.617-36.971-10.806c-4.647 13.453-6.922 26.255-6.775 38.194l.001.185c.013 33.927 27.606 61.509 61.512 61.509 16.444 0 31.895-6.394 43.505-18.003 11.621-11.622 18.021-27.066 18.021-43.49z"
                  />
                </g>
              </svg>
              熱度：{{item.summitReached}}
            </div>
            <div class="tag">
              <svg
                width="1em"
                height="1em"
                viewBox="0 0 16 16"
                class="bi bi-geo-alt icon"
                fill="currentColor"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fill-rule="evenodd"
                  d="M8 16s6-5.686 6-10A6 6 0 0 0 2 6c0 4.314 6 10 6 10zm0-7a3 3 0 1 0 0-6 3 3 0 0 0 0 6z"
                />
              </svg>
              {{item.cityName.city}}
            </div>
            <div class="tag">
              <svg
                class="icon"
                xmlns="http://www.w3.org/2000/svg"
                xmlns:xlink="http://www.w3.org/1999/xlink"
                version="1.1"
                id="Capa_1"
                x="0px"
                y="0px"
                viewBox="0 0 512 512"
                style="enable-background:new 0 0 512 512;"
                xml:space="preserve"
              >
                <g>
                  <g>
                    <path
                      d="M76,211H15c-8.291,0-15,6.709-15,15s6.709,15,15,15h61c8.291,0,15-6.709,15-15S84.291,211,76,211z"
                    />
                  </g>
                </g>
                <g>
                  <g>
                    <path
                      d="M466,211h-60c-8.291,0-15,6.709-15,15s6.709,15,15,15h60c8.291,0,15-6.709,15-15S474.291,211,466,211z"
                    />
                  </g>
                </g>
                <g>
                  <g>
                    <path
                      d="M410.702,56.298c-5.859-5.859-15.352-5.859-21.211,0L347.069,98.72c-5.859,5.859-5.859,15.352,0,21.211    c5.859,5.859,15.352,5.859,21.211,0l42.422-42.422C416.561,71.65,416.561,62.157,410.702,56.298z"
                    />
                  </g>
                </g>
                <g>
                  <g>
                    <path
                      d="M134.931,98.72L92.509,56.298c-5.859-5.859-15.352-5.859-21.211,0c-5.859,5.859-5.859,15.352,0,21.211l42.422,42.422    c5.859,5.859,15.352,5.859,21.211,0C140.79,114.072,140.79,104.579,134.931,98.72z"
                    />
                  </g>
                </g>
                <g>
                  <g>
                    <path
                      d="M241,0c-8.291,0-15,6.709-15,15v61c0,8.291,6.709,15,15,15s15-6.709,15-15V15C256,6.709,249.291,0,241,0z"
                    />
                  </g>
                </g>
                <g>
                  <g>
                    <g>
                      <path
                        d="M238.555,307.542c0.014,0.02,0.031,0.037,0.045,0.057C238.057,306.783,238.067,306.801,238.555,307.542z"
                      />
                      <path
                        d="M238.555,307.542c-6.021-8.638-19.168-8.621-25.154,0.057l-65.7,99L118.001,367c-6-8.101-18.001-8.101-24.001,0L3,488     c-3.3,4.499-3.9,10.499-1.5,15.599C4.2,508.7,9.3,512,15,512h358.9C372.016,509.167,246.186,319.12,238.555,307.542z"
                      />
                    </g>
                  </g>
                </g>
                <g>
                  <g>
                    <path
                      d="M241,121c-66.167,0-120,53.833-120,120c0,35.473,15.564,67.69,40.913,89.934l26.499-39.924    c8.73-12.656,22.676-19.937,37.588-19.937c3.078,0,6.072,0.496,9.027,1.097l43.4-65.198c8.423-12.407,22.412-19.673,37.573-19.673    s29.15,7.266,37.412,19.453l3.763,5.649C344.26,160.067,297.263,121,241,121z"
                    />
                  </g>
                </g>
                <g>
                  <g>
                    <path
                      d="M509.277,488.598L328.599,223.599c-5.7-8.399-19.499-8.399-25.199,0l-42.653,64.085    c6.193,7.491,43.37,65.763,149.163,224.315h87.066c5.4,0,10.499-3.001,13.2-7.8C512.877,499.1,512.577,493.399,509.277,488.598z"
                    />
                  </g>
                </g>
                <g />
                <g />
                <g />
                <g />
                <g />
                <g />
                <g />
                <g />
                <g />
                <g />
                <g />
                <g />
                <g />
                <g />
                <g />
              </svg>
              {{item.difficultyLv.difficulty}}
            </div>
          </div>
        </div>
      </div>
      <hr style="width:95%" />
      <div style="display:flex; flex-direction:row; flex-wrap:wrap; justify-content:space-around; ">
        <div
          v-for="(item,index) in mountains"
          :key="item.mountainId"
          v-show="index>0&&index<3"
          style="width:48%; backgroundwheat; min-width:400px; flex-grow:1; padding:10px;  min-width:360px;"
        >
          <div
            style="display:flex; flex-direction:row; font-size:1.5em; margin-bottom:10px;
          align-items:flex-end;
          "
          >
            <div style="background:; width:50px; font-size:1.2em;">{{index+1}}</div>
            <div>{{item.mountainName}}</div>
          </div>
          <div style="display:flex; flex-direction:row;  ">
            <div
              class="picContainer"
              style="min-width:120px; height:120px; background:pink;  border-radius:15px; overflow:hidden;"
            >
              <img :src="item.photoPath" class="picInCenter" />
            </div>
            <div
              class="paragraph"
              style="margin-left:15px; text-align:left; height:120px; overflow-y:scroll;"
            >{{item.description}}</div>
          </div>
          <div class="tags" style="background:;　width:100%; margin-top:25px;">
            <div class="tag">
              <svg
                class="icon"
                xmlns="http://www.w3.org/2000/svg"
                id="Capa_1"
                enable-background="new 0 0 512 512"
                height="512"
                viewBox="0 0 512 512"
                width="512"
              >
                <g>
                  <path
                    d="m381.148 160.07s-20.652 54.278-59.78 42.54c-32.684-9.805-30.809-54.137-15.091-90.711 27.233-63.371-50.539-111.899-50.539-111.899s1.216 64.276-48.22 88.759c-42.359 20.979-53.983 66.736-34.241 100.91 18.305 31.686-1.109 50.899-18.157 57.743-43.368 17.412-68.606-36.458-68.606-36.458-18.246 29.978-28.742 65.182-28.742 102.837 0 108.984 87.953 197.393 196.749 198.189-49.745-.791-89.989-41.476-90.036-91.396-.229-19.778 4.514-40.885 14.095-62.737l5.293-12.072 26.814 7.837c4.302-21.175 15.154-40.033 31.966-55.284 15.853-14.381 31.32-20.48 33.032-21.128l18.258-6.914 1.977 19.423c2.021 19.872 7.155 36.313 15.692 50.264 7.657 12.494 14.76 22.975 23.066 34.865 8.363 11.994 12.922 28.219 12.845 45.7-.008 24.425-9.528 47.39-26.809 64.67-17.276 17.278-40.259 26.792-64.717 26.792h.003c109.478 0 198.228-88.729 198.228-198.208 0-62.019-28.49-117.386-73.08-153.722z"
                  />
                  <path
                    d="m317.522 420.435c.054-11.202-2.66-21.562-7.445-28.425-7.448-10.661-15.522-22.454-24.05-36.367-7.479-12.221-12.894-25.697-16.366-40.809-13.545 9.978-30.488 28.421-31.059 58.467l-.373 19.617-36.971-10.806c-4.647 13.453-6.922 26.255-6.775 38.194l.001.185c.013 33.927 27.606 61.509 61.512 61.509 16.444 0 31.895-6.394 43.505-18.003 11.621-11.622 18.021-27.066 18.021-43.49z"
                  />
                </g>
              </svg>
              熱度：{{item.popularity}}
            </div>
            <div class="tag">
              <svg
                width="1em"
                height="1em"
                viewBox="0 0 16 16"
                class="bi bi-geo-alt icon"
                fill="currentColor"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fill-rule="evenodd"
                  d="M8 16s6-5.686 6-10A6 6 0 0 0 2 6c0 4.314 6 10 6 10zm0-7a3 3 0 1 0 0-6 3 3 0 0 0 0 6z"
                />
              </svg>
              {{item.cityName.city}}
            </div>
            <div class="tag">
              <svg
                class="icon"
                xmlns="http://www.w3.org/2000/svg"
                xmlns:xlink="http://www.w3.org/1999/xlink"
                version="1.1"
                id="Capa_1"
                x="0px"
                y="0px"
                viewBox="0 0 512 512"
                style="enable-background:new 0 0 512 512;"
                xml:space="preserve"
              >
                <g>
                  <g>
                    <path
                      d="M76,211H15c-8.291,0-15,6.709-15,15s6.709,15,15,15h61c8.291,0,15-6.709,15-15S84.291,211,76,211z"
                    />
                  </g>
                </g>
                <g>
                  <g>
                    <path
                      d="M466,211h-60c-8.291,0-15,6.709-15,15s6.709,15,15,15h60c8.291,0,15-6.709,15-15S474.291,211,466,211z"
                    />
                  </g>
                </g>
                <g>
                  <g>
                    <path
                      d="M410.702,56.298c-5.859-5.859-15.352-5.859-21.211,0L347.069,98.72c-5.859,5.859-5.859,15.352,0,21.211    c5.859,5.859,15.352,5.859,21.211,0l42.422-42.422C416.561,71.65,416.561,62.157,410.702,56.298z"
                    />
                  </g>
                </g>
                <g>
                  <g>
                    <path
                      d="M134.931,98.72L92.509,56.298c-5.859-5.859-15.352-5.859-21.211,0c-5.859,5.859-5.859,15.352,0,21.211l42.422,42.422    c5.859,5.859,15.352,5.859,21.211,0C140.79,114.072,140.79,104.579,134.931,98.72z"
                    />
                  </g>
                </g>
                <g>
                  <g>
                    <path
                      d="M241,0c-8.291,0-15,6.709-15,15v61c0,8.291,6.709,15,15,15s15-6.709,15-15V15C256,6.709,249.291,0,241,0z"
                    />
                  </g>
                </g>
                <g>
                  <g>
                    <g>
                      <path
                        d="M238.555,307.542c0.014,0.02,0.031,0.037,0.045,0.057C238.057,306.783,238.067,306.801,238.555,307.542z"
                      />
                      <path
                        d="M238.555,307.542c-6.021-8.638-19.168-8.621-25.154,0.057l-65.7,99L118.001,367c-6-8.101-18.001-8.101-24.001,0L3,488     c-3.3,4.499-3.9,10.499-1.5,15.599C4.2,508.7,9.3,512,15,512h358.9C372.016,509.167,246.186,319.12,238.555,307.542z"
                      />
                    </g>
                  </g>
                </g>
                <g>
                  <g>
                    <path
                      d="M241,121c-66.167,0-120,53.833-120,120c0,35.473,15.564,67.69,40.913,89.934l26.499-39.924    c8.73-12.656,22.676-19.937,37.588-19.937c3.078,0,6.072,0.496,9.027,1.097l43.4-65.198c8.423-12.407,22.412-19.673,37.573-19.673    s29.15,7.266,37.412,19.453l3.763,5.649C344.26,160.067,297.263,121,241,121z"
                    />
                  </g>
                </g>
                <g>
                  <g>
                    <path
                      d="M509.277,488.598L328.599,223.599c-5.7-8.399-19.499-8.399-25.199,0l-42.653,64.085    c6.193,7.491,43.37,65.763,149.163,224.315h87.066c5.4,0,10.499-3.001,13.2-7.8C512.877,499.1,512.577,493.399,509.277,488.598z"
                    />
                  </g>
                </g>
                <g />
                <g />
                <g />
                <g />
                <g />
                <g />
                <g />
                <g />
                <g />
                <g />
                <g />
                <g />
                <g />
                <g />
                <g />
              </svg>
              {{item.difficultyLv.difficulty}}
            </div>
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
      ],
      cityList: [
        { id: 0, city: "城市" },
        { id: 1, city: "南投縣" },
        { id: 2, city: "苗栗縣" },
        { id: 3, city: "台中縣" },
        { id: 4, city: "高雄縣" },
        { id: 5, city: "花蓮縣" },
        { id: 6, city: "屏東縣" },
        { id: 7, city: "新竹縣" },
        { id: 8, city: "宜蘭縣" },
        { id: 9, city: "台東縣" },
      ],
      difficultyList: [
        { id: 0, difficulty: "百岳等級" },
        { id: 1, difficulty: "初級百岳" },
        { id: 2, difficulty: "中級百岳" },
        { id: 3, difficulty: "高級百岳" },
      ],
      mountains: [],
    };
  },
  methods: {
    findMostReachedMountains() {
      api
        .findMostReachedMountains()
        .then((res) => {
          this.mountains = res.data.data;
          this.setMountainData();
        })
        .catch((err) => {
          // console.log("findMostReachedMountains() err=", err);
        });
    },
    setMountainData() {
      for (let i = 0; i < this.mountains.length; i++) {
        this.mountains[i].cityName = this.cityList[this.mountains[i].city];
        this.mountains[i].difficultyLv = this.difficultyList[
          this.mountains[i].difficulty
        ];
      }
    },
  },
  mounted() {
    this.findMostReachedMountains();
  },
};
</script>

<style src="./PopularLocation.css" scoped>
</style>