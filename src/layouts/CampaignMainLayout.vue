<template>
  <div>
    <router-view> </router-view>
  </div>
</template>

<script>
export default {
  computed: {
    loading: {
      get() {
        return this.$store.state.common.loading
      }
    }
  }
}
</script>
<style scoped>
/* .w3-code {
  width: auto;
  background-color: #fff;
  padding: 8px 12px;
  border-left: 4px solid #4caf50;
  word-wrap: break-word;
} */
</style>
