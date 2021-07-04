<template>
  <div>
    <channel-navigation routename="campaign_list"></channel-navigation>
    <q-separator color="orange"></q-separator>
    <div>
      <div class="q-ma-md note">
        <p class="text-left q-pa-md text-weight-bold text-info">
          pay the money using in one of the following options and enter the
          transaction number to verify.
          <br />
          <router-link
            class="text-primary"
            :to="{ name: 'campaign-detail', params: { id: campaign.id } }"
          >
            see the campaign detail
          </router-link>
        </p>
      </div>
      <div class="row q-col-gutter-sm q-ma-sm">
        <div
          class="col-xs-6 col-sm-4 col-md-3"
          v-for="payment in paymentmethods"
          :key="payment.id"
        >
          <q-avatar square size="100px" class="shadow-3">
            <img
              :src="payment.logo_path | paymentImagepath"
              class="paymet"
              @click="selectedpaymet(payment.id)"
              alt="payment method logo"
            />
          </q-avatar>
        </div>
      </div>
      <div class="q-mt-xl">
        <div class="q-ma-md note">
          <p class="text-left q-pa-md text-pink text-weight-bold">
            pay ETB {{ campaign.package.total_amount }} only.
          </p>
        </div>
        <div v-if="selected_payment_method" class="q-ma-xl" id="content">
          <q-list>
            <q-item clickable v-ripple>
              <q-item-section avatar>
                <q-icon color="primary" name="person" />
              </q-item-section>

              <q-item-section>{{
                selected_payment_method.payment_holder_name
              }}</q-item-section>
            </q-item>
            <q-item clickable v-ripple>
              <q-item-section avatar>
                <q-icon
                  color="primary"
                  :name="
                    selected_payment_method.type === 'bank'
                      ? 'account_balance'
                      : 'call'
                  "
                />
              </q-item-section>

              <q-item-section>{{
                selected_payment_method.payment_holder_id
              }}</q-item-section>
            </q-item>
          </q-list>
          <div class="q-pa-md" style="max-width: 400px">
            <q-form class="q-gutter-md" @submit.prevent="submit">
              <q-input
                clearable
                autofocus
                outlined
                dense
                v-model="tn"
                :error="error"
                :error-message="error_message"
                :rules="[(val) => !!val || '*Required']"
              />
              <div>
                <q-btn
                  :loading="loading"
                  label="Verify"
                  :no-caps="true"
                  type="submit"
                  class="q-mx-md"
                  color="primary"
                >
                  <template v-slot:loading>
                    <q-spinner-facebook />
                  </template>
                </q-btn>
              </div>
            </q-form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  data() {
    return {
      loading: false,
      error: false,
      error_message: '',
      tn: '',
      campaign: null
    }
  },
  async created() {
    this.fetchcampaign()
  },

  methods: {
    async fetchcampaign() {
      await this.$api.get(`campaigns/${this.$route.params.id}`).then((res) => {
        console.log('cam', res)
        this.campaign = res.data
      })
      await this.$store.dispatch('payment/paymentmethod')
    },
    selectedpaymet(paymetId) {
      this.$store.commit('payment/selectedpaymet', paymetId)
      this.tn = ''
    },
    async submit() {
      try {
        this.loading = true
        const payload = {
          payment_method_id: this.selected_payment_method.id,
          ref_or_phone: this.tn,
          advert_id: this.campaign.id
        }
        await this.$api.post('campaigns/verify_payment', payload)
        this.$store.commit('campaign/updateCampaign', this.campaign.id)
        await this.$router.push({ name: 'campaign_list' })
        this.$q.notify({
          type: 'positive',
          message: 'the payment is successfully verified'
        })
      } catch (error) {
        this.$q.notify({
          type: 'negative',
          message: `${error.response.data.error}`
        })
      } finally {
        this.loading = false
      }
    }
  },
  computed: {
    ...mapGetters('payment', ['selected_payment_method', 'paymentmethods'])
  },
  components: {
    'channel-navigation': require('components/partitions/ChannelNavigation.vue')
      .default
  }
}
</script>

<style scoped>
.note {
  border-left-color: black;
  border-left-style: solid;
  border-left-width: 4px;
  box-sizing: border-box;
}
</style>
