<template>
  <div v-if="!isLoading">
    <h2> {{ artists.name }} </h2>
    <p> {{ artists.description }} </p>
    <div class="mt-5 d-flex justify-content-end" v-if="role === 'admin'">
          <b-button class="mr-2" variant="success" @click="edit">Edit Artist</b-button>
          <b-button variant="danger" @click="deleteItem">Delete</b-button>
    </div>
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex'

export default {
  data() {
    return {
      isLoading: true
    }
  },
  methods: {
    ...mapActions({
      fetchArtist: 'artists/fetchArtist',
      deleteArtist: 'artists/deleteArtist',
    }),
    edit() {
      this.$router.push({ name: 'artists.edit', params: { id: this.artists.id } })
    },
    deleteItem() {
      this.deleteArtist(this.$route.params.id)
      this.$router.push({ name: 'artists.index' })
    },
  },
  computed: {
    ...mapState({
      artists: state => state.artists.artists,
      role: state => state.auth.role,
    })
  },
  async mounted() {
    await this.fetchArtist(this.$route.params.id)
    this.isLoading = false
  }
}
</script>
