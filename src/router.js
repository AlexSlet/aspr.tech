import Vue from 'vue'
import Router from 'vue-router'
import Home from './components/Home.vue'
import Switchboard from './components/Switchboard.vue'
import MyBoard from './components/MyBoard.vue'
import Opportunities from './components/Opportunities.vue'
import Help from './components/Help.vue'
import Login from './components/Login.vue'

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
  ]
})
