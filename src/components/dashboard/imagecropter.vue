<template>
  <div class="cropter">
    <div class="d-flex justify-content-center my-5">
      <label class="btn btn-info">
        <input
          type="file"
          accept="image/jpeg, image/png, image/jpg"
          @change="handleChange"
          style="display:none;"
          ref="imageInput"
        />
        <i class="fa fa-photo"></i>選擇圖片
      </label>
    </div>

    <div class="d-flex justify-content-center">
      <canvas ref="canvas" :width="canvasWidth" :height="canvasHeight"></canvas>
    </div>

    <img src="#" ref="uploadImage" @load="imageLoad" style="display:none;" />
  </div>
</template>

<script>
import { fabric } from "fabric";

export default {
  props: {
    imageWidth: {
      type: Number,
      default: 400
    },
    imageHeight: {
      type: Number,
      default: 300
    },
    filename: {
      type: String,
      default: "upload_image.png"
    }
  },
  data() {
    return {
      reader: new FileReader(),
      canvas: null,
      overlayGroup: null,
      image: null,
      canvasWidth: 0,
      canvasHeight: 0,
      overlayImages: {
        top: null,
        right: null,
        bottom: null,
        left: null
      },
      overlayFill: "rgb(100,100,100,0.8)"
    };
  },
  computed: {
    crop() {
      let top = 0;
      let left = 0;
      let width = 0;
      let height = 0;
      let scale = 1;
      const scaleX = (this.canvasWidth - 30) / this.imageWidth;
      const scaleY = (this.canvasHeight - 30) / this.imageHeight;
      const scaleArray = [scaleX, scaleY].filter(s => s < 1);
      if (scaleArray.length > 0) {
        scale = Math.min(...scaleArray);
      }

      width = this.imageWidth * scale;
      height = this.imageHeight * scale;
      top = (this.canvasHeight - height) / 2;
      left = (this.canvasWidth - width) / 2;
      return { top, left, width, height, scale };
    }
  },
  methods: {
    handleChange() {
      this.readUrl();
    },
    readUrl() {
      const input = this.$refs.imageInput;
      if (input.files && input.files[0]) {
        this.reader.readAsDataURL(input.files[0]);
      }
    },
    handleFileReader(e) {
      this.$refs.uploadImage.setAttribute("src", e.target.result);
    },
    imageLoad() {
      this.drawer = true;
      const imgEl = this.$refs.uploadImage;
      this.image = new fabric.Image(imgEl, {
        top: 0,
        left: 0,
        selectable: true
      });
      this.image.setControlsVisibility({
        bl: true, //左下
        br: true, //右下
        mb: false, //中下
        ml: false, //中左
        mr: false, //中右
        mt: false, //中上
        tl: true, //左上
        tr: true, //右上
        mtr: true //旋轉控制鍵
      });
      if (this.image.width < this.image.height) {
        this.image.scaleToWidth(this.canvasWidth);
      } else {
        this.image.scaleToHeight(this.canvasHeight);
      }
      this.scale = this.image.scaleX;
      this.canvas.add(this.image);
    },
    createCanvas() {
      this.canvas = new fabric.Canvas(this.$refs.canvas);
      this.canvas.setWidth(this.canvasWidth);
      this.canvas.setHeight(this.canvasHeight);
    },
    createOverlayImage() {
      const clipSizeX = this.crop.left;
      const clipSizeY = this.crop.top;
      this.overlayImages.top = new fabric.Rect({
        top: 0,
        left: 0,
        width: this.canvasWidth,
        height: this.crop.top,
        selectable: false,
        fill: this.overlayFill
      });
      this.overlayImages.right = new fabric.Rect({
        top: this.crop.top,
        left: this.crop.left + this.crop.width,
        width: this.crop.left,
        height: this.imageHeight,
        selectable: false,
        fill: this.overlayFill
      });
      this.overlayImages.bottom = new fabric.Rect({
        top: this.crop.top + this.crop.height,
        left: 0,
        width: this.canvasWidth,
        height: this.crop.top,
        selectable: false,
        fill: this.overlayFill
      });
      this.overlayImages.left = new fabric.Rect({
        top: this.crop.top,
        left: 0,
        width: this.crop.left,
        height: this.crop.height,
        selectable: false,
        fill: this.overlayFill
      });
      object
        .values(this.overlayImages)
        .forEach(image => (image.hasBorders = false));
      this.overlayGroup = new fabric.Group(Object.values(this.overlayImages));
      this.overlayGroup.hasControls = false;
      this.overlayGroup.selectable = false;
      this.canvasWidth.add(this.overlayGroup);
      this.canvas.setOverlayImage(this.overlayGroup);
    },
    cropImageFile() {
      const scale = this.image.scaleX / this.crop.scale;
      this.image.scale(scale);
      this.image.set({
        top: 0,
        left: 0,
        cropX:
          (this.crop.left / this.crop.scale -
            this.image.left / this.crop.scale) /
          scale,
        cropY:
          (this.crop.top / this.crop.scale - this.image.top / this.crop.scale) /
          scale,
        width: this.imageWidth / scale,
        height: this.imageHeight / scale
      });
      return this.dataURLtoFile(This.image.toDataURL(), this.filename);
    },
    dataURLtoFile(dataurl, filename) {
      let arr = dataurl.split(","),
        mime = arr[0].match(/:(.*?);/)[1],
        bstr = atob(arr[1]),
        n = bstr.length,
        u8arr = new Uint8Array(n);
      while (n--) {
        u8arr[n] = bstr.charCodeAt(n);
      }
      return new File([u8arr], filename, { type: mime });
    }
  },
  created() {
    this.canvasWidth = window.innerWidth - 30;
    this.canvasHeight = window.innerHeight - 300;
  },
  mounted() {
    this.createCanvas();
    this.reader.onload = this.handleFileReader;
  }
};
</script>

<style scoped>
.d-flex {
  background: gold;
}
</style>