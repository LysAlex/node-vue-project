<template>
  <div class="container">
    <h1>Artists</h1>
    <p v-if="isLoading">Loading ... </p>
    <div v-if="!isLoading" class="row">
      <b-button @click="onAdd" v-if="role === 'admin'" size="lg" variant="success" class="mb-2 add-btn">
        <b-icon icon="plus-circle-fill" aria-label="Help"></b-icon>
        Add artists
      </b-button>
      <CardArtist v-for="item in artists" :key="item.id" :data="item" />
    </div>
 </div>
</template>
<script>
import { mapActions, mapState } from 'vuex'
import CardArtist from '@/components/artists/CardArtist'

export default {
  components: {
    CardArtist,
  },
  data(){
    return {
      isLoading: true,
    }
  },
  methods: {
    ...mapActions({
      fetchManyArtists: 'artists/fetchManyArtists',
    }),
    onAdd: function(){
      this.$router.push('/artists/create')
    }
  },
  computed: {
    ...mapState({
      artists: state => state.artists.manyArtists,
      role: state => state.auth.role
    })
  },
  async mounted() {
    await Promise.all([
      this.fetchManyArtists(),
    ])
    this.isLoading = false
  }
}
</script>
<style lang="scss">
.add-btn {
  position: fixed;
  right: 50px;
  bottom: 50px;
  z-index: 1050;
}
</style>