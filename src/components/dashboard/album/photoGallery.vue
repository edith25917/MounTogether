<template>
  <div class="body" style="margin-top:40px;">
    <div class="gallery-section">
      <div :class="layoutClass" v-bind:key="index" v-for="(image,index) in images">
        <!-- {{changeLayout(index,images)}} -->
        <img class="fitImg" :src="image" @click="show(index)" />
      </div>
    </div>
    <div class="lightbox" v-if="visible">
      <div class="prev" @click="prev" v-show="hasPrevious">
        <i class="fa fa-arrow-circle-left" aria-hidden="true"></i>
      </div>

      <div class="photo">
        <img class="originalImg" :src="url" />
      </div>

      <div class="next" @click="next" v-show="hasNext">
        <i class="fa fa-arrow-circle-right" aria-hidden="true"></i>
      </div>

      <div class="close" @click="hide">
        <i class="fa fa-times" aria-hidden="true"></i>
      </div>
    </div>
  </div>
</template>


<script>
import api from "@/utils/api.js";

export default {
  props: ["images"],
  data() {
    return {
      //images: [
      //     // "https://picsum.photos/1080/800?random=1",
      //     // "https://picsum.photos/1800/800?random=29",
      //     // "https://picsum.photos/1080/800?random=1",
      //     // "https://picsum.photos/1800/800?random=29",
      //     // "https://picsum.photos/500/800?random=27",
      //     // "https://picsum.photos/1080/760?random=26",
      //     // "https://picsum.photos/1080/800?random=2",
      //     // "https://picsum.photos/1800/800?random=3",
      //     // "https://picsum.photos/1080/800?random=4",
      //     // "https://picsum.photos/1080/800?random=5",
      //     // "https://picsum.photos/1080/800?random=6",
      //     // "https://picsum.photos/600/800?random=79",
      //     // "https://picsum.photos/380/700?random=8",
      //     // "https://picsum.photos/500/800?random=9",
      //     // "https://picsum.photos/1080/760?random=10",
      //     // "https://picsum.photos/1080/800?random=11",
      //     // "https://picsum.photos/1080/800?random=12",
      //     // "https://picsum.photos/1080/800?random=13",
      //     // "https://picsum.photos/600/800?random=79",
      //     // "https://picsum.photos/380/700?random=8",
      //     // "https://picsum.photos/500/800?random=9",
      //     // "https://picsum.photos/1080/800?random=17",
      //     // "https://picsum.photos/1080/800?random=18",
      //     // "https://picsum.photos/1080/800?random=19",
      //     // "https://picsum.photos/1080/800?random=20",
      //     // "https://picsum.photos/1080/800?random=21",
      //     // "https://picsum.photos/1080/800?random=22",
      //     // "https://picsum.photos/1080/800?random=23",
      //     // "https://picsum.photos/1080/800?random=24",
      //     // "https://picsum.photos/1080/800?random=23",
      //     // "https://picsum.photos/1080/800?random=23",
      //     // "https://picsum.photos/1080/800?random=24",
      //     // "https://picsum.photos/1080/800?random=23",
      //     // "https://picsum.photos/1080/800?random=24",
      //     // "https://picsum.photos/1080/800?random=23",
      //     // "https://picsum.photos/1080/800?random=24",
      //     // "https://picsum.photos/1080/800?random=23",
      //     // "https://picsum.photos/1080/800?random=24",
      //     // "https://picsum.photos/1080/800?random=23"
      //],
      layoutClass: "gallery-item",
      visible: false,
      url: "https://picsum.photos/1080/800?random=1",
      index: "",
    };
  },
  methods: {
    changeLayout(imageIndex, images) {
      if (imageIndex + 4 >= images.length) {
        this.layoutClass = "gallery-item";
        return;
      }
      let index = (imageIndex + 2) % 20;
      if (index == 16) {
        this.layoutClass = "gallery-item medium";
      } else if (index == 8) {
        this.layoutClass = "gallery-item large";
      } else {
        this.layoutClass = "gallery-item";
      }
    },
    show(index) {
      this.visible = true;
      this.index = index;
      this.url = this.images[this.index];
    },
    hide() {
      this.visible = false;
    },
    hasNext() {
      return this.index + 1 < this.images.length;
    },
    hasPrevious() {
      return this.index - 1 >= 0;
    },
    prev() {
      if (this.hasPrevious()) {
        this.url = this.images[--this.index];
      }
    },
    next() {
      if (this.hasNext()) {
        this.url = this.images[++this.index];
      }
    },
    onKeydown(e) {
      if (this.visible) {
        switch (e.key) {
          case "ArrowRight":
            this.next();
            break;
          case "ArrowLeft":
            this.prev();
            break;
          case "ArrowDown":
          case "ArrowUp":
          case " ":
            e.preventDefault();
            break;
          case "Escape":
            this.hide();
            break;
        }
      }
    },
  },
  mounted() {
    window.addEventListener("keydown", this.onKeydown);
  },
  destroyed() {
    window.removeEventListener("keydown", this.onKeydown);
  },
};
</script>


<style scoped>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

.body {
  width: 90%;
  /* margin: 0 30px; */
}

.fitImg {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: all 0.8s cubic-bezier(0.175, 0.885, 0, 1);
}

.originalImg {
  align-self: center;
  max-width: 100%;
  max-height: 100%;
}

img:hover {
  cursor: pointer;
  transform: scale(1.1, 1.1);
}

.gallery-section {
  display: grid;
  height: 100%;
  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: repeat(1, 1fr);
  grid-gap: 40px;
  margin-left: 20px;
  margin-bottom: 40px;
}

.gallery-item {
  height: 200px;
}

.gallery-item.large {
  height: auto;
  grid-row: span 2;
  grid-column: span 2;
}

.gallery-item.medium {
  height: auto;
  grid-row: span 2;
  grid-column: span 1;
}

.lightbox {
  height: 80%;
  background: rgba(0, 0, 0, 0.8);
  width: 70%;
  position: fixed;
  top: 0;
  bottom: 0;
  margin: auto;
  left: 0;
  right: 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.fa {
  font-size: 30px;
  color: lightgray;
  cursor: pointer;
  margin: 0 20px;
  transition: all 0.8s cubic-bezier(0.175, 0.885, 0, 1);
}

.fa:active {
  transform: scale(1.2, 1.2);
}

.close {
  position: absolute;
  padding: 6px 10px;
  top: 0;
  right: 0;
  transition: all 0.8s cubic-bezier(0.175, 0.885, 0, 1);
}

.close:active {
  transform: scale(1.1, 1.1);
}

.photo {
  height: 100%;
  max-width: 70%;
  display: flex;
  align-items: center;
}

.photo > img {
  transform: none;
  max-height: 100%;
}

@media screen and (max-width: 780px) {
  .gallery-section {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media screen and (max-width: 480px) {
  .gallery-section {
    grid-template-columns: repeat(1, 1fr);
  }
  .gallery-item {
    height: 250px;
  }
}
</style>