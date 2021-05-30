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
          @click="
            selectedPaymentMethod(
              payment.id === userpaymentmethod.user_id
                ? userpaymentmethod
                : payment,
              userpaymentmethod.user_id === payment.id ? true : false
            )
          "
        >
          <img class="paymet" :src="payment.logo_path" />
        </q-avatar>
      </div>
    </div>
    <form @submit.prevent.stop="onSubmit" class="q-gutter-md">
      <q-input
        ref="holder_name"
        outlined
        dense
        v-model="userpaymtd.holder_name"
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
        v-model="userpaymtd.identification_number"
        :label="
          userpaymtd.type === 'bank' ? ' Account Number' : ' Phone Number'
        "
        :hint="userpaymtd.type === 'bank' ? ' Account Number' : ' Phone Number'"
        lazy-rules
        :rules="[(val) => (val && val.length > 0) || 'this field is required ']"
      />

      <div>
        <q-btn label="Save" type="submit" color="primary" />
      </div>

      {{ userpaymtd }}
    </form>
  </div>
</template>
<script>
export default {
  props: ['paymentmethods', 'userpaymentmethod'],
  data() {
    return {
      userpaymtd: {
        id: null,
        type: null,
        holder_name: null,
        identification_number: null
      }
    }
  },
  created() {
    console.log(this.userpaymentmethod)
    console.log(this.paymentmethods)
    this.selectedPaymentMethod(
      this.userpaymentmethod || this.paymentmethods[0],
      !!this.userpaymentmethod
    )
  },
  methods: {
    selectedPaymentMethod(payment, user = false) {
      console.log(payment, user)
      if (user) {
        this.userpaymtd.holder_name = payment.holder_name
        this.userpaymtd.identification_number = payment.identification_number
      }
      if (!user) {
        this.userpaymtd.holder_name = null
        this.userpaymtd.identification_number = null
      }

      this.paymentmethods.forEach((element) => {
        if (element.id === payment.id) {
          this.userpaymtd.id = element.id
          this.userpaymtd.type = element.type
          element.selected = true
        } else {
          element.selected = false
        }
      })
    },
    async getselectedpaymentmethod() {
      return {
        payment_method_id: this.userpaymtd.id,
        identification_number: this.userpaymtd.identification_number,
        holder_name: this.userpaymtd.holder_name
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
        this.$emit('store', paymentmethod)
      }
    }
  },
  computed: {}
}
</script>
<style scoped>
.selectedpayment {
  border-color: red;
  border-width: 1px;
  border-style: solid;
}
</style>
// payment_method_id // identification_number // holder_name
