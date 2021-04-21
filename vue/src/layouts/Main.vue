<template>
  <el-container>
    <el-container class="main">
      <Navbar />
      <el-main class="content">
        <transition name="fade" mode="out-in">
          <router-view />
        </transition>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
import Navbar from "@/components/Navbar"

export default {
  components: {
    Navbar,
  },
}
</script>
<style lang="scss">
.main {
  flex-direction: column!important;
  .content {
    width: 100%;
  }
}
</style>