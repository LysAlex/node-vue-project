<template>
  <div>
    <p
      v-for="item in people"
      :key="item.key"
    >
     {{ item.name }}
    </p>
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex'

export default {
  methods: {
    ...mapActions({
      fetchPeople: 'people/fetchPeople'
    })
  },
  computed: {
    ...mapState({
      people: state => state.people.people
    })
  },
  mounted () {
    this.fetchPeople()
  }
}
</script>
