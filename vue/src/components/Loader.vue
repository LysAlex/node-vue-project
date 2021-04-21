<template>
  <div class="text-center loader-container">
    <b-spinner class="loader" type="grow" label="Spinning"></b-spinner>
  </div>
</template>
<script>
export default {
  name: "loader",
}
</script>
<style lang="scss">
.loader-container {
    min-height: 40vh;
    position: relative;
    .loader {
        position: absolute;
        top: 50%;
        transform: translateY(-50%);
    }
}
</style>