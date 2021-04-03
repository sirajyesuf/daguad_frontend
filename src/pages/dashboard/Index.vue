<template>
  <div class="q-pa-md row items-start q-gutter-md">
    <q-spinner v-if="loading" color="grey" size="3em" :thickness="10" />

    <q-card
      v-else
      class="col-md row-sm my-card"
      v-for="i in info"
      :key="i.title"
    >
      <q-card-section class="bg-primary text-white">
        <div class="text-h6">{{ i.title }}</div>
        <div class="text-subtitle2">{{ i.number }}</div>
      </q-card-section>

      <q-separator />

      <q-card-actions align="right">
        <q-btn flat>Action 1</q-btn>
        <q-btn flat>Action 2</q-btn>
      </q-card-actions>
    </q-card>

    <q-card class="col-md row-sm my-card">
      <q-card-section class="bg-purple text-white">
        <div class="text-h6">Our Changing Planet</div>
        <div class="text-subtitle2">by John Doe</div>
      </q-card-section>

      <q-card-actions align="around">
        <q-btn flat>Action 1</q-btn>
        <q-btn flat>Action 2</q-btn>
      </q-card-actions>
    </q-card>

    <q-card class="col-md row-sm my-card">
      <q-card-section class="bg-info text-white">
        <div class="text-h6">Our Changing Planet</div>
        <div class="text-subtitle2">by John Doe</div>
      </q-card-section>

      <q-card-actions align="around">
        <q-btn flat>Action 1</q-btn>
        <q-btn flat>Action 2</q-btn>
      </q-card-actions>
    </q-card>
    <q-card class="col-md row-sm my-card">
      <q-card-section class="bg-teal text-white">
        <div class="text-h6">Our Changing Planet</div>
        <div class="text-subtitle2">by John Doe</div>
      </q-card-section>

      <q-card-actions align="around">
        <q-btn flat>Action 1</q-btn>
        <q-btn flat>Action 2</q-btn>
      </q-card-actions>
    </q-card>
  </div>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  name: 'PageIndex',
  data() {
    return {
      loading: false,
      info: null
    }
  },
  methods: {
    ...mapActions('user', ['dashboardinfo']),
    fetchdata() {
      this.loading = true
      setTimeout(() => {}, 5000)
      // this.info = this.dashboardinfo()
      this.loading = false
    }
  },
  created() {
    this.fetchdata()
  }
}
</script>

<style lang="css" scoped>
.my-card {
  width: 100%;
  max-width: 500px;
}
</style>
