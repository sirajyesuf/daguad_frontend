<template>
  <div>
    <q-btn
      color="secondary"
      label="create campaign"
      to="campaign/new_campaign"
    />

    <campaign-table />
  </div>
</template>

<script>
export default {
  created() {
    this.$store.dispatch('campaign/fetchCampaigns')
  },
  components: {
    'campaign-table': require('components/campaign/CampaignTable.vue').default
  }
}
</script>
