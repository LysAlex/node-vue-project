import api from './config'

export default {
  verifyUser: () => {
    return api.get('http://localhost:3000/checkToken')
  }
}