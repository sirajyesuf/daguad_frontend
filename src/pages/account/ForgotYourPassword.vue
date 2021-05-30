<template>
  <q-page>
    <q-card
      flat
      dark
      class="fixed-center"
      :class="{ login: $q.screen.gt.sm, 'login-mobile': $q.screen.lt.md }"
    >
      <q-card-section class="bg-cyan-8 text-center text-h6">
        Forgot Password
        <div class="text-subtitle2">
          No problem! Enter your email below and we will send you an email with
          instruction to reset your password.
        </div>
      </q-card-section>

      <q-card-section class="bg-white">
        <form class="q-px-sm q-pt-xl q-pb-lg" @submit.prevent="submit">
          <p v-if="reset_link_sent" class="text-primary">
            send successfully.check your email
          </p>
          <p v-if="invalid_user" class="text-red">Invalid Email</p>
          <email-input
            ref="email_input"
            :email.sync="email"
            @clear="clear"
          ></email-input>

          <q-btn
            :loading="loading"
            unelevated
            color="secondary"
            label="Send Reset Link"
            class="q-mt-md shadow-2"
            type="submit"
          />
        </form>
        <q-card-section class="text-black">
          Back to
          <router-link to="signin" class="text-secondary deco">
            Login
          </router-link>
        </q-card-section>
      </q-card-section>
    </q-card>
  </q-page>
</template>

<script>
import { mapActions } from 'vuex'
export default {
  data() {
    return {
      loading: false,
      email: '',
      reset_link_sent: false,
      invalid_user: false
    }
  },
  methods: {
    ...mapActions('user', ['forgotpassword']),
    async submit() {
      if (this.validate()) {
        try {
          this.loading = true
          await this.forgotpassword(this.email)
          this.reset_link_sent = true
          this.showNotif()
        } catch (err) {
          if (err.response.status === 404) {
            this.invalid_user = true
          }
        } finally {
          this.loading = false
        }
      }
    },
    clear() {
      this.reset_link_sent = false
      this.invalid_user = false
      this.email = null
    },
    validate() {
      this.$refs.email_input.$refs.email.validate()
      if (this.$refs.email_input.$refs.email.hasError) {
        this.formHasError = true
        return 0
      } else {
        return 1
      }
    },
    showNotif() {
      this.$q.notify({
        message:
          'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Hic quisquam non ad sit assumenda consequuntur esse inventore officia. Corrupti reiciendis impedit vel, fugit odit quisquam quae porro exercitationem eveniet quasi.',
        color: 'primary',
        multiLine: true
      })
    }
  },
  components: {
    'email-input': require('components/account/common/EmailInputField.vue')
      .default
  }
}
</script>

<style scoped>
.login {
  width: 400px;
}
.login-mobile {
  width: 330px;
}
.deco {
  text-decoration-line: none;
}
</style>
