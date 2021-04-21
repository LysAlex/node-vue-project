import api from '@/api/config'

const state = {
  manyArtists: [],
  artists: null,
}

const getters = {
  getManyArtists: state => state.manyArtists,
  getArtists: state => state.artists,
}

const mutations = {
  setManyArtists(state, manyArtists) {
    state.manyArtists = manyArtists
  },
  setArtist(state, artists) {
    state.artists = artists
  }
}

const actions = {
  async fetchManyArtists({ commit }) {
    const { data } = await api.get('http://localhost:3000/artists')
    commit('setManyArtists', data)
  },
  async fetchArtist({ commit }, id) {
    const { data } = await api.get(`http://localhost:3000/artists/${id}`)
    commit('setArtist', data)
  },
  async createArtist({ commit }, data) {
    await api.post(`http://localhost:3000/artists`, {
      ...data
    })
  },
  async editArtist({ commit }, data) {
    await api.patch(`http://localhost:3000/artists/${data.id}`, {
      ...data
    })
  },
  async deleteArtist({ commit }, id) {
    await api.delete(`http://localhost:3000/artists/${id}`)
  },
}

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
}
