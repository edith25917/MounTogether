<template>
  <div class="signinBlock">
    <form @submit.prevent="onSubmit">
      <h1>登入</h1>
      <!-- <div class="social-container">
        <a href="#" class="social">
          <i class="fab fa-google-plus-g fa-lg"></i>
        </a>
      </div>-->
      <span>使用email帳號登入</span>
      <input type="email" required="required" placeholder="信箱" v-model="email" />
      <input type="password" required="required" placeholder="密碼" v-model="password" />
      <button type="submit">登入</button>
      <span>
        還沒有帳號嗎?
        <b @click="switchPage">註冊</b>
      </span>
    </form>
  </div>
</template>


<script>
import crypto from "crypto";

export default {
  data() {
    return {
      showLogin: "",
      email: "",
      password: ""
    };
  },
  methods: {
    switchPage() {
      this.$router.push({ path: "/signup" });
    },
    hashPassword() {
      let hashedPwd = crypto
        .createHash("sha256")
        .update(this.password)
        .digest("hex");
      return hashedPwd;
    },
    onSubmit() {
      let hashedPwd = this.hashPassword();
      const formData = {
        username: this.email,
        password: hashedPwd
      };
      this.$store.dispatch("login", formData);
    }
  }
};
</script>
<style scoped>
* {
  box-sizing: border-box;
}

.signinBlock {
  background: url("../../assets/signin2.jpg") no-repeat center center / cover;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  font-family: "Montserr-at", sans-serif;
  height: 100vh;
  margin: 0px 0 50px;
  opacity: 0.8;
}

h1 {
  font-weight: bold;
  margin: 0;
  color: rgb(34, 34, 34);
}

h2 {
  text-align: center;
  color: rgb(34, 34, 34);
}

p {
  font-size: 14px;
  font-weight: 100;
  line-height: 20px;
  letter-spacing: 0.5px;
  margin: 20px 0 30px;
  color: rgb(34, 34, 34);
}

span {
  margin-top: 10px;
  font-size: 14px;
  font-weight: bold;
}

a {
  color: #333;
  font-size: 14px;
  text-decoration: none;
  margin: 15px 0;
}

button {
  width: 100%;
  border-radius: 5px;
  border: 1px solid #f9a428;
  background-color: #f9a428;
  color: #ffffff;
  font-size: 16px;
  font-weight: bold;
  padding: 12px 30px;
  margin: 10px;
  margin-top: 20px;
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
  color: rgb(34, 34, 34);
  background-color: #f5f5f580;
  border-radius: 10px;
  backdrop-filter: blur(5px);
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  padding: 0 50px;
  max-width: 500px;
  width: 90%;
  height: 500px;
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
  color: #fff;
  cursor: pointer;
  font-weight: bold;
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
</style>