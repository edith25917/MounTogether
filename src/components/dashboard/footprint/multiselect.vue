<template>
  <div class="block block-modal">
    <div class="wrap-modal">
      <p class="date">{{myEvents.event.date}}</p>
      <p class="groupname">{{myEvents.event.eventName}}</p>
      <div class="wrap-content">
        <form>
          <div class="form-group">
            <label :for="myEvents.event.eventId">1. 上傳攻頂照</label>
            <input
              type="file"
              class="form-control-file"
              :id="myEvents.event.eventId"
              @change="onFileSelected"
              accept=".jpg, .jpeg, .png"
            />
          </div>
        </form>
      </div>

      <div class="wrap-content">
        <label class="typo__label">2. 標記同團山友</label>
        <multiselect
          class="select"
          v-model="value"
          placeholder="標記好友"
          label="name"
          track-by="name"
          :options="options"
          :multiple="true"
          :taggable="true"
          @tag="addTag"
          :show-labels="false"
        ></multiselect>
      </div>
    </div>
    <div class="btncheck">
      <button class="btnverify" @click="apply(myEvents.event.eventId)">驗證</button>
    </div>
  </div>
</template>

<script>
import Multiselect from "vue-multiselect";
import api from "@/utils/api.js";
import FormData from "form-data";

export default {
  props: ["myEvents"],
  components: {
    Multiselect,
  },
  data() {
    return {
      value: this.myEvents.value,
      options: this.myEvents.members,
      selectedFile: null,
    };
  },
  watch: {
    myEvents(newval) {
      this.value = newval.value;
      this.options = newval.members;
    },
  },
  methods: {
    addTag(newTag) {
      //Tag好友
      const tag = {
        name: newTag,
        code: newTag.substring(0, 2) + Math.floor(Math.random() * 10000000),
      };
      this.options.push(tag);
      this.value.push(tag);
    },
    onFileSelected(event) {
      this.selectedFile = event.target.files[0];
    },

    apply(eventId) {
      //uploadphoto的data
      const fd = new FormData();
      if (!this.selectedFile) {
        alert("請選擇照片");

        return;
      }
      fd.append("file", this.selectedFile, this.selectedFile.name);
      fd.append("eventId", eventId);

      //apply的data
      let verifications = [];
      for (let i = 0; i < this.value.length; i++) {
        verifications.push({ verifier: this.value[i].member.userName });
      }
      let data = {
        event: {
          eventId: eventId,
        },
        verifications,
      };

      //呼叫api
      api
        .uploadVerificationPhoto(fd, this.$store.getters.idToken)
        .then((res) => {
          console.log(res);
          if (res.data.status != 200) {
            alert(res.data.msg);
            return;
          }
          this.$emit("apply", data);
        })
        .catch((err) => console.log(err));
    },
  },
};
</script>

<style src="vue-multiselect/dist/vue-multiselect.min.css"></style>

<style scoped>
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

.btnverify {
  border-radius: 10px;
  border: 1px solid #34d483;
  background-color: #34d483;
  color: #fff;
  font-size: 12px;
  font-weight: bold;
  padding: 3px 14px;
  margin: 0px 2px;
  letter-spacing: 1px;
  transition: transform 80ms ease-in;
}

.close {
  box-shadow: none;
}

form input {
  font-size: 12px;
  margin: 10px 0 0 10px;
}

.select {
  width: 100%;
  font-size: 12px;
  margin: 10px;
}

.wrap-modal {
  width: 70%;
}
.wrap-content {
  margin-left: 15px;
}

.date {
  font-size: 13px;
  letter-spacing: 2px;
  font-weight: 500;
  color: #868686;
  margin: 0;
}

.groupname {
  font-size: 18px;
  font-weight: bold;
  margin-top: 5px;
}

.btncheck {
  margin: 10px;
  text-align: right;
}
</style>