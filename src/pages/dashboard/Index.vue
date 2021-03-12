<template>
  <div>
    <h5>dashboard</h5>
    <q-btn @click="logout"> logout </q-btn>
  </div>
</template>
<script>
export default {
  methods: {
    logout() {
      localStorage.removeItem('daguad_key')
      this.$router.push({ path: '/account/signin' })
    }
  }
}
</script>
