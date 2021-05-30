<template>
  <div>
    <div class="q-gutter-y-md">
      <q-option-group
        v-model="panel"
        color="orange"
        inline
        class="text-secondary no-shadow"
        :options="[
          { label: 'ChangePassword', value: 'changepwd' },
          { label: 'Payment Method', value: 'paymentmtd' }
        ]"
      />

      <q-tab-panels v-model="panel" animated class="no-shadow rounded-borders">
        <q-tab-panel name="notification">
          <div class="text-h6 text-grey">Notification</div>
          <div class="q-mt-mb">
            <q-toggle
              icon="mail"
              label="send to me notification via telegram bot"
              v-model="toggle"
            />
            <p class="text-purple text-center">
              <a
                :href="`https://t.me/ethio?start=${verification_link}`"
                target="_blank"
                rel="noopener noreferrer"
                v-if="toggle"
              >
                please click here
              </a>
            </p>
          </div>
        </q-tab-panel>

        <q-tab-panel name="changepwd">
          <div class="text-h6 text-grey">Change Password</div>
          <span class="text-red text-center" v-if="error">
            The Given Password Is Invalid</span
          >
          <q-form @submit.prevent.stop="onSubmit" class="q-gutter-md">
            <password-input
              :password.sync="change_password.current_password"
              lable="old password"
              ref="old_password"
            ></password-input>
            <password-input
              :password.sync="change_password.new_password"
              lable="new password"
              ref="current_password"
            ></password-input>

            <div>
              <q-btn flat label="Submit" type="submit" color="primary" />
            </div>
          </q-form>
        </q-tab-panel>

        <q-tab-panel name="paymentmtd">
          <div class="text-h6 text-grey">Payment Method</div>
          <display-payment-method
            :paymentmethods="paymentmethods"
            :userpaymentmethod="userpaymentmethod"
            @store="storeUserPaymentMethod"
          ></display-payment-method>
        </q-tab-panel>
      </q-tab-panels>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      panel: 'changepwd',
      tab: 'mails',
      splitterModel: 20,
      toggle: false,
      error: false,
      verification_link: null,
      paymentmethods: [],
      change_password: {
        current_password: null,
        new_password: null
      },
      userpaymentmethod: null
    }
  },
  watch: {
    toggle: function (newval, oldval) {
      if (newval) {
        this.getTelegramNotificationVerificationLink().then(({ data }) => {
          this.verification_link = data
        })
      }
    }
  },
  async created() {
    this.userpaymentmethod = await this.fetchUserPaymetMethod()
    const paymentmtds = await this.fetchListOfUserPaymentMethods()
    await this.configPaymentMethods(paymentmtds.data, this.userpaymentmethod)
  },
  methods: {
    async getTelegramNotificationVerificationLink() {
      return await this.$api.get(
        'settings/telegram_notification_verification_link'
      )
    },
    async configPaymentMethods(paymentmethods, userpaymentmethod) {
      this.paymentmethods = []
      paymentmethods.forEach((element) => {
        if (userpaymentmethod === null) {
          Object.assign(element, { selected: false })
        } else {
          if (userpaymentmethod.payment_method_id === element.id) {
            Object.assign(element, { selected: true })
          } else {
            Object.assign(element, { selected: false })
          }
        }

        this.paymentmethods.push(element)
      })
    },
    async fetchListOfUserPaymentMethods() {
      return await this.$api.get('campaigns/list_of_payment_method')
    },
    async fetchUserPaymetMethod() {
      const response = await this.$api.get('payments/user_paymet_method')
      return response.data.data.paymentmethod
    },
    onSubmit() {
      this.$refs.current_password.$refs.password.validate()
      this.$refs.old_password.$refs.password.validate()
      if (
        this.$refs.current_password.$refs.password.hasError ||
        this.$refs.old_password.$refs.password.hasError
      ) {
      } else {
        this.$api
          .put('profile/change_password', this.change_password)
          .then(() => {
            this.$q.notify({
              type: 'positive',
              message: 'the password is changed successfully.'
            })
          })
          .catch(() => {
            this.error = true
          })
      }
    },
    async storeUserPaymentMethod(paymentmtd) {
      try {
        const userpaymentmethod = await this.$api.post(
          'payments/add_payment_method',
          paymentmtd
        )
        this.configPaymentMethods(this.paymentmethods, userpaymentmethod.data)
        alert('succes')
      } catch (error) {
        alert('error')
      }
    }
  },
  components: {
    'password-input': require('components/account/common/PasswordInputField.vue')
      .default,
    'display-payment-method': require('components/PaymentMethodDisplay.vue')
      .default
  }
}
</script>
