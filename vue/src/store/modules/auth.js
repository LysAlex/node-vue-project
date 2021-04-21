import api from '@/api/config'
import jwt_decode from "jwt-decode"

const userToken = localStorage.getItem('token') || ''
const decodeToken = userToken ? jwt_decode(userToken) : ''
const state = userToken && decodeToken ? {
  isAuth: true,
  user: decodeToken.email,
  role: decodeToken.role,
  authToken: userToken
} : {
  isAuth: false,
  user: '',
  role: 'visitor',
  authToken: ''
}

const getters = {
  getIsAuth: state => state.isAuth,
  getUser: state => state.user,
  getAuthToken: state => state.authToken
}

const mutations = {
  login(state, data) {
    localStorage.setItem('token', data.data.token)
    state.isAuth = true
    state.role = data.data.role
    state.user = data.data.email
    state.authToken = data.data.token
  },
  register(state, data) {
    console.log(data)
  },
  logout(state) {
    state.isAuth = false
    state.user = ''
    state.authToken = ''
    state.role = 'visitor'
  }
}

const actions = {
  async fetchLogin({ commit }, { email, password, router }) {
    const { data } = await api.post('http://localhost:3000/login', { email: email, password: password })
    commit('login', data)
    router.push({ name: 'home' })
  },
  async fetchRegister({ commit }, { email, password, router }) {
    const { data } = await api.post('http://localhost:3000/register', { email: email, password: password, role: 'user', artistLiked: [] })
    commit('register', data)
    router.push({ name: 'auth.login' })
  },
  logout({ commit }, { router }) {
    commit('logout')
    localStorage.removeItem("token")
    if (router.history.current.name !== 'home'){
      router.push({ name: "home" })
    }
  },
  reset({ commit }) {
    commit('logout')
    localStorage.removeItem("token")
  }
}

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
}
