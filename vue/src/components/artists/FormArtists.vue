<template>
  <div class="col-12 col-lg-6 m-auto">
    <b-alert show variant="danger" v-if="error !== ''">{{ error }}</b-alert>
    <b-card class="text-center">
      <h1>{{ this.title }}</h1>
      <b-form>
        <b-form-input
          required
          v-model="formData.name"
          name="Name"
          type="text"
          placeholder="Enter artiste name"
        ></b-form-input>
        <b-form-textarea
          required
          v-model="formData.description"
          name="Description"
          type="text"
          rows="6"
          placeholder="Enter artiste description"
          class="mt-3"
        ></b-form-textarea>
        <b-form-input
          required
          v-model="formData.origin"
          name="Origine"
          type="text"
          placeholder="Enter artiste origine"
          class="mt-3"
        ></b-form-input>
        <b-form-input
          required
          v-model="formData.avatar"
          name="Avatar"
          type="text"
          placeholder="Enter artiste avatar"
          class="mt-3"
        ></b-form-input>
        <div class="w-100">
          <b-button variant="light" class="mt-3" @click="formSubmit">{{ this.label }}</b-button>
        </div>
      </b-form>
    </b-card>
  </div>
</template>
<script>
export default {
  name: "FormArtists",
  props: ["title", "label", "data", "onClick"],
  data() {
    return {
      formData: {
        name: typeof this.data !== "undefined" ? this.data.name : "",
        description: typeof this.data !== "undefined" ? this.data.description : "",
        origin: typeof this.data !== "undefined" ? this.data.origin : "",
        avatar: typeof this.data !== "undefined" ? this.data.avatar : "",
      },
      error: ""
    }
  },
  methods: {
    formSubmit() {
      if (this.formData.name === "" || this.formData.description === "" || this.formData.origin === "" || this.formData.avatar === "") {
        this.error = 'All fields required'
        return
      }
      this.onClick(this.formData)
    },
  },
}
</script>
<style lang="scss">
</style>