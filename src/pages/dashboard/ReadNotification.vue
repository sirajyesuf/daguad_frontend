<template>
  <q-card class="no-shadow" v-if="!loading">
    <q-card-section class="bg-primary text-white">
      <div class="text-h6">{{ notification.data.title }}</div>
      <div class="text-subtitle2 text-caption text-muted text-weight-regular">
        Notifications
        <br />
        {{ notification.data.subject }}!
      </div>
    </q-card-section>
    <q-card-section>
      <p v-html="notification.data.body"></p>
    </q-card-section>
    <q-card-actions align="right" vertical>
      <p class="q-mb-none text-subtitle2 text-muted">
        By:
        <span> dagu Ads </span>
      </p>

      <p class="q-mt-none text-subtitle3 text-muted">
        {{ new Date(notification.created_at).toLocaleString() }}
      </p>
    </q-card-actions>
  </q-card>
</template>

<script>
export default {
  data() {
    return {
      loading: false,
      notification: null
    }
  },
  async created() {
    this.loading = true
    await this.Fetchnotification()
    this.loading = false
  },
  methods: {
    async Fetchnotification() {
      const response = await this.$api.get(
        `notifications/${this.$route.params.id}`
      )
      this.notification = response.data
    }
  }
}
</script>
