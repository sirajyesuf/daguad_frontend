<template>
  <div>
    <channel-navigation routename="campaign_list"></channel-navigation>
    <q-separator color="orange" class="q-mb-sm"></q-separator>
    <div v-if="!loading" class="column">
      <div class="col">
        <q-select
          outlined
          style="width: 200px"
          v-model="day"
          :options="days"
          label="filter by date"
          class="text-primary float-right"
        />
      </div>
      <div class="col">
        <q-markup-table flat separator="cell" bordered class="q-mt-sm">
          <thead>
            <tr>
              <th colspan="7">
                <div class="row no-wrap items-center">
                  <div class="text-h5 q-ml-md text-secondary">
                    Campaign Post History
                  </div>
                </div>
              </th>
            </tr>
            <tr>
              <th class="text-left">Channel <i class="fas fa-bullhorn"></i></th>
              <th class="text-left">View <i class="far fa-eye"></i></th>
              <th class="text-left">
                Date <i class="fas fa-calendar-week"></i>
              </th>
              <th class="text-left">
                Status <i class="fas fa-battery-three-quarters"></i>
              </th>
            </tr>
          </thead>
          <tbody>
            <template v-if="posts.length">
              <tr v-for="post in posts" :key="post.key">
                <td class="text-left">
                  <a
                    class="text-primary"
                    :href="`https://t.me/${post.channel.username}/${post.message_id}`"
                  >
                    {{ post.channel.name }}</a
                  >
                  <q-skeleton v-if="loading" animation="blink" type="text" />
                </td>
                <td class="text-left">
                  {{ post.view }}
                  <q-skeleton v-if="loading" animation="blink" type="text" />
                </td>
                <td class="text-left">
                  {{ new Date(post.posted_date).toLocaleDateString() }}
                  <q-skeleton v-if="loading" animation="blink" type="text" />
                </td>
                <td class="text-left">
                  {{ post.active_status }}
                  <q-skeleton v-if="loading" animation="blink" type="text" />
                </td>
              </tr>
            </template>
          </tbody>
        </q-markup-table>
        <template v-if="posts.length === 0">
          <p class="text-info text-center q-ma-sm">
            zero post is posted for this campaign 🙄
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
      days: [],
      day: null,
      campaign: null,
      loading: false
    }
  },
  async created() {
    await this.fetchCampaing()
  },
  methods: {
    async fetchCampaing() {
      this.loading = true
      await this.$api
        .get(`campaigns/${this.$route.params.id}`)
        .then(({ data }) => {
          this.campaign = data
          this.getfilterdays()
        })
        .finally(() => (this.loading = false))
    },
    getfilterdays() {
      this.days.push('All')
      this.day = 'All'

      const startingDate = new Date(this.campaign.starting_date)
      this.days.push(startingDate.toLocaleDateString())

      const length = this.campaign.package.number_of_days

      for (let i = 1; i < length; i++) {
        this.days.push(
          new Date(
            startingDate.setDate(startingDate.getDate() + i)
          ).toLocaleDateString()
        )
      }
    }
  },
  computed: {
    posts() {
      if (this.day === 'All') return this.campaign.posts
      return this.campaign.posts.filter((post) => {
        return this.day === new Date(post.posted_date).toLocaleDateString()
      })
    }
  },
  components: {
    'channel-navigation': require('components/partitions/ChannelNavigation.vue')
      .default
  }
}
</script>
<style scoped>
.mystyle {
  overflow: auto;
}
</style>

// 'fr-CA', { // year: 'numeric', // month: '2-digit', // day: '2-digit' // }
