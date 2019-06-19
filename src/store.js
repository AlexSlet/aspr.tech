import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import VueAxios from 'vue-axios'

Vue.use(VueAxios, axios)

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    current: [
      10,
      16,
      20,
      25,
      32,
      40,
      50,
      63,
      80,
      100,
      125,
      160,
      200,
      250,
      320,
      400,
      500,
      630,
      800,
      1000,
      1250,
      1600,
      2000,
      2500,
      3200,
      4000,
      5000,
      6300
    ],
    sizes: {
      '3': [
        { name: "1800x450x450" },
        { name: "1800x600x450" },
        { name: "1800x600x600" },
        { name: "1800x800x450" },
        { name: "1800x800x600" },
        { name: "2000x450x450" },
        { name: "2000x600x450" },
        { name: "2000x600x600" },
        { name: "2000x800x450" },
        { name: "2000x800x600" },
      ],
      '51': [
        { name: "1800x400x400" },
        { name: "1800x400x600" },
        { name: "1800x400x800" },
        { name: "1800x600x400" },
        { name: "1800x600x600" },
        { name: "1800x600x800" },
        { name: "1800x600x1000" },
        { name: "1800x800x400" },
        { name: "1800x800x600" },
        { name: "1800x800x800" },
        { name: "1800x800x1000" },
        { name: "2000x400x400" },
        { name: "2000x400x600" },
        { name: "2000x400x800" },
        { name: "2000x600x400" },
        { name: "2000x600x600" },
        { name: "2000x600x800" },
        { name: "2000x600x1000" },
        { name: "2000x800x400" },
        { name: "2000x800x600" },
        { name: "2000x800x800" },
        { name: "2000x800x1000" },
      ],
      '52': [
        { name: "2000x300x600" },
        { name: "2000x600x600" },
        { name: "2000x800x600" },
        { name: "2000x1000x600" },
        { name: "2000x1200x600" },
      ],
      '53': [
        { name: "1800x600x450" },
        { name: "1800x800x450" },
        { name: "2000x600x450" },
        { name: "2000x800x450" },
      ]
    },
    user: {
    },
    forEdit: {}
  },
  mutations: {
    setMnf(state, payload) {
      state.data.insw.incb.incb_mnf = payload;
      state.data.list_outcb.map(item => {
        item.outcb_mnf = payload;
      })
    },
    setUser(state, payload) {
      state.user = { ...payload };
      Vue.prototype.axios.defaults.headers.common["Authorization"] = `Bearer_${
        payload.token
        }`;
    },
    clearUser(state) {
      state.user = {};
      sessionStorage.removeItem('user');
    },
    setEdited(state, payload) {
      state.forEdit = { ...payload }
    },
    clearEdited(state) {
      state.forEdit = {}
    }
  },
  actions: {
  },
  getters: {
    getSizes: state => id => {
      return state.sizes[id];
    },
    getCurrent: state => {
      return state.current;
    },
    getIsUser: state => {
      return Object.keys(state.user).length > 0;
    },
    getUser: state => {
      return state.user;
    },
    getForEdit: state => {
      return state.forEdit;
    }
  }

});
