import api from '../api'

export default {
  install (app, { axios }) {
    app.config.globalProperties.$api = api(axios)
  }
}
