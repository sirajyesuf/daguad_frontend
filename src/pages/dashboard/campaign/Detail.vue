<template>
  <div v-if="!loading">
    <div class="text-h6 col text-orange">
      <i class="fas fa-folder-open"></i>
      Viewing Campaign
    </div>
    <div>
      <div class="row">
        <q-btn
          class="col"
          :no-caps="true"
          flat
          label="Edit"
          color="orange"
          icon="fas fa-pencil-alt"
          :to="{ name: 'edit_campaign', params: { id: campaign.id } }"
        >
        </q-btn>
        <q-btn
          class="col"
          flat
          :no-caps="true"
          color="orange"
          label="Pay Campaign"
          v-if="campaign.paid_status === 0"
          :to="{ name: 'campaign_payment', params: { id: $route.params.id } }"
        />

        <q-btn
          class="col"
          flat
          :no-caps="true"
          label="Return To List"
          color="orange"
          icon="fas fa-list"
          :to="{ name: 'campaign_list' }"
        ></q-btn>
      </div>
    </div>

    <q-separator class="q-my-sm"></q-separator>
    <!-- content and package display start -->
    <div class="q-pa-md row items-start q-gutter-md">
      <q-card class="col-xs-12 col-sm-12 col-md-6 no-shadow my-card">
        <img
          :src="campaign.images[0].path | imagefullurl"
          alt="campaign image"
        />

        <q-card-section>
          <div
            class="text-subtitle1 text-muted"
            v-html="campaign.message"
          ></div>
        </q-card-section>
      </q-card>
      <div class="col-xs-12 col-sm-12 col-md-5 no-shadow">
        <q-list bordered padding>
          <q-item-label header class="text-pink">Package</q-item-label>

          <q-item clickable>
            <q-item-section>
              <q-item-label class="text-teal">Per Day View</q-item-label>
              <q-item-label caption>
                Get an estimated views of
                <strong>{{ campaign.package.initial_per_day_view }}</strong>
                up to
                <strong> {{ campaign.package.final_per_day_view }} </strong>per
                day
              </q-item-label>
            </q-item-section>
          </q-item>

          <q-item clickable>
            <q-item-section>
              <q-item-label class="text-teal">Price</q-item-label>
              <q-item-label caption>
                {{ campaign.package.total_amount }} ETB
              </q-item-label>
            </q-item-section>
          </q-item>
          <q-item clickable>
            <q-item-section>
              <q-item-label class="text-teal">Number Of Days</q-item-label>
              <q-item-label caption>
                {{ campaign.package.number_of_days }} days
              </q-item-label>
            </q-item-section>
          </q-item>
          <q-item clickable>
            <q-item-section>
              <q-item-label class="text-teal">Starting Date</q-item-label>
              <q-item-label caption>
                {{ new Date(campaign.starting_date).toLocaleDateString() }}
              </q-item-label>
            </q-item-section>
          </q-item>
        </q-list>
      </div>
    </div>
    <!-- content and package display end  -->
    <!-- catagories  start-->
    <div class="row">
      <div class="col-xs-12 col-sm-12 col-mb-6">
        <h6 class="text-pink q-ma-xs">Catagories</h6>
      </div>

      <div class="col col-xs-12 col-sm-12 col-mb-6">
        <q-list
          bordered
          class="rounded-borders"
          v-for="(catagory, index) in campaign.catagories"
          :key="index"
        >
          <q-expansion-item expand-separator :label="catagory.name">
            <q-card>
              <q-card-section>
                {{ catagory.description }}
              </q-card-section>
            </q-card>
          </q-expansion-item>
        </q-list>
      </div>
    </div>
    <!-- catagories end -->
  </div>
</template>

<script>
export default {
  data() {
    return {
      loading: false,
      campaign: null,
      lorem: 'Lorem ipsum dolor sit amet, consectetur adipisc'
    }
  },
  async created() {
    this.loading = true
    const response = await this.fetchcampaign()
    this.campaign = response.data
    this.loading = false
  },
  methods: {
    async fetchcampaign() {
      return await this.$api.get(`campaigns/${this.$route.params.id}`)
    }
  }
}
</script>

<style scoped>
.select-paymet {
  border-left-color: rgb(66, 52, 59);
  border-left-style: solid;
  border-left-width: 4px;
  box-sizing: border-box;
  border-right-color: rgb(66, 52, 59);
  border-right-style: solid;
  border-right-width: 4px;
}

.q-list--bordered {
  border: none;
}
.w3-code[data-v-18ca20c2] {
  width: auto;
  background-color: #fff;
  /* padding: 8px 12px; */
  border-left: 4px solid #4caf50;
  word-wrap: break-word;
}
.my-card {
  width: 300px;
}

.sm-view {
  display: inline-block;
}
</style>
