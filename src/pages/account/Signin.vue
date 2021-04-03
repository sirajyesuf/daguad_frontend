<template>
  <q-page class="window-height window-width row justify-around items-center">
    <div>
      <h2 class="text-weight-bold q-my-md">daguad</h2>
      <p class="text-weight-light">
        Lorem, ipsum dolor sit amet consectetur adipisicing elit. Asperiores ex
      </p>
    </div>
    <div>
      <q-card
        flat
        dark
        square
        class="my-card bg-white"
        style="width: 500px; height: 485px"
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
            <div class="col">
              <div class="row">
                <q-toggle
                  v-model="login.remember"
                  label="Remember me"
                  class="text-black"
                  color="green"
                />
              </div>
              <div class="row">
                <q-btn
                  color="secondary"
                  type="submit"
                  class="q-mt-sm"
                  :loading="loading"
                  >Sign In</q-btn
                >
              </div>
              <!-- <p class="text-red">{{ login }}</p> -->
            </div>
          </form>
        </q-card-section>
        <q-card-actions align="around" class="bg-white">
          <q-btn
            flat
            outline
            rounded
            to="signup"
            color="primary"
            label="create new account"
          ></q-btn>
          <q-btn
            flat
            outline
            rounded
            color="primary"
            to="forgot_password"
            label="Forgot your password?"
          />
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
    submit() {
      if (this.validate()) {
        return new Promise((resolve, reject) => {
          this.loading = true
          this.signin(this.login)
            .then((res) => {
              this.loading = false
              const redirectpath = this.$route.query.redirect || '/dashboard'
              this.$router.push(redirectpath)
            })
            .catch((err) => {
              if (err.response.status === 401) {
                this.loading = false
                this.fail = true
              }
            })
        })
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
.my-card {
  width: 100%;
  max-width: 500px;
}
h2 {
  color: #1877f2;
}
</style>
