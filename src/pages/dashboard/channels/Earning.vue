<template>
  <div>
    <channel-navigation routename="list_channel"></channel-navigation>

    <q-separator color="orange"></q-separator>
    <div class="column">
      <div class="col">
        <v-calendar class="float-right" @apply="apply"></v-calendar>
      </div>
      <div class="col">
        <q-markup-table flat separator="cell" bordered>
          <thead>
            <tr>
              <th colspan="7">
                <div class="row no-wrap items-center">
                  <div class="text-h5 q-ml-md text-secondary">Earning</div>
                </div>
              </th>
            </tr>
            <tr>
              <th class="text-left">#</th>
              <th class="text-left"><i class="fas fa-bullhorn"></i>Channel</th>
              <th class="text-left">Number Posts</th>
              <th class="text-left">Earning</th>
            </tr>
          </thead>
          <tbody>
            <template v-if="Object.keys(data).length">
              <tr v-for="(value, index) in data" :key="value.id">
                <td class="text-left">
                  <q-skeleton
                    v-if="loading"
                    animation="pulse-x"
                    type="text"
                    width="80px"
                    height="20px"
                  />
                  <span v-else>
                    {{ index + 1 }}
                  </span>
                </td>
                <td class="text-left">
                  <q-skeleton
                    v-if="loading"
                    animation="pulse-x"
                    type="text"
                    width="80px"
                    height="20px"
                  />
                  <span v-else>
                    <a
                      :href="`https://t.me/${value.username}`"
                      target="_blank"
                      class="text-secondary"
                    >
                      {{ value.name }}
                    </a>
                  </span>
                </td>
                <td class="text-left">
                  <q-skeleton
                    v-if="loading"
                    animation="pulse-x"
                    type="text"
                    width="80px"
                    height="20px"
                  />
                  <span v-else>
                    {{ value.number_of_posts }}
                  </span>
                </td>
                <td class="text-left">
                  <q-skeleton
                    v-if="loading"
                    animation="pulse-x"
                    type="text"
                    width="80px"
                    height="20px"
                  />
                  <span v-else> {{ value.earning }} ETB</span>
                </td>
              </tr>
            </template>
          </tbody>
        </q-markup-table>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      loading: false,
      data: null
    }
  },
  async created() {
    await this.fetchUserEarning()
  },
  methods: {
    async fetchUserEarning(range = null) {
      this.loading = true
      if (range === null)
        range = {
          initial_date: new Date().toISOString(),
          final_date: new Date().toISOString()
        }
      await this.$api
        .post('channels/earning', range)
        .then((res) => {
          this.data = res.data
        })
        .finally(() => {
          this.loading = false
        })
    },
    async apply(range) {
      await this.fetchUserEarning(range)
    }
  },
  components: {
    'v-calendar': require('components/datepicker.vue').default,
    'channel-navigation': require('components/partitions/ChannelNavigation.vue')
      .default
  }
}
</script>
