<template>
  <div>
    <channel-navigation routename="list_channel"></channel-navigation>

    <q-separator color="orange"></q-separator>
    <div class="column" v-if="!loading">
      <div class="col">
        <q-select
          outlined
          style="width: 200px"
          v-model="day"
          :options="days"
          label="filter by date"
          class="text-primary q-mt-sm"
        />
      </div>
      <div class="col">
        <q-markup-table flat separator="cell" bordered class="q-mt-sm">
          <thead>
            <tr>
              <th colspan="7">
                <div class="row no-wrap items-center">
                  <div class="text-h5 q-ml-md text-secondary">
                    Channel Post History
                  </div>
                </div>
              </th>
            </tr>
            <tr>
              <th class="text-left">Post</th>
              <th class="text-left">View <i class="far fa-eye"></i></th>
              <th class="text-left">
                Earning <i class="fas fa-dollar-sign"></i>
              </th>
              <th class="text-left">
                Date <i class="fas fa-calendar-week"></i>
              </th>
              <th class="text-left">
                Status <i class="fas fa-battery-three-quarters"></i>
              </th>
            </tr>
          </thead>
          <tbody>
            <template v-if="posts.length > 0">
              <tr v-for="post in posts" :key="post.id">
                <td class="text-left">tikvah</td>
                <td class="text-left">{{ post.view }}</td>
                <td class="text-left">{{ post.earning }} ETB</td>

                <td class="text-left">
                  {{ new Date(post.posted_date).toDateString() }}
                </td>
                <td class="text-left">Active</td>
              </tr>
            </template>
          </tbody>
        </q-markup-table>
        <template v-if="posts.length === 0">
          <p class="text-info text-center q-ma-sm">
            zero post is posted in this channel 🙄
          </p>
        </template>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      loading: false,
      channel: null,
      day: 'All',
      days: []
    }
  },
  async created() {
    await this.fetchChannel()
  },
  methods: {
    async fetchChannel() {
      this.loading = true
      await this.$api
        .get(`channels/${this.$route.params.id}`)
        .then((res) => {
          this.channel = res.data
          this.preparedays()
        })
        .finally(() => (this.loading = false))
    },
    preparedays() {
      this.day = 'All'
      this.days.push('All')
      this.channel.posts.forEach((element) => {
        this.days.push(new Date(element.posted_date).toLocaleDateString())
      })

      this.days = [...new Set(this.days)]
    }
  },
  computed: {
    posts() {
      console.log('gg', this.channel)
      if (this.day === 'All') return this.channel.posts
      return this.channel.posts.filter((post) => {
        return new Date(post.posted_date).toLocaleDateString() === this.day
      })
    }
  },
  components: {
    'channel-navigation': require('components/partitions/ChannelNavigation.vue')
      .default
  }
}
</script>
