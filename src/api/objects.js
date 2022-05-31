export default (axios) => ({
  stands (body) {
    return axios.post('/api/userside/map/nodes', body)
  },
  volses () {
    return axios.get('/api/userside/map/fibers')
  }
})
