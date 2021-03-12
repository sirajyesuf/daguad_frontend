<template>
  <q-page>
    <q-card flat dark class="my-card fixed-center">
      <q-card-section class="bg-cyan-8 text-center text-h6">
        Forgot Password
        <div class="text-subtitle2">
          No problem! Enter your email below and we will send you an email with
          instruction to reset your password.
        </div>
      </q-card-section>

      <q-card-section class="bg-white">
        <form class="q-px-sm q-pt-xl q-pb-lg" @submit.prevent="submit">
          <p v-if="reset_link_sent" class="text-primary">send successfully</p>
          <p v-if="invalid_user" class="text-red">invalid email</p>
          <p v-if="tomanyrequest" class="text-red">to many request</p>
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
          <!-- <pre class="text-red">
 
            {{ email }}
            {{ loading }}
          </pre> -->
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
      email: 'sirajyesuf762@gmail.com',
      reset_link_sent: false,
      invalid_user: false,
      tomanyrequest: false
    }
  },
  methods: {
    ...mapActions('user', ['forgotpassword']),
    submit() {
      if (this.validate()) {
        return new Promise((resolve, reject) => {
          this.loading = true
          this.forgotpassword(this.email)
            .then((res) => {
              // this.reset_link_sent = true
              this.loading = false
              this.showNotif()
            })
            .catch((err) => {
              if (err.response.status === 404) {
                this.invalid_user = true
              }
              if (err.response.status === 429) {
                this.tomanyrequest = true
              }
              this.loading = false
            })
        })
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
.my-card {
  width: 100%;
  max-width: 500px;
}
.deco {
  text-decoration-line: none;
}
</style>
