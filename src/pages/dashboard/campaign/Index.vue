<template>
  <div>
    <q-btn
      flat
      color="orange"
      push
      :no-caps="true"
      icon-right="fas fa-plus-circle"
      label="Add Campaign"
      :to="{ name: 'create_campaign' }"
      class="on-right q-mb-xs"
    />
    <q-separator color="orange" class="q-mt-mb"></q-separator>
    <q-markup-table flat class="q-mt-xl" separator="cell" bordered>
      <thead>
        <tr>
          <th colspan="7">
            <div class="row no-wrap items-center">
              <div class="text-h5 q-ml-md text-secondary">Campaigns</div>
            </div>
          </th>
        </tr>
        <tr>
          <th class="text-left">#</th>
          <th class="text-left">Campaign <i class="fas fa-ad"></i></th>
          <th class="text-left">
            PaymentStatus <i class="far fa-handshake"></i>
          </th>
          <th class="text-left">
            ApprovedStatus <i class="fas fa-check-circle"></i>
          </th>
          <th class="text-left">
            CurrentStatus <i class="fas fa-check-circle"></i>
          </th>
          <th class="text-left">Starting Date <i class="fas fa-clock"></i></th>
          <th class="text-center">Action</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(campaign, index) in campaigns" :key="campaign.id">
          <td class="text-left">{{ index | number(current) }}</td>
          <td class="text-left">
            <q-chip>
              <q-avatar size="xl">
                <img :src="campaign.images[0].path | imagefullurl" />
              </q-avatar>
              <span v-html="display_message(campaign.message)"></span>
            </q-chip>
          </td>
          <td class="text-left">
            <q-btn
              outline
              :no-caps="true"
              color="primary"
              label="Pay Campaign"
              v-if="campaign.paid_status === 0"
              :to="{
                name: 'campaign_payment',
                params: {
                  id: campaign.id
                }
              }"
            />
            <p v-else>☑️Payed</p>
          </td>
          <td class="text-left">
            {{ campaign.approve_status | Approvedstatus }}
          </td>
          <td class="text-left">
            {{ campaign.active_status | currentstatus }}
          </td>
          <td class="text-left">
            {{ campaign.starting_date | starting_date }}
          </td>
          <td class="text-left">
            <div>
              <q-btn color="negative" icon-right="delete" no-caps flat dense>
                <q-tooltip> Delete the Campaign </q-tooltip>
              </q-btn>

              <q-btn
                color="secondary"
                icon-right="fas fa-history"
                no-caps
                flat
                dense
                :to="{
                  name: 'campaign_history',
                  params: { id: campaign.id }
                }"
              >
                <q-tooltip> Campaign Post History </q-tooltip>
              </q-btn>
              <q-btn
                color="positive"
                icon-right="fas fa-info"
                no-caps
                flat
                dense
                :to="{
                  name: 'campaign-detail',
                  params: { id: campaign.id }
                }"
              >
                <q-tooltip>Campaign Detail </q-tooltip>
              </q-btn>
            </div>
          </td>
        </tr>
      </tbody>
    </q-markup-table>
    <div class="q-pa-lg flex flex-center">
      <q-pagination
        v-if="max !== null"
        :value="current"
        :max="max"
        :input="true"
        @input="atinput"
      >
      </q-pagination>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  data() {
    return {
      current: 1,
      max: null
    }
  },
  async created() {
    this.$store.commit('common/update', true)
    const response = await this.fetchCampaigns()
    this.config(response)
  },
  components: {},
  methods: {
    display_message(value) {
      value = value.toString()
      return value.slice(0, 20)
    },
    config(response) {
      this.max = Math.ceil(
        response.data.meta.total / response.data.meta.per_page
      )
    },
    async atinput(value) {
      this.$store.commit('common/update', true)
      this.current = value
      const response = await this.fetchCampaigns(
        `/campaigns/list_of_user_campaign?page=${this.current}`
      )

      this.config(response)
    },
    async fetchCampaigns(url = null) {
      let URL = '/campaigns/list_of_user_campaign'
      if (url !== null) URL = url
      return await this.$store.dispatch('campaign/fetchCampaigns', URL)
    },
    showdetail(campaign) {
      this.$router.push({
        name: 'campaign-detail',
        params: { id: campaign.id }
      })
    }
  },
  computed: {
    ...mapGetters('campaign', ['campaigns'])
  },
  filters: {
    Approvedstatus(value) {
      if (value === 1) return '☑️Approved'
      if (value === 0) return '✖️Blocked'
    },
    currentstatus(value) {
      if (value === 1) return 'Wating'
      if (value === 2) return 'Active'
      if (value === 3) return 'Closed'
    },
    starting_date(value) {
      return new Date(value).toDateString()
    }
  }
}
</script>
