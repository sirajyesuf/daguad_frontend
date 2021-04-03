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
        class="bg-white"
        style="width: 500px; height: 485px"
      >
        <q-card-section class="bg-cyan">
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
            <!-- 
            <pre class="text-red">
            {{ newuser }}
            {{ servererrors }}
          </pre -->
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
        email: 'siraj@gmail.com',
        name: 'siraj yesuf',
        password: '123456'
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
    submit() {
      this.$refs.email_input.$refs.email.validate()
      this.$refs.fullname.$refs.textinput.validate()
      this.$refs.password_input.$refs.password.validate()
      if (
        this.$refs.fullname.$refs.textinput.hasError ||
        this.$refs.email_input.$refs.email.hasError ||
        this.$refs.password_input.$refs.password.hasError
      ) {
        this.formHasError = true
      } else {
        return new Promise((resolve, reject) => {
          this.loading = true
          this.signup(this.newuser)
            .then((res) => {
              this.loading = false
              this.$router.push({ path: '/dashboard' })
            })
            .catch((err) => {
              console.log('signup', err.response.data)
              this.servererrors.email.msg = err.response.data.errors.email[0]
              this.servererrors.email.err = true
              this.loading = false
              console.log('server error', this.servererrors)
            })
        })
      }
    },
    clear() {
      this.servererrors.email.err = false
      this.servererrors.email.msg = null
      this.newuser.email = null
    },
    clearname() {
      this.newuser.fullname = null
    }
  },
  computed: {},
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
h2 {
  color: #1877f2;
}
</style>
