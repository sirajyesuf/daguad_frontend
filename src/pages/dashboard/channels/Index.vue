<template>
  <div>
    <q-btn
      flat
      color="orange"
      push
      :no-caps="true"
      icon-right="fas fa-plus-circle"
      label="Add Channel"
      :to="{ name: 'add_channel' }"
      class="on-right"
    />
    <q-separator color="orange" class="q-mt-mb"></q-separator>
    <q-markup-table flat separator="cell" bordered class="q-mt-xl">
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
          <th class="text-left">Name <i class="fas fa-bullhorn"></i></th>
          <th class="text-left">Catagory <i class="fas fa-folder"></i></th>
          <th class="text-center">Avgview/day <i class="far fa-eye"></i></th>
          <th class="text-center">Subscribers <i class="fas fa-heart"></i></th>
          <th class="text-center">
            Status <i class="fas fa-battery-three-quarters"></i>
          </th>
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
          <td class="text-left">
            <template v-if="channel.catagory !== null">
              {{ channel.catagory.name }}
            </template>
            <template v-else>
              <i class="fas fa-clock"></i>
              wait for assiging
            </template>
          </td>
          <td class="text-center">1000</td>
          <td class="text-center">
            {{ channel.total_subscribers }}
          </td>

          <td class="text-center">pending</td>

          <td class="text-center">
            <div>
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
                icon-right="fas fa-history"
                no-caps
                flat
                dense
                :to="{
                  name: 'channel_post_history',
                  params: { id: channel.id }
                }"
              >
                <q-tooltip> channel post history </q-tooltip>
              </q-btn>
            </div>
          </td>
        </tr>
      </tbody>
    </q-markup-table>
    <div class="q-pa-lg flex flex-center">
      <q-pagination @input="atInput" :max="max" :value="current" input />
    </div>
  </div>
</template>
<script>
import { mapGetters } from 'vuex'

export default {
  data() {
    return {
      current: 1,
      max: 1
    }
  },
  async created() {
    this.$store.commit('common/update', true)
    const response = await this.$store.dispatch('channel/fetchChannels')
    console.log('list of channel', response)
    this.config(response)
  },
  methods: {
    config(response) {
      this.max = Math.ceil(
        response.data.meta.total / response.data.meta.per_page
      )
    },
    async atInput(value) {
      this.current = value
      const response = await this.$store.dispatch('channel/fetchChannels')
      this.config(response)
    }
  },

  computed: {
    ...mapGetters('channel', ['channels'])
  }
}
</script>
