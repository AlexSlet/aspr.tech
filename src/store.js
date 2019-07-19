import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import VueAxios from 'vue-axios'

Vue.use(VueAxios, axios)

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    current: [
    ],
    sizes: {
    },
    user: {
    },
    forEdit: {},
    
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
