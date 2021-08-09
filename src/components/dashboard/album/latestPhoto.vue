<template>
  <div class="body">
    <div class="noData" v-if="!images.length">
      <div>目前還沒有相片喔!</div>
    </div>
    <photoGallery v-if="images.length" v-bind:images="images"></photoGallery>
  </div>
</template>


<script>
import api from "@/utils/api.js";
import photoGallery from "./photoGallery";

export default {
  data() {
    return {
      images: [
        // "https://picsum.photos/1080/800?random=1",
        // "https://picsum.photos/1800/800?random=29",
        // "https://picsum.photos/1080/800?random=1",
        // "https://picsum.photos/1800/800?random=29",
        // "https://picsum.photos/500/800?random=27",
        // "https://picsum.photos/1080/760?random=26",
        // "https://picsum.photos/1080/800?random=2",
        // "https://picsum.photos/1800/800?random=3",
        // "https://picsum.photos/1080/800?random=4",
        // "https://picsum.photos/1080/800?random=5",
        // "https://picsum.photos/1080/800?random=6",
        // "https://picsum.photos/600/800?random=79",
        // "https://picsum.photos/380/700?random=8",
        // "https://picsum.photos/500/800?random=9",
        // "https://picsum.photos/1080/760?random=10",
        // "https://picsum.photos/1080/800?random=11",
        // "https://picsum.photos/1080/800?random=12",
        // "https://picsum.photos/1080/800?random=13",
        // "https://picsum.photos/600/800?random=79",
        // "https://picsum.photos/380/700?random=8",
        // "https://picsum.photos/500/800?random=9",
        // "https://picsum.photos/1080/800?random=17",
        // "https://picsum.photos/1080/800?random=18",
        // "https://picsum.photos/1080/800?random=19",
        // "https://picsum.photos/1080/800?random=20",
        // "https://picsum.photos/1080/800?random=21",
        // "https://picsum.photos/1080/800?random=22",
        // "https://picsum.photos/1080/800?random=23",
        // "https://picsum.photos/1080/800?random=24",
        // "https://picsum.photos/1080/800?random=23",
        // "https://picsum.photos/1080/800?random=23",
        // "https://picsum.photos/1080/800?random=24",
        // "https://picsum.photos/1080/800?random=23",
        // "https://picsum.photos/1080/800?random=24",
        // "https://picsum.photos/1080/800?random=23",
        // "https://picsum.photos/1080/800?random=24",
        // "https://picsum.photos/1080/800?random=23",
        // "https://picsum.photos/1080/800?random=24",
        // "https://picsum.photos/1080/800?random=23",
      ],
    };
  },
  components: {
    photoGallery,
  },
  methods: {
    getAllPhoto() {
      api
        .getAllPhoto(this.$store.getters.userId)
        .then((res) => {
          if (!res.data.data) {
            return;
          }
          this.images = res.data.data;
        })
        .catch((err) => {
          // console.log(err);
        });
    },
  },
  mounted() {
    this.getAllPhoto();
  },
  created() {
    this.$store.commit("setUserId", this.$route.params.userId);
  },
};
</script>


<style scoped>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

.noData {
  margin: 20px 0;
  width: 100%;
  border: 1px solid #e9e9e9;
  border-radius: 10px;
}

.noData > div {
  line-height: 500px;
  text-align: center;
  color: rgb(184, 184, 184);
  font-weight: bold;
  font-size: 20px;
}

/* @media screen and (max-width: 960px) {
  .gallery-section {
    grid-template-columns: repeat(2, 1fr);
  }
} */
/*
@media screen and (max-width: 768px) {
  .gallery-section .image {
    flex: 50%;
  }
}

@media screen and (max-width: 480px) {
  .gallery-section .image {
    flex: 100%;
  }
} */
</style>