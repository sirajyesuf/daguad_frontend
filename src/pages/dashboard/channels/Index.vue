<template>
  <div>
    <div class="q-my-md">
      <q-form @submit.prevent="submit">
        <div class="row q-gutter-x-md">
          <div class="col-8">
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
          </div>
          <div class="col">
            <q-btn label="Submit" type="submit" class="q-mx-md" color="primary">
              <template v-slot:loading>
                <q-spinner-facebook />
              </template>
            </q-btn>
          </div>
        </div>
      </q-form>
    </div>

    <q-markup-table flat>
      <thead>
        <tr>
          <th colspan="7">
            <div class="row no-wrap items-center">
              <div class="text-h5 q-ml-md text-secondary">Channels</div>
            </div>
          </th>
        </tr>
        <tr>
          <th class="text-left">#</th>
          <th class="text-left">Name</th>
          <th class="text-left">Category</th>
          <th class="text-center">Avgview/day</th>
          <th class="text-center">Subscribers</th>
          <th class="text-center">Status</th>
          <th class="text-center">Actions</th>
        </tr>
      </thead>
      <tbody class="">
        <tr v-for="(channel, index) in channels" :key="channel.id">
          <td class="text-left">
            {{ index + 1 }}
          </td>
          <td class="text-left">
            <a
              :href="`https://t.me/${channel.username}`"
              target="_blank"
              class="text-secondary"
            >
              {{ channel.name }}
            </a>
          </td>
          <td class="text-center">
            {{
              channel.catagory !== null ? channel.catagory.name : 'not assigned'
            }}
          </td>
          <td class="text-center">1000</td>
          <td class="text-center">
            {{ channel.total_subscribers }}
          </td>

          <td class="text-center">pending</td>

          <td class="text-center">
            <q-btn
              color="negative"
              icon-right="delete"
              no-caps
              flat
              dense
              @click="deleteChannel(channel.id)"
            />
            <q-btn
              color="positive"
              icon-right="details"
              no-caps
              flat
              dense
              :to="{ name: 'channel_post_history', params: { id: channel.id } }"
            />
          </td>
        </tr>
      </tbody>
    </q-markup-table>
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
