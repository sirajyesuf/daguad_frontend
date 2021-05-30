<template>
  <q-layout view="hHh lpR fFf">
    <app-nav-bar></app-nav-bar>
    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
export default {
  data() {
    return {
      model: 'one'
    }
  },
  components: {
    'app-nav-bar': require('components/landing/Navbar.vue').default
  }
}
</script>
