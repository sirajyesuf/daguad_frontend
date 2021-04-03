<template>
  <div>
    <div class="q-ma-md select-paymet">
      <p class="text-center q-pa-md text-black text-weight-bold">
        please select the payment method to pay for your campaign
      </p>
    </div>
    <div class="row">
      <div
        class="col-xs-6 col-sm-6 col-md-3"
        v-for="paymet in paymentmethods"
        :key="paymet.id"
      >
        <q-avatar square size="100px" class="shadow-3">
          <img
            class="paymet"
            :src="paymet.logo_path"
            @click="selectedpaymet(paymet.id)"
          />
        </q-avatar>
      </div>
    </div>
    <div class="q-mt-xl">
      <div class="q-ma-md select-paymet">
        <p class="text-center q-pa-md text-black text-weight-bold">
          pay ETB {{ campaign.total_amount }} only.
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
              <q-btn label="verify" type="submit" color="primary" />
            </div>
          </q-form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapState } from 'vuex'
export default {
  data() {
    return {
      error: false,
      error_message: '',
      tn: ''
    }
  },
  created() {
    // get the campaign detail
    this.$store.dispatch('payment/campaign', this.$route.params.id)
    // the payment detail
    this.$store.dispatch('payment/paymentmethod')
  },

  methods: {
    selectedpaymet(paymetId) {
      console.log(paymetId)
      this.$store.commit('payment/selectedpaymet', paymetId)
    },
    submit() {
      const payload = {
        payment_method_id: this.selected_payment_method.id,
        ref_or_phone: Number(this.tn),
        advert_id: this.$store.state.payment.campaign.id
      }
      this.$store
        .dispatch('payment/paymentverification', payload)
        .then((res) => {
          this.$q.notify({
            type: 'positive',
            message: 'the payment is successfully verified'
          })
        })
        .catch((err) => {
          console.log('say error ', err.response.data.error)
          this.error = true
          this.error_message = err.response.data.error
          this.$q.notify({
            type: 'info',
            message: `the campaign is allready paid.`
          })
        })
    }
  },
  computed: {
    ...mapState('payment', ['campaign']),
    ...mapGetters('payment', ['selected_payment_method']),
    campaign() {
      return this.$store.state.payment.campaign
    },
    paymentmethods() {
      return this.$store.state.payment.paymentmethods
    }
  }
}
</script>

<style scoped>
.select-paymet {
  border-left-color: hotpink;
  border-left-style: solid;
  border-left-width: 4px;
  box-sizing: border-box;
}
/* .paymet {
  border-left-color: darkorange;
  border-left-style: solid;
  border-left-width: 4px;
  box-sizing: border-box;
} */
</style>
