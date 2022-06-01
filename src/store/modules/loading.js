export default {
  namespaced: true,
  state: {
    load: false
  },
  getters: {
    load: state => state.load
  },
  mutations: {
    setLoad (state, bool) {
      state.load = bool
    }
  }
}
