<template>
  <q-page class="window-height window-width row justify-around items-center">
    <div>
      <h2 class="text-weight-bold q-my-xs">daguad</h2>
      <p class="text-weight-light text-center">
        Lorem, ipsum dolor sit amet consectetur adipisicing elit. Asperiores ex
      </p>
    </div>
    <div>
      <q-card
        flat
        dark
        square
        :class="{ login: $q.screen.gt.sm, 'login-mobile': $q.screen.lt.md }"
      >
        <q-card-section class="bg-cyan-8 text-center text-h6">
          Login
        </q-card-section>

        <q-card-section class="bg-white">
          <form class="q-px-sm q-pt-xl q-pb-lg" @submit.prevent="submit">
            <p v-if="fail" class="text-red">
              Invalid email or password. Please try again.
            </p>
            <email-input
              ref="email_input"
              :email.sync="login.email"
              @clear="clear"
            ></email-input>

            <password-input
              ref="password_input"
              :password.sync="login.password"
            ></password-input>
            <div class="row">
              <!-- <div class="col">
                <q-toggle
                  v-model="login.remember"
                  color="green"
                  label="remember me"
                />
              </div> -->
              <div class="col">
                <router-link to="forgot_password">
                  Forgot password?</router-link
                >
              </div>
            </div>
            <div>
              <q-btn
                color="secondary"
                type="submit"
                class="q-mt-sm"
                :loading="loading"
                >Sign In</q-btn
              >
            </div>
          </form>
        </q-card-section>
        <q-card-actions align="around" class="bg-white">
          <span class="text-black text-caption text-muted"
            >Don't have an account?</span
          >
          <q-btn
            flat
            outline
            rounded
            to="signup"
            color="black"
            :no-caps="true"
            label="Sign Up"
          ></q-btn>
        </q-card-actions>
      </q-card>
    </div>
  </q-page>
</template>
<script>
import { mapActions } from 'vuex'
export default {
  data() {
    return {
      fail: false,
      loading: false,
      login: {
        email: null,
        password: null,
        remember: false
      }
    }
  },
  methods: {
    ...mapActions('user', ['signin']),
    async submit() {
      if (this.validate()) {
        try {
          this.loading = true
          await this.$store.dispatch('user/signin', this.login)
          const redirectpath = this.$route.query.redirect || '/dashboard'
          this.$router.push(redirectpath)
        } catch (error) {
          this.fail = true
        } finally {
          this.loading = false
        }
      }
    },
    validate() {
      this.$refs.email_input.$refs.email.validate()
      this.$refs.password_input.$refs.password.validate()
      if (
        this.$refs.email_input.$refs.email.hasError ||
        this.$refs.password_input.$refs.password.hasError
      ) {
        this.formHasError = true
        return 0
      } else {
        return 1
      }
    },
    clear() {
      this.login.email = null
    }
  },

  components: {
    'email-input': require('components/account/common/EmailInputField.vue')
      .default,
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
h2 {
  color: #1877f2;
}
</style>
