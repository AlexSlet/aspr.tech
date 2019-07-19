import Vue from 'vue'
import Router from 'vue-router'
import Home from './components/pages/Home.vue'
import Switchboard from './components/pages/switchboard/Switchboard.vue'
import VRU from './components/pages/vru/VRU.vue'
import FlatBoard from './components/pages/flatBoard/FlatBoard.vue'
import MyBoard from './components/pages/MyBoard.vue'
import Opportunities from './components/pages/Opportunities.vue'
import Help from './components/pages/Help.vue'
import Login from './components/pages/Login.vue'
import SignIn from './components/pages/SignIn.vue'
import Builder from './components/pages/builder/builder.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/switchboard',
      name: 'switchboard',
      component: Switchboard
    },
    {
      path: '/vru',
      name: 'vru',
      component: VRU
    },
    {
      path: '/flatboard',
      name: 'flatboard',
      component: FlatBoard
    },
    {
      path: '/myboard',
      name: 'myboard',
      component: MyBoard
    },
    {
      path: '/opportunities',
      name: 'opportunities',
      component: Opportunities
    },
    {
      path: '/help',
      name: 'help',
      component: Help
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '/signin',
      name: 'signin',
      component: SignIn
    },
    {
      path: '/builder',
      name: 'builder',
      component: Builder
    },
  ]
})
