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
      outsw: 'Отходящие автоматы'
    },
    eqName: {
      pmeter: 'Счет. электроэнергии',
      ecs: 'Корпус шкафа',
      cb: 'Авт. выключатель',
      uzo: 'УЗО',
      difcb: 'Диф. автомат'
    },
    manufacturer: {
      '3': "IEK",
      '6': "ABB",
      '82': "Инкотекс (Меркурий)",
      '84': "Ленэлектро",
      '85': "ЛЭМЗ"
    },
    ecs: ['Щит  мет. ЩМП-250х300х140 EKF (ЩМП-02) IP31', 'Щит мет. ЩРУВ 12 мод. с окном IP31 (440Х340Х140) EKF', 'Щит мет. ЩМП-400Х400Х150 EKF(ЩМП-05) IP31', 'Бокс ЩРН-П-6 на 6 модулей навесной пластиковый с прозрачной дверкой IP40 IEK', 'Бокс ЩРН-П-8 на 8 модулей навесной пластиковый с прозрачной дверкой IP40 IEK', 'Бокс ЩРН-П-12 на 12 модулей навесной пластиковый с прозрачной дверкой IP40 IEK']
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
    }
  }

});
