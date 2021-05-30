<template>
  <q-card class="no-shadow">
    <q-card-section class="bg-primary text-white">
      <div class="text-h6">Notifications</div>
      <div class="text-subtitle2">All Notifications</div>
    </q-card-section>
    <q-card-section>
      <q-list bordered separator>
        <q-item v-for="(notification, index) in readnotifications" :key="index">
          <q-item-section>{{ notification.data.body }}</q-item-section>
          <q-item-section side>
            <q-item-label caption>
              {{ new Date(notification.created_at).toLocaleString() }}
            </q-item-label>
          </q-item-section>
        </q-item>
      </q-list>
    </q-card-section>
    <q-section-action>
      <div class="q-pa-lg flex flex-center">
        <q-pagination
          v-model="current"
          @click="pagination"
          :max="max"
          input
          input-class="text-orange-10"
        />
      </div>
    </q-section-action>
  </q-card>
</template>

<script>
export default {
  data() {
    return {
      current: 1,
      max: 0,
      readnotifications: []
    }
  },
  async created() {
    const notifications = await this.fetchreadNotifications('/notifications')
    this.max = Math.ceil(notifications.data.total / notifications.data.per_page)
    this.readnotifications = notifications.data.data
    console.log(this.max)
    console.log(notifications)
  },
  methods: {
    async fetchreadNotifications(url) {
      return await this.$api.get(url)
    },
    async pagination() {
      const url = `notifications?page=${this.current}`
      const result = await this.fetchreadNotifications(url)
      this.readnotifications = result.data.data
    }
  }
}
</script>
