<template>
  <div>
    <channel-navigation routename="list_channel"></channel-navigation>
    <q-separator color="orange"></q-separator>
    <div class="column">
      <div class="q-ma-md note row">
        <p class="text-center q-pa-md text-weight-bold text-info">
          To add your channel to Daguad platform, follow the instructions below:
        </p>
      </div>
      <q-list class="col-6">
        <q-item>
          <q-item-section>
            <p class="">1.Go to your channel's settings in Telegram.</p>
          </q-item-section>
        </q-item>

        <q-item>
          <q-item-section
            ><p>2.Open its list of administrators.</p>
          </q-item-section>
        </q-item>
        <q-item>
          <q-item-section>
            <p>3.Click on «Add Administrator» button.</p>
          </q-item-section>
        </q-item>
        <q-item>
          <q-item-section>
            <p>
              4.Find our bot using search field
              <q-btn
                size="12px"
                color="grey-4"
                text-color="black"
                no-caps
                unelevated
                label="@dagu_ad"
                @click="copytoclibboard"
              />

              and promote it to an administrator.
            </p>
          </q-item-section>
        </q-item>
        <q-item>
          <q-item-section>
            <p>
              5. By default our bot is allowed to send messages,
              <span class="text-red">do not turn off that.</span>
            </p>
            <img src="3.png" class="img q-py-xl" />
          </q-item-section>
        </q-item>
        <q-item>
          <q-item-section>
            <p>6. Enter your channel's username.</p>
          </q-item-section>
        </q-item>
        <q-item>
          <q-item-section>
            <q-form @submit.prevent="submit" class="q-gutter-md">
              <q-input
                placeholder="channel username"
                ref="channel_username"
                clearable
                dense
                outlined
                v-model="username"
                :rules="[
                  (val) => !!val || 'the channel username field is required'
                ]"
                :error="error"
                :error-message="error_message"
              ></q-input>
              <q-btn
                :loading="loading"
                label="Add Channel"
                :no-caps="true"
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
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import { copyToClipboard } from 'quasar'
export default {
  data() {
    return {
      loading: false,
      username: null,
      error: false,
      error_message: ''
    }
  },
  created() {},
  methods: {
    ...mapActions('channel', ['addChannel']),
    async submit() {
      try {
        this.loading = true
        await this.addChannel('@' + this.username)
        this.$router.push({ name: 'list_channel' })
        this.$q.notify({
          type: 'positive',
          message: 'the channel is successfully created.wait for the approval.'
        })
      } catch (error) {
        if (error.response.status === 422) {
          this.error = true
          this.error_message = error.response.data.errors.username[0]
        }
      } finally {
        setTimeout(() => {
          this.loading = false
        }, 4000)
      }
    },

    copytoclibboard() {
      copyToClipboard('@dagu_ad').then(() => {
        this.$q.notify({
          position: 'center',
          message: 'the user name is copy to the clip board',
          timeout: '2000'
        })
      })
    }
  },

  computed: {
    ...mapGetters('channel', ['channels'])
  },
  components: {
    'channel-navigation': require('components/partitions/ChannelNavigation.vue')
      .default
  }
}
</script>

<style scoped>
.img {
  width: 386px;
  height: 523px;
}
.note {
  border-left-color: orange;
  border-left-style: solid;
  border-left-width: 4px;
  box-sizing: border-box;
}
</style>
