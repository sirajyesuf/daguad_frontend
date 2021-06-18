<template>
  <div class="q-pa-md row q-gutter-md justify-center">
    <q-card
      class="col-xs-10 col-sm-10 col-md-3"
      v-for="(report, index) in dashboardreport"
      :key="index"
    >
      <q-card-section class="bg-orange text-white text-center">
        <div class="text-subtitle1">{{ report.title }}</div>
        <div class="text-subtitle2">{{ report.value }}</div>
      </q-card-section>

      <q-card-actions align="around">
        <q-btn
          flat
          color="primary"
          :no-caps="true"
          :label="report.btn"
          :to="url(report.title.toLowerCase())"
        ></q-btn>
      </q-card-actions>
    </q-card>
  </div>
</template>

<script>
export default {
  name: 'PageIndex',
  data() {
    return {
      dashboardreport: null
    }
  },
  async created() {
    await this.fetchDashboardReport()
  },
  methods: {
    async fetchDashboardReport() {
      const response = await this.$api.get('dashboard_report')
      console.log('dashboard reports', response)
      this.dashboardreport = response.data
    },
    url(title) {
      if (title.includes('Earning'.toLowerCase())) return { name: 'earning' }
      if (title.includes('Campaign'.toLowerCase()))
        return { name: 'campaign_list' }
      if (title.includes('channel'.toLowerCase()))
        return { name: 'list_channel' }
    }
  },
  computed: {}
}
</script>

<style lang="css" scoped></style>
