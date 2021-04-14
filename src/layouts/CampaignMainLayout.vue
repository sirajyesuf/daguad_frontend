<template>
  <div>
    <router-view> </router-view>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  computed: {
    ...mapGetters('common', ['loading'])
  }
}
</script>
<style scoped></style>
