import Cookies from 'js-cookie'

const sysInfo = {
  state: {
    info: ''
  },
  mutations: {
    SET_INFO: (state, data) => {
      state.info = data
      Cookies.set('info', data)
    }
  },
  actions: {
    setInfo({ commit }, data) {
      commit('SET_INFO', data)
    }
  }
}

export default sysInfo
