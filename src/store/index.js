import Vue from 'vue'
import Vuex from 'vuex'
import api from "../utils/api.js"
import router from '../router/index.js'

Vue.use(Vuex)

//Vuex Store:Similar to the Vue Instance
//Vuex: 用來集中管理components的狀態
export default new Vuex.Store({
  //state如同Vue instance中的data
  state: {
    idToken: null,
    myUserName: null,
    userId: null,
    user: null,
    isEdited: '',
    name: '',
    aboutMySelf: '',
    folderName: '',
    friends: [],
    inPersonalPage: false,
    hasInvitation: null,
    currentTab: '',
  },
  //mutations用來Commit+track State changes
  //流程：action call mutation ，mutation updates state 
  mutations: {
    authUser(state, userData) {
      state.idToken = userData.token
      state.userId = userData.myUserName
      state.myUserName = userData.myUserName
    },
    storeUser(state, user) {
      state.user = user
    },
    clearAuthData(state) {
      state.idToken = null
      // state.userId = null
      state.myUserName = null
    },
    setUserId(state, id) {
      state.userId = id;
    },
    setFolderName(state, folderName) {
      state.folderName = folderName
    },
    setCurrentTab(state, tab) {
      state.currentTab = tab
    },
    setHasInvitation(state, hasInvitation) {
      state.hasInvitation = hasInvitation
    },
    setInPersonalPage(state, inPersonalPage) {
      state.inPersonalPage = inPersonalPage
    },
    setFriends(state, friends) {
      state.friends = friends
    },
    setAboutMySelf(state, about) {
      state.aboutMySelf = about
    },
    setName(state, name) {
      state.name = name
    },
    setIsEdited(state, isEdited) {
      state.isEdited = isEdited
    }
  },
  // state可以被actions中的方法改變(如同Vue中methods之於data)
  actions: {
    setLogoutTimer({ commit }, expirationTime) {
      setTimeout(() => {
        commit('clearAuthData')
      }, expirationTime)

    },
    signup({ commit }, authData) {
      api.register({
        userName: authData.userName,
        password: authData.password,
        name: authData.name
      })
        .then(res => {
          console.log(res)
          if (res.data.status == 200) {
            alert("註冊成功")
            router.replace('/signin');
          } else {
            alert("註冊失敗!" + res.data.msg)
          }
        })
        .catch(error => {
          console.log(error)
        });
    },
    login({ commit, dispatch, state }, authData) {
      api.login(authData.username, authData.password)
        .then(res => {
          if (res.data.status != 200) {
            alert(res.data.msg)
            return;
          }
          console.log(res)
          console.log(res.data.data.jwt)
          let payload = JSON.parse(atob(res.data.data.jwt.split('.')[1]))
          let myUserName = payload.sub
          let exp = payload.exp
          const now = new Date()
          const expirationDate = new Date(now.getTime() + exp) //exp/8000=4分鐘
          localStorage.setItem('token', res.data.data.jwt)
          localStorage.setItem('myUserName', myUserName)
          localStorage.setItem('expirationDate', expirationDate)
          commit('authUser', {
            token: res.data.data.jwt,
            myUserName: myUserName
          })

          dispatch('setLogoutTimer', exp)
          router.push("/")

        })
        .catch(error => console.log(error))
    },
    tryAutoLogin({ commit }) {
      const token = localStorage.getItem('token')
      if (!token) {
        return
      }
      // console.log("tryautologin token=" + token)
      const expirationDate = localStorage.getItem('expirationDate')
      const now = new Date()
      if (now >= expirationDate) {
        return
      }
      const myUserName = localStorage.getItem('myUserName')
      commit('authUser', {
        token: token,
        myUserName: myUserName
      })
    },
    logout({ commit }) {
      commit('clearAuthData')
      localStorage.removeItem('expirationDate')
      localStorage.removeItem('token')
      localStorage.removeItem('myUserName')
      localStorage.removeItem('userId')

      router.replace('/signin')
    },
    getInfo({ state }) {
      api.getInfo(state.userId)
        .then(res => {
          state.name = res.data.data.name;
          state.aboutMySelf = res.data.data.aboutMySelf;
        })
        .catch(err => {
          console.log(err);
        });
    },

  },
  // getters可以access state的資料(如同Vue中computed之於data)
  getters: {
    user(state) {
      return state.user
    },
    isAuthenticated(state) {
      return state.idToken !== null
    },
    userId(state) {
      return state.userId
    },
    myUserName(state) {
      return state.myUserName
    },
    idToken(state) {
      return state.idToken
    },
    folderName(state) {
      return state.folderName
    },
    currentTab(state) {
      return state.currentTab
    },
    hasInvitation(state) {
      return state.hasInvitation
    },
    inPersonalPage(state) {
      return state.inPersonalPage
    },
    friends(state) {
      return state.friends
    },
    aboutMySelf(state) {
      return state.aboutMySelf
    },
    name(state) {
      return state.name
    },
    isEdited(state) {
      return state.isEdited
    }


  }
})

