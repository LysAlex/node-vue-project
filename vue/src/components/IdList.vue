<template>
  <div>
    <h1>{{ title }}</h1>
    <div v-if="loaded">
      <div
        v-for="item in items"
        :key="item.name">
        <p v-for="(label, key) in mapping" :key="key">
          {{ `${label}: ${item[key]}` }}
        </p>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  data () {
    return {
      items: [],
      loaded: false,
      error: null,
    }
  },
  props: {
    mapping: Object,
    endpoint: String,
    title: String,
  },
  created () {
    this.fetch()
  },
  methods: {
    fetch () {
      this.loaded = false
      axios.get(`https://swapi.dev/api/${this.endpoint}`)
        .then(res => {
          this.items = res.data.results
          this.loaded = true
        })
        .catch(er => {
          this.error = er.response.status
          this.loaded = true
        })
    }
  },
  watch: {
    '$route' (to, from) {
      this.fetch()
    }
  },
}
</script>
