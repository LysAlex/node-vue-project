<template>
  <div class="container">
    <div class="row">
      <div class="col-10 col-lg-6 m-auto">
        <b-alert show variant="danger" v-if="error !== ''">{{ error }}</b-alert>
        <b-card class="text-center">
          <h1>Login </h1>
          <b-form @submit.stop.prevent="onSubmit">
            <ValidationProvider rules="email|required" v-slot="{ errors }">
              <b-input-group class="mt-3">
                <b-input-group-prepend is-text>
                  <b-icon icon="envelope"></b-icon>
                </b-input-group-prepend>
                <b-form-input
                  v-model="email"
                  name="Email"
                  type="email"
                  placeholder="Enter your email"
                ></b-form-input>
              </b-input-group>
              <span class="error-message">{{ errors[0] }}</span>
            </ValidationProvider>
            <ValidationProvider rules="4caracters|required" v-slot="{ errors }">
              <b-input-group class="mt-3">
                <b-input-group-prepend is-text>
                  <b-icon icon="lock"></b-icon>
                </b-input-group-prepend>
                <b-form-input
                  v-model="password"
                  type="password"
                  placeholder="Enter your password"
                ></b-form-input>
              </b-input-group>
              <span class="error-message">{{ errors[0] }}</span>
            </ValidationProvider>
            <div class="w-100">
              <b-button variant="light" type="submit" class="mt-5" :disabled="isLoading">
                Login
              </b-button>
            </div>
          </b-form>
        </b-card>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions } from "vuex"
import router from '@/router'
import { extend } from 'vee-validate'
import { required, email } from 'vee-validate/dist/rules'

extend('email', {
  ...email,
  message: 'This field must be an email'
})
extend('required', {
  ...required,
  message: 'This field is required'
})
extend('4caracters', value => {
  if (value.length >= 4){
    return true
  }

  return 'This field must have 4 caracters min.'
})

export default {
  name: "Login",
  data() {
    return {
      email: "",
      password: "",
      error: "",
      isLoading: false
    }
  },
  methods: {
    ...mapActions({
      fetchLogin: "auth/fetchLogin",
    }),
    async onSubmit(){
      if (this.email === '' || this.password === ''){
        this.error = 'All fields required, please retry'
        return
      }
      this.isLoading = true
      try {
        await this.fetchLogin({ email: this.email, password: this.password, router })
      } catch (err) {
        this.error = err.response.data.message || 'An error occured, please retry'
      } finally {
        this.isLoading = false
      }
    }
  }
}
</script>
<style lang="scss">
</style>