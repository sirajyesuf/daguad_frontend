<template>
  <div v-if="loading">
    <q-btn
      flat
      color="primary"
      label="create campaign"
      to="campaign/new_campaign"
    />

    <q-markup-table flat class="q-mt-mb">
      <thead>
        <tr>
          <th class="text-left">#</th>
          <th class="text-left">Campaign</th>
          <th class="text-left">PaymentStatus</th>
          <th class="text-left">ApprovedStatus</th>
          <th class="text-left">Package</th>
          <th class="text-left">Action</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(campaign, index) in campaigns" :key="campaign.id">
          <td class="text-left">{{ index + 1 }}</td>
          <td class="text-left">
            <q-img src="1.png" style="height: 100px; max-width: 150px">
              <template v-slot:error>
                <div
                  class="absolute-full flex flex-center bg-negative text-white"
                >
                  Cannot load image
                </div>
              </template>
            </q-img>
          </td>
          <td class="text-left">{{ campaign.paid_status }}</td>
          <td class="text-left">24</td>
          <td class="text-left">4</td>
          <td class="text-left">
            <q-btn color="negative" icon-right="delete" no-caps flat dense />
            <q-btn
              color="positive"
              icon-right="edit"
              no-caps
              flat
              dense
              :to="{ name: 'edit_campaign', params: { id: campaign.id } }"
            />
            <q-btn
              color="positive"
              icon-right="details"
              no-caps
              flat
              dense
              :to="{ name: 'campaign_history', params: { id: campaign.id } }"
            />
          </td>
        </tr>
      </tbody>
    </q-markup-table>
    <q-pagination v-model="current" :max="5" class="q-mt-mb"> </q-pagination>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  data() {
    return {
      current: 1
    }
  },
  created() {
    this.$store.commit('common/updateLoading')
    this.$store.dispatch('campaign/fetchCampaigns')
  },
  components: {},
  methods: {
    async start() {
      this.loading = true
      this.$store.commit('common/updateLoading')
      await this.$store.dispatch('campaign/fetchCampaigns')
      this.loading = false
    }
  },
  computed: {
    ...mapGetters('campaign', ['campaigns']),
    ...mapGetters('common', ['loading'])
  },
  filters: {
    display_message(value) {
      value = value.toString()
      return value.slice(0, 20) + '.......' + 'seemore'
    }
  }
}
</script>
