import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '../store/index.js'

import Home from '../views/Home.vue'
//dashboard
import DashboardPage from '../views/Dashboard.vue'
import SignupPage from '../components/auth/signup.vue'
import SigninPage from '../components/auth/signin.vue'
import Footprint from '../components/dashboard/footprint/footprint.vue'
import Activity from '../components/dashboard/activity/activity.vue'
import Friends from '../components/dashboard/friends/friends.vue'
import Album from '../components/dashboard/album/album.vue'
import LatestPhoto from '../components/dashboard/album/latestPhoto.vue'
import MyAlbums from '../components/dashboard/album/myAlbums.vue'
import Create from '../components/dashboard/album/create.vue'
import SingleAlbum from '../components/dashboard/album/singleAlbum.vue'
import UserEdit from '../components/dashboard/userEdit.vue'
//活動
import OpenGroup from '../components/groups/OpenGroup.vue'
import SingleGroup from '../components/groups/SingleGroup.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/', component: Home
  },
  { path: '/signup', component: SignupPage },
  { path: '/signin', component: SigninPage },
  {
    path: '/dashboard/:userId', component: DashboardPage,
    children: [
      { path: '', component: Footprint, },
      {
        path: 'activity', component: Activity,
        beforeEnter: (to, from, next) => {
          store.dispatch("tryAutoLogin");
          store.state.idToken ? next() : next('')
        },
      },
      {
        path: 'album', component: Album,

        children: [
          { path: 'latestPhoto', component: LatestPhoto },
          { path: 'myAlbums', component: MyAlbums },
          {
            path: 'create', component: Create,
          },
          {
            path: ':folderName', component: SingleAlbum,
          }
        ]
      },
      { path: 'edit', component: UserEdit },
      { path: 'friends', component: Friends }
    ]
  },
  {
    path: '/groups/openGroup', component: OpenGroup,
    beforeEnter: (to, from, next) => {
      store.dispatch("tryAutoLogin");
      store.state.idToken ? next() : next('/signin')
    }
  },
  { path: '/groups/singleGroup/:eventId/:mountainId', component: SingleGroup },
  { path: '/redirect-me', redirect: { name: 'home' } },
  { path: '*', redirect: '/' }
];



const router = new VueRouter({
  routes,
  // mode: 'history',
})

export default router
