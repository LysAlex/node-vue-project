import Vuex from 'vuex'
import Vue from 'vue'
import artists from '@/store/modules/artists'
import auth from '@/store/modules/auth'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    artists,
    auth
  }
})
