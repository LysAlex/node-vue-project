<template>
<div>
  <b-navbar toggleable="lg" type="dark" variant="default">
    <b-navbar-brand href="#">
      <router-link class="nav-link" :to="{ name: 'home' }">
        Home
      </router-link>
    </b-navbar-brand>
    <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>
    <b-collapse id="nav-collapse" is-nav>
      <b-navbar-nav>
        <b-nav-item href="#">
        <router-link class="nav-link" :to="{ name: 'artists.index' }">
          Artists
        </router-link>
        </b-nav-item>
      </b-navbar-nav>

      <!-- Right aligned nav items -->
      <b-navbar-nav class="ml-auto">

        <b-nav-item-dropdown right v-if="isAuth">
          <!-- Using 'button-content' slot -->
          <template #button-content>
            <em>{{ user }}</em>
          </template>
          <b-dropdown-item to="/profile">Profil</b-dropdown-item>
          <b-dropdown-item @click="logoutUser" >Logout</b-dropdown-item>
        </b-nav-item-dropdown>
        <b-nav-item-dropdown right v-else>
          <!-- Using 'button-content' slot -->
          <template #button-content>
            <em>Auth</em>
          </template>
          <b-dropdown-item to="/login">Login</b-dropdown-item>
          <b-dropdown-item to="/register">Register</b-dropdown-item>
        </b-nav-item-dropdown>
      </b-navbar-nav>
    </b-collapse>
  </b-navbar>
</div>
</template>

<script>
import { mapState, mapActions } from "vuex"
import router from '@/router'

export default {
  name: "navbar",
  methods: {
    ...mapActions({
      logout: "auth/logout",
    }),
    logoutUser(){
      this.logout({ router })
    }
  },
  computed: {
    ...mapState({
      isAuth: state => state.auth.isAuth,
      user: state => state.auth.user
    })
  }
}
</script>

<style scoped lang='scss' rel="stylesheet/scss">
.navbar {
  background-color:#24292E;
  margin: 0;
  padding: 1rem 2rem;
  display: flex;
  max-width: 100%;
  .nav-link {
    color: #fff;
    text-decoration: none;
    margin-right: 1rem;
  }
  .router-link-exact-active {
    border-bottom: 1px solid #fff;
  }
  .flex-grow {
    text-decoration: none;
    flex-grow: 1;
  }
}
</style>