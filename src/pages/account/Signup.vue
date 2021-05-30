<template>
  <q-page class="window-height window-width row justify-around items-center">
    <div>
      <h2 class="text-weight-bold q-my-md">daguad</h2>
      <p class="text-weight-light text-center">
        Lorem, ipsum dolor sit amet consectetur adipisicing elit. Asperiores ex
      </p>
    </div>
    <div>
      <q-card
        flat
        dark
        square
        class="bg-white"
        :class="{ login: $q.screen.gt.sm, 'login-mobile': $q.screen.lt.md }"
      >
        <q-card-section class="bg-cyan-8">
          <div class="text-h6 text-center">Sign Up</div>
        </q-card-section>
        <q-separator dark inset />
        <q-card-section>
          <form class="q-px-sm q-pt-xl q-pb-lg" @submit.prevent="submit">
            <text-input
              ref="fullname"
              :name.sync="newuser.name"
              @clearname="clearname"
            >
            </text-input>

            <email-input
              ref="email_input"
              :email.sync="newuser.email"
              :error="servererrors.email.err"
              :error_message="servererrors.email.msg"
              @servererroremail="servererrors.email.err = false"
              @clear="clear"
            ></email-input>

            <password-input
              ref="password_input"
              :password.sync="newuser.password"
            ></password-input>

            <q-btn
              color="secondary"
              type="submit"
              class="q-mt-sm"
              :loading="loading"
            >
              Sign Up
            </q-btn>
            <q-card-actions align="around" class="bg-white">
              <span class="text-black text-caption text-muted"
                >Already have an account ?</span
              >
              <q-btn
                flat
                outline
                rounded
                color="black"
                to="signin"
                label="Sign In"
              />
            </q-card-actions>

            >
          </form>
        </q-card-section>
      </q-card>
    </div>
  </q-page>
</template>
<script>
import { mapActions } from 'vuex'

export default {
  data() {
    return {
      loading: false,
      newuser: {
        email: '',
        name: '',
        password: ''
      },
      servererrors: {
        email: {
          msg: '',
          err: false
        }
      }
    }
  },
  methods: {
    ...mapActions('user', ['signup']),
    async submit() {
      if (this.validate()) {
        try {
          this.loading = true
          await this.signup(this.newuser)
          this.$router.push({ path: '/dashboard' })
        } catch (err) {
          this.servererrors.email.msg = err.response.data.errors.email[0]
          this.servererrors.email.err = true
        } finally {
          this.loading = false
        }
      }
    },
    clear() {
      this.servererrors.email.err = false
      this.servererrors.email.msg = null
      this.newuser.email = null
    },
    clearname() {
      this.newuser.name = ''
    },
    validate() {
      this.$refs.email_input.$refs.email.validate()
      this.$refs.fullname.$refs.textinput.validate()
      this.$refs.password_input.$refs.password.validate()
      if (
        this.$refs.email_input.$refs.email.hasError ||
        this.$refs.password_input.$refs.password.hasError ||
        this.$refs.fullname.$refs.textinput.hasError
      ) {
        this.formHasError = true
        return 0
      } else {
        return 1
      }
    }
  },
  components: {
    'email-input': require('components/account/common/EmailInputField.vue')
      .default,
    'password-input': require('components/account/common/PasswordInputField.vue')
      .default,
    'text-input': require('components/account/common/TextInputField.vue')
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
