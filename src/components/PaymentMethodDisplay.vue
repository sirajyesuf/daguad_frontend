<template>
  <div>
    <div class="row q-col-gutter-xs q-mb-xl">
      <div
        class="col-xs-6 col-sm-6 col-md-3"
        v-for="payment in paymentmethods"
        :key="payment.id"
      >
        <q-avatar
          square
          size="90px"
          :class="{ selectedpayment: payment.selected }"
          @click="selectedPaymentMethod(payment)"
        >
          <img class="paymet" :src="payment.logo_path | paymentImagepath" />
        </q-avatar>
      </div>
    </div>
    <form
      @submit.prevent.stop="onSubmit"
      class="q-gutter-md"
      v-if="userpaymtd !== null"
    >
      <q-input
        ref="holder_name"
        outlined
        dense
        v-model="userpaymtd.payment_holder_name"
        label="Full Name"
        hint="Full Name"
        lazy-rules
        :rules="[
          (val) => (val && val.length > 0) || 'Please Enter your full name'
        ]"
      />

      <q-input
        ref="identification_number"
        outlined
        dense
        v-model="userpaymtd.payment_holder_id"
        :label="
          userpaymtd.type === 'bank' ? ' Account Number' : ' Phone Number'
        "
        :hint="userpaymtd.type === 'bank' ? ' Account Number' : ' Phone Number'"
        lazy-rules
        :rules="[(val) => (val && val.length > 0) || 'this field is required ']"
      />

      <div>
        <q-btn
          :label="update ? 'Update' : 'Submit'"
          type="submit"
          color="primary"
        />
      </div>
    </form>
  </div>
</template>
<script>
export default {
  props: ['paymentmethods', 'userpaymentmethod'],
  data() {
    return {
      userpaymtd: null,
      update: false
    }
  },
  created() {
    this.paymentmethods.forEach((ele) => {
      if (ele.selected) {
        this.userpaymtd = ele
        this.update = true
      }
    })
  },
  methods: {
    selectedPaymentMethod(payment) {
      this.paymentmethods.forEach((element) => {
        if (element.id === payment.id) {
          element.selected = true
        } else {
          element.selected = false
        }
      })
      this.userpaymtd = payment
    },
    async getselectedpaymentmethod() {
      return {
        payment_method_id: this.userpaymtd.id,
        identification_number: this.userpaymtd.payment_holder_id,
        holder_name: this.userpaymtd.payment_holder_name
      }
    },
    async onSubmit() {
      this.$refs.identification_number.validate()
      this.$refs.holder_name.validate()
      if (
        !this.$refs.identification_number.hasError &&
        !this.$refs.holder_name.hasError
      ) {
        const paymentmethod = await this.getselectedpaymentmethod()
        if (this.update)
          await this.storeUserPaymentMethod(
            paymentmethod,
            'payments/update_payment_method'
          )
        else {
          await this.storeUserPaymentMethod(
            paymentmethod,
            'payments/add_payment_method'
          )
        }
      }
    },
    async storeUserPaymentMethod(paymentmtd, url) {
      try {
        await this.$api.post(url, paymentmtd)
        alert('succes')
      } catch (error) {
        alert('error')
      }
    }
  },
  computed: {}
}
</script>
<style scoped>
.selectedpayment {
  border: 5px solid green;
}
</style>
