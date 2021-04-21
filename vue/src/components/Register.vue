<template>
  <div>
    <h1> Register </h1>
    <label>Email</label>
    <input
      type="text"
      v-model="email"
    />
    <label>Password</label>
    <input
      type="password"
      v-model="password"
    />
    <button @click="submit">
      Register
    </button>
    <p v-if="error">{{ error }}</p>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  data () {
    return {
      email: '',
      password: '',
      error: null
    }
  },
  methods: {
    submit () {
      axios.post('http://localhost:3000/register', {
        email: this.email,
        password: this.password
      })
        .then(res => {
          localStorage.setItem('token', res.data.accessToken)
          this.$router.push({ name: 'people' })
        })
        .catch(er => {
          this.error = 'Une erreur est survenue'
        })
    }
  }
}
</script>
