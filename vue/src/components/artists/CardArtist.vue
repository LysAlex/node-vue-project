<template>
  <div class="col-12 col-lg-4 m-auto text-center">
    <router-link
      :to="{name: 'artists.show', params: {id: this.data.id}}"
    >
      <div class="card-artist">
        <b-avatar v-bind:src="this.data.avatar" size="6rem"></b-avatar>
        <h2>{{ this.data.name }}</h2>
        <p> {{ this.data.description }} </p>
        <hr />
        <div style="font-size: 1.25rem;">
        </div>
      </div>
    </router-link>
  </div>
</template>

<script>
export default {
  name: "CardArtist",
  props: {
    data: Object
  }
}
</script>

<style lang="scss">
.card-artist {
  background-color: #fff;
  border: 1px solid #EEEEEE;
  margin: 1rem 0;
  padding: .75rem .5rem;
  border-radius: 20px;
  color: #000;
  transition: all 300ms;
  &:hover {
    cursor: pointer;
    background-color: #EEEEEE;
  }
}
</style>