<template>
  <q-card class="no-shadow">
    <q-card-section class="bg-primary text-white">
      <div class="text-h6">Notifications</div>
      <div class="text-subtitle2">All Notifications</div>
    </q-card-section>
    <q-card-section>
      <q-list bordered separator v-if="readnotifications.length !== 0">
        <q-item
          v-for="(notification, index) in readnotifications"
          :key="index"
          clickable
          :to="{ name: 'read_notification', params: { id: notification.id } }"
        >
          <q-item-section>
            <q-item-label class="text-subtitle">
              {{ notification.data.subject }}
            </q-item-label>
          </q-item-section>

          <q-item-section side top>
            <q-item-label caption class="text-muted text-green">
              {{ notification.created_at | fromNow }}
            </q-item-label>
          </q-item-section>
        </q-item>
      </q-list>
      <p v-else>zero notifications</p>
    </q-card-section>
    <q-section-action v-if="readnotifications.length !== 0">
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
    const notifications = await this.fetchreadNotifications('notifications')
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
