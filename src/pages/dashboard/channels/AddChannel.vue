<template>
  <div class="column items-center">
    <div class="col text-dark text-body1 q-pb-lg">
      To add your channel to DaguAd, follow the instructions below:
    </div>
    <q-list>
      <q-item>
        <q-item-section>
          1.Go to your channel's settings in Telegram.
        </q-item-section>
      </q-item>

      <q-item>
        <q-item-section> 2.Open its list of administrators. </q-item-section>
      </q-item>
      <q-item>
        <q-item-section>
          3.Click on «Add Administrator» button..
        </q-item-section>
      </q-item>
      <q-item>
        <q-item-section>
          4.Find our bot using search field @dagu_ad and promote it to an
          administrator.
        </q-item-section>
      </q-item>
      <q-item>
        <q-item-section>
          5. By default our bot is allowed to send messages, do not turn off
          that.
          <img src="3.png" class="img q-py-xl" />
        </q-item-section>
      </q-item>
      <q-item>
        <q-item-section>
          6. Enter your platform's @username, link or ID.
        </q-item-section>
      </q-item>
      <q-item>
        <q-item-section>
          <q-form @submit.prevent="submit">
            <q-input
              ref="channel_username"
              clearable
              dense
              outlined
              v-model="username"
              :loading="loading"
              @input="atinput"
              :rules="[
                (val) => !!val || 'the channel username field is required'
              ]"
              :error="error"
              :error-message="error_message"
            ></q-input>
            <q-btn
              label="Add channel"
              type="submit"
              class="q-mx-md"
              color="primary"
            >
              <template v-slot:loading>
                <q-spinner-facebook />
              </template>
            </q-btn>
          </q-form>
        </q-item-section>
      </q-item>
    </q-list>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
  data() {
    return {
      loading: false,
      username: 'channel_username',
      error: false,
      error_message: ''
    }
  },
  created() {
    this.$store
      .dispatch('channel/fetchChannels')
      .then((response) => console.log('res.data', response.data))
      .catch((error) => console.log(error))
  },
  methods: {
    ...mapActions('channel', ['addChannel']),
    submit() {
      this.loading = true
      this.addChannel('@' + this.username)
        .then(() => {
          this.$q.notify({
            type: 'positive',
            message:
              'the channel is successfully created.wait for the approval.'
          })
        })
        .catch((err) => {
          if (err.response.status === 422) {
            this.error = true
            this.error_message = err.response.data.errors.username[0]
          }
        })
        .finally(() => {
          this.loading = false
        })
    },

    deleteChannel(channelId) {
      this.$store
        .dispatch('channel/deleteChannel', channelId)
        .then((response) => {})
    },
    atinput() {
      this.error = false
      this.error_message = ''
    }
  },

  computed: {
    ...mapGetters('channel', ['channels'])
  }
}
</script>

<style scoped>
.img {
  width: 386px;
  height: 523px;
}
</style>
