<template>
  <div class="container">
    <div class="row">
      <FormArtists 
        title="Add artists"
        label="Create"
        :onClick="create"
      />
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
import FormArtists from '@/components/artists/FormArtists'

export default {
  components: {
    FormArtists
  },
  methods: {
    ...mapActions({
      createArtist: 'artists/createArtist'
    }),
    create(formData) {
      this.createArtist(formData)
      this.$router.push({ name: 'artists.index' })
    }
  }
}
</script>
