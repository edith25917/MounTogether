<template>
  <div class="body">
    <div class="back" @click="back">
      <i class="fa fa-arrow-left" aria-hidden="true"></i>回上一頁
    </div>
    <div class="wrapper">
      <div class="form">
        <div class="inputfield">
          <label>名稱</label>
          <input type="text" class="input" v-model="name" />
        </div>

        <div class="inputfield">
          <label>帳號</label>
          <p>{{account}}</p>
        </div>
        <div class="inputfield">
          <label>密碼</label>
          <button data-toggle="modal" data-target="#exampleModal">變更密碼</button>
        </div>

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
              <div class="modal-body">
                <div class="inputfield">
                  <label class="label-pwd">請輸入舊密碼</label>
                  <input type="password" class="input pwd" v-model="password" required />
                </div>
                <div class="inputfield">
                  <label class="label-pwd">請輸入新密碼</label>
                  <input type="password" class="input pwd" v-model="newPassword" required />
                </div>
              </div>
              <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-dismiss="modal">取消</button>
                <button
                  type="button"
                  class="btn btn-primary"
                  data-dismiss="modal"
                  @click="changePassword()"
                >修改密碼</button>
              </div>
            </div>
          </div>
        </div>

        <div class="inputfield">
          <label>關於我</label>
          <textarea class="textarea" v-model="aboutMySelf"></textarea>
        </div>
        <div class="inputfield">
          <button class="btnupdate" @click="update()">儲存</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import api from "../../utils/api.js";
import crypto from "crypto";

export default {
  data() {
    return {
      account: this.$store.getters.myUserName,
      name: this.$store.getters.name,
      aboutMySelf: this.$store.getters.aboutMySelf,
      password: "",
      newPassword: "",
    };
  },
  methods: {
    back() {
      history.back();
    },
    update() {
      api
        .updateUser(
          {
            name: this.name,
            aboutMySelf: this.aboutMySelf,
          },
          this.$store.getters.idToken
        )
        .then((res) => {
          this.$router.push("/dashboard/" + this.$store.getters.myUserName);
        })
        .catch((err) => {
          // console.log(err);
        });
    },
    hashPassword(pwd) {
      let hashedPwd = crypto.createHash("sha256").update(pwd).digest("hex");
      return hashedPwd;
    },
    changePassword() {
      let password = this.hashPassword(this.password);
      let newPassword = this.hashPassword(this.newPassword);

      api
        .updatePassword(password, newPassword, this.$store.getters.idToken)
        .then((res) => {
          alert(res.data.msg);
        })
        .catch((err) => {
          // console.log(err);
        });
    },
    getInfo() {
      api
        .getInfo(this.$store.getters.myUserName)
        .then((res) => {
          this.name = res.data.data.name;
          this.aboutMySelf = res.data.data.aboutMySelf;
        })
        .catch((err) => {
          // console.log(err);
        });
    },
  },
  mounted() {
    this.getInfo();
    this.$store.commit("setInPersonalPage", true);
  },
  beforeDestroy() {
    this.$store.commit("setInPersonalPage", false);
  },
};
</script>

<style scoped>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

.back {
  cursor: pointer;
}

.fa {
  font-size: 16px;
}
.fa.fa-arrow-left {
  background-color: #e9e9e9;
  padding: 14px;
  border-radius: 50px;
  color: #333;
  margin-top: 20px;
  margin-right: 10px;
  cursor: pointer;
}

.wrapper {
  width: 80%;
  margin: 50px;
  position: relative;
}

.wrapper .form {
  width: 100%;
}

.wrapper .form .inputfield {
  margin-bottom: 25px;
  font-weight: bold;
  display: flex;
}

.modal-dialog {
  margin: auto;
}

.wrapper .form .inputfield label {
  width: 180px;
  color: #757575;
  font-size: 14px;
}

.wrapper .form .inputfield .input,
.wrapper .form .inputfield .textarea {
  width: 300px;
  outline: none;
  border: 1px solid #d5dbd9;
  font-size: 15px;
  padding: 8px 10px;
  border-radius: 3px;
  transition: all 0.3s ease;
}

.wrapper .form .inputfield .textarea {
  width: 400px;
  height: 125px;
  resize: none;
}

.wrapper .form .inputfield .input:focus,
.wrapper .form .inputfield .textarea:focus,
select:focus {
  border: 1px solid #f9a428;
}

.wrapper .form .inputfield p {
  font-size: 14px;
  color: #757575;
}

.label-pwd {
  width: 30px;
}

button {
  background-color: #f7f7f7;
  border-radius: 5px;
  color: #3d454d;
  font-size: 14px;
  font-weight: bold;
  padding: 6px 20px;
  border: 1px solid #f7f7f7;
  transition: transform 80ms ease-in;
  box-shadow: 1px 1px 5px rgb(216, 215, 215);
}

button:active {
  transform: scale(0.95);
}

button:focus {
  outline: none;
}

.btnupdate {
  border: 1px solid #f9a428;
  background: #f9a428;
  color: #fff;
  position: absolute;
  right: 0;
}

.btnupdate :hover {
  background: #ffd658;
}

.wrapper .form .inputfield:last-child {
  margin-bottom: 0;
}

@media (max-width: 420px) {
  .wrapper .form .inputfield {
    flex-direction: column;
    align-items: flex-start;
  }
  .wrapper .form .inputfield label {
    margin-bottom: 5px;
    width: 70%px;
  }

  .wrapper .form .inputfield .input,
  .wrapper .form .inputfield .textarea {
    width: 80%;
  }
}
</style>