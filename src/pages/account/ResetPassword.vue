<template>
  <q-page>
    <q-card
      flat
      dark
      class="my-card fixed-center"
      :class="{ login: $q.screen.gt.sm, 'login-mobile': $q.screen.lt.md }"
    >
      <q-card-section class="bg-cyan-8 text-center text-h6">
        Reset Password
        <div class="text-subtitle2">Enter Here Your New Password</div>
      </q-card-section>

      <q-card-section class="bg-white">
        <p v-if="invalid_token" class="text-red">invalid token</p>
        <form class="q-px-sm q-pt-xl q-pb-lg" @submit.prevent="submit">
          <password-input
            ref="password_input"
            :password.sync="reset.password"
            lable="new password"
          ></password-input>
          <q-btn
            unelevated
            color="primary"
            label="Reset Password"
            class="q-mt-md shadow-2"
            type="submit"
            :loading="loading"
          >
          </q-btn>
        </form>
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
      invalid_token: false,
      reset: {
        email: this.$route.query.email,
        password: null,
        token: this.$route.query.token
      }
    }
  },
  methods: {
    ...mapActions('user', ['resetpassword']),

    clear($event) {
      this.reset.email = null
    },
    async submit() {
      this.$refs.password_input.$refs.password.validate()
      if (!this.$refs.password_input.$refs.password.hasError) {
        try {
          this.loading = true
          this.reset.password_confirmation = this.reset.password
          await this.resetpassword(this.reset)
          this.$router.push({ path: 'signin' })
        } catch (error) {
          this.invalid_token = true
        } finally {
          this.loading = false
        }
      }
    }
  },
  computed: {
    token() {
      return this.$route.params.token
    }
  },
  components: {
    'password-input': require('components/account/common/PasswordInputField.vue')
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
</style>
