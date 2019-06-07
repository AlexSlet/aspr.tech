import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import VueAxios from 'vue-axios'

Vue.use(VueAxios, axios)

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
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
    data: {
      insw: {},
      list_outcb: [],
      comecs: {}
    },
    results: {
      price: '',
      link: '',
      id: '',
      alarms: []
    },
    user: {
      token: '',
      login: ''
    }
  },
  mutations: {
    setData(state, payload) {
      Vue.set(state.data, payload.name, payload.data);
    },
    setMnf(state, payload){
      state.data.insw.incb.incb_mnf = payload;
      state.data.list_outcb.map(item => {
        item.outcb_mnf = payload;
      })
    },
    setResults(state, payload){
      state.results = {
        price: payload.price,
        link: payload.link_specification,
        id: payload.id_order,
        alarms: payload.alarms
      }
    },
    setUser(state, payload){
      state.user = {...payload};
      Vue.prototype.axios.defaults.headers.common["Authorization"] = `Bearer_${
        payload.token
        }`;
    },
    clearUser(state){
      state.user.login = '';
      state.user.token = '';
    }
  },
  actions: {
    sendData({ state, commit }) {
      let params = new URLSearchParams();
      params.append('data', JSON.stringify(state.data));
      return axios.post('http://188.227.120.13:8080/jsonexchange', params, {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      }).then(res => {
        commit('setResults', res.data);
      })
    },
    sendDataChanged({commit, dispatch}, payload){
      commit('setMnf', payload);
      return dispatch('sendData');
    },
  },
  getters: {
    getSizes: state => id => {
      return state.sizes[id];
    },
    getInsw: state => {
      return state.data.insw;
    },
    getListOut: state => {
      return state.data.list_outcb;
    },
    getEcs: state => {
      return state.data.comecs;
    },
    getResults: state => {
      return state.results;
    },
    getIsUser: state => {
      return state.user.token.length > 0;
    },
    getUser: state => {
      return state.user;
    }
  }

});
