<template>
  <q-card class="no-shadow">
    <q-tabs
      v-model="tab"
      dense
      class="text-grey"
      active-color="primary"
      indicator-color="primary"
      align="justify"
      narrow-indicator
    >
      <q-tab name="ep" label="Earning Payment" />
      <q-tab name="cp" label="Campaign Payment" />
    </q-tabs>

    <q-separator />

    <q-tab-panels v-model="tab" animated>
      <q-tab-panel name="ep">
        <div class="text-h6 text-grey">Channel Earning Payment History</div>

        <template>
          <div class="q-pa-md">
            <q-markup-table class="no-shadow" separator="cell" bordered>
              <thead>
                <tr>
                  <th class="text-left">#</th>
                  <th class="text-left">Transaction Id</th>
                  <th class="text-left">Payment Method</th>
                  <th class="text-left">
                    Amount
                    <br />
                    (ETB)
                  </th>
                  <th class="text-left">PayedAt</th>
                </tr>
              </thead>
              <tbody>
                <template v-if="epayments.data.length > 0">
                  <tr v-for="(payment, index) in epayments.data" :key="index">
                    <td class="text-left">
                      <q-skeleton
                        v-if="eloading"
                        animation="blink"
                        type="rect"
                      />
                      <span v-else>
                        {{ index + 1 }}
                      </span>
                    </td>
                    <td class="text-left">
                      <q-skeleton
                        v-if="eloading"
                        animation="blink"
                        type="rect"
                      />
                      <span v-else>
                        {{ payment.transaction_id }}
                      </span>
                    </td>
                    <td class="text-left">
                      <q-skeleton
                        v-if="eloading"
                        animation="blink"
                        type="rect"
                      />
                      <span v-else>
                        {{ payment.payment_method.payment_method_name }}
                      </span>
                    </td>
                    <td class="text-left">
                      <q-skeleton
                        v-if="eloading"
                        animation="blink"
                        type="rect"
                      />
                      <span v-else>
                        {{ payment.amount }}
                      </span>
                    </td>
                    <td class="text-left">
                      <q-skeleton
                        v-if="eloading"
                        animation="blink"
                        type="rect"
                      />
                      <span v-else>
                        {{ new Date(payment.created_at).toDateString() }}
                      </span>
                    </td>
                  </tr>
                </template>
                <template v-else> zero payment history </template>
              </tbody>
            </q-markup-table>
            <div
              class="q-pa-lg flex flex-center"
              v-if="epayments.data.length > 0"
            >
              <q-pagination
                :value="ecurrent"
                :max="emax"
                :input="true"
                @input="fetchePayment"
                input-class="text-orange-10"
              />
            </div>
          </div>
        </template>
      </q-tab-panel>

      <q-tab-panel name="cp">
        <div class="text-h6 text-grey">Campaign Payment History</div>
        <template>
          <div class="q-pa-md">
            <q-markup-table class="no-shadow" separator="cell" bordered>
              <thead>
                <tr>
                  <th class="text-left">#</th>
                  <th class="text-left">
                    Amount <br />
                    (ETB)
                  </th>
                  <th class="text-left">Payment Method</th>
                  <th class="text-left">PayedAt</th>
                </tr>
              </thead>
              <tbody>
                <template v-if="cpayments.data.length > 0">
                  <tr v-for="(cpayment, index) in cpayments.data" :key="index">
                    <td class="text-left">
                      <q-skeleton
                        v-if="cloading"
                        animation="blink"
                        type="rect"
                      />
                      <span v-else>
                        {{ index + 1 }}
                      </span>
                    </td>
                    <td class="text-left">
                      <q-skeleton
                        v-if="cloading"
                        animation="blink"
                        type="rect"
                      />
                      <span v-else> {{ cpayment.package.total_amount }} </span>
                    </td>
                    <td class="text-left">
                      <q-skeleton
                        v-if="cloading"
                        animation="blink"
                        type="rect"
                      />
                      <span v-else> {{ cpayment.payment }} </span>
                    </td>
                    <td class="text-left">
                      <q-skeleton
                        v-if="cloading"
                        animation="blink"
                        type="rect"
                      />
                      <span v-else> {{ new Date().toDateString() }} </span>
                    </td>
                  </tr>
                </template>
              </tbody>
            </q-markup-table>
            <template>
              <p class="text-info text-center q-ma-sm">
                zero campaign payment history 🙄
              </p>
            </template>

            <div
              class="q-pa-lg flex flex-center"
              v-if="cpayments.data.length > 0"
            >
              <q-pagination
                @input="fetchcPayment"
                v-model="ccurrent"
                :max="cmax"
                input
                input-class="text-orange-10"
              />
            </div>
          </div>
        </template>
      </q-tab-panel>
    </q-tab-panels>
  </q-card>
</template>

<script>
export default {
  data() {
    return {
      tab: 'ep',
      ecurrent: 1,
      ccurrent: 1,
      eloading: false,
      cloading: false,
      epayments: null,
      cpayments: null,
      emax: 0,
      cmax: 0
    }
  },
  async created() {
    this.eloading = true
    this.cloading = true

    const collection = await this.fetchEveryThing()
    console.log('created', collection)
    this.epayments = collection[0].data
    this.emax = Math.ceil(
      this.epayments.meta.total / this.epayments.meta.per_page
    )
    this.cpayments = collection[1].data
    this.cmax = Math.ceil(
      this.cpayments.meta.total / this.cpayments.meta.per_page
    )
    console.log('nnnnnnn', this.epayments, this.emax, this.cpayments, this.cmax)
    setTimeout(() => {
      this.eloading = false
      this.cloading = false
    }, 5000)
  },
  methods: {
    async fetchEarningPayment(url = null) {
      if (url == null) url = 'payments/earning_payments'
      return await this.$api.get(url)
    },
    async fetchCampaignPayment(url = null) {
      if (url == null) url = 'payments/campaign_payment'
      return await this.$api.get(url)
    },
    async fetchEveryThing(url = null) {
      const epayments = this.fetchEarningPayment(url)
      const cpayments = this.fetchCampaignPayment(url)
      return await Promise.all([epayments, cpayments])
    },
    async fetchePayment(value) {
      this.ecurrent = value
      this.eloading = true
      const url = `payments/earning_payments?page=${this.current}`
      const response = await this.fetchEarningPayment(url)
      this.epayments = response.data
      console.log('pagination', this.epayments)
      setTimeout(() => {
        this.eloading = false
      }, 5000)
    },
    async fetchcPayment() {
      this.cloading = true
      const url = `payments/campaign_payment?page=${this.ccurrent}`
      const response = await this.fetchCampaignPayment(url)
      this.cpayments = response.data
      console.log('pagination', this.cpayments)
      setTimeout(() => {
        this.cloading = false
      }, 5000)
    }
  }
}
</script>
