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
    tabName: {
      insw: 'Вводные устройства',
      outsw: 'Отходящие автоматы',
      ecs: 'Корпус'
    },
    eqName: {
      "1": 'Авт. выключатель',
      "2": 'УЗО',
      "3": 'Диф. автомат',
      "4": 'Счет. электроэнергии',
      "5": 'Корпус шкафа',
      "6": "Рубильники для ВРУ",
      "7": "Амперметр для ВРУ",
      "8": "Вольтметр для ВРУ",
      "9": "Плавкая вставка",
      "10": "Корпус шкафа",
      "11": "Тип АВР",
    },
  },
  mutations: {
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
    setEdited(state, board) {
      state.forEdit = { ...board };
    },
    clearEdited(state) {
      state.forEdit = {}
    }
  },
  getters: {
    getIsUser: state => {
      return Object.keys(state.user).length > 0;
    },
    getUser: state => {
      return state.user;
    },
    getTabName: state => {
      return state.tabName;
    },
    getEqName: state => {
      return state.eqName;
    },
    getManufc: state => {
      return state.manufacturer;
    },
    getEcs: state => {
      return state.ecs;
    },
    getForEdit: state => {
      return state.forEdit;
    },
    getCounterType: state => {
      return state.counterType;
    }
  }

});
