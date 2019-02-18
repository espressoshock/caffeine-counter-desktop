import Vue from 'vue'
import Vuex from 'vuex'
import { strict } from 'assert'


Vue.use(Vuex)

const daily_caffeine_state = {
  portion: {
    dose: 95,
    unit: 'mg'
  },
  count: 0,
};

export default new Vuex.Store({
  strict: true,
  state: {
    daily_caffeine_state: daily_caffeine_state
  },
  getters: {
    dailyCoffeeCount: state => {
      return state.daily_caffeine_state.count;
    },
    getCaffeine: state => {
      return state.daily_caffeine_state.count * state.daily_caffeine_state.portion.dose;
    },
    getCaffeineUnit: state => {
      return state.daily_caffeine_state.portion.unit;
    }

  },
  mutations: {
    incrementCount: state => {
      state.daily_caffeine_state.count += 1;
    }
  },
  actions: {
    increment: context => {
      context.commit('incrementCount');
    }
  }
})
