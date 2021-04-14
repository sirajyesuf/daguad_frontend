<template>
  <div class="column">
    <div class="col">
      <v-calendar class="float-right" @apply="apply"></v-calendar>
    </div>
    <div class="col">
      <q-markup-table flat>
        <thead>
          <tr>
            <th class="text-left">#</th>
            <th class="text-left">Channel</th>
            <th class="text-left">Number Posts</th>
            <th class="text-left">Earning</th>
          </tr>
        </thead>
        <tbody>
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
                {{ value.name }}
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
              <span v-else>
                {{ value.earning }}
              </span>
            </td>
          </tr>
        </tbody>
      </q-markup-table>
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
    console.log('created earning')
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
          setTimeout(() => {
            this.loading = false
          }, 5000)
        })
    },
    async apply(range) {
      this.loading = true
      this.fetchUserEarning(range)
    }
  },
  components: {
    'v-calendar': require('components/datepicker.vue').default
  }
}
</script>
