<template>
  <div class="container">
    <Loader v-if="isLoading" />
    <div v-if="!isLoading" class="row">
      <FormArtists 
        title="Edit artists"
        label="Edit"
        :data="artists"
        :onClick="save"
      />
    </div>
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex'
import FormArtists from '@/components/artists/FormArtists'
import Loader from '@/components/Loader'

export default {
  components: {
    FormArtists,
    Loader
  },
  data(){
    return {
      isLoading: true
    }
  },
  computed: {
    ...mapState({
      artists: state => state.artists.artists
    })
  },
  methods: {
    ...mapActions({
      fetchArtist: 'artists/fetchArtist',
      editArtist: 'artists/editArtist'
    }),
    save(formData) {
      this.editArtist({ id: this.artists.id, ...formData })
      this.$router.push({ name: 'artists.index' })
    }
  },
  async mounted() {
    await this.fetchArtist(this.$route.params.id)
    this.isLoading = false
  }
}
</script>
