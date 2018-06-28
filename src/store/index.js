import Vue from 'vue'
import Vuex from 'vuex'
import app from './modules/app'
import sysInfo from './modules/sysInfo'
import errorLog from './modules/errorLog'
import tagsView from './modules/tagsView'
import getters from './getters'

Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    app,
    errorLog,
    sysInfo,
    tagsView
  },
  getters
})

export default store
