<template>
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
      <q-markup-table flat>
        <thead>
          <tr>
            <th class="text-left">Channel</th>
            <th class="text-right">View</th>
            <th class="text-right">Date</th>
            <th class="text-right">Status</th>
          </tr>
        </thead>
        <tbody>
          <template v-if="posts.length">
            <tr v-for="post in posts" :key="post.key">
              <td class="text-left">
                <a
                  :href="`https://t.me/${post.channel.username}/${post.message_id}`"
                >
                  {{ post.channel.name }}</a
                >
                <q-skeleton v-if="loading" animation="blink" type="text" />
              </td>
              <td class="text-right">
                {{ post.view }}
                <q-skeleton v-if="loading" animation="blink" type="text" />
              </td>
              <td class="text-right">
                {{ new Date(post.posted_date).toLocaleDateString() }}
                <q-skeleton v-if="loading" animation="blink" type="text" />
              </td>
              <td class="text-right">
                {{ post.active_status }}
                <q-skeleton v-if="loading" animation="blink" type="text" />
              </td>
            </tr>
          </template>
          <template v-else>
            <span>Empty</span>
          </template>
        </tbody>
      </q-markup-table>
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
  }
}
</script>
<style scoped>
.mystyle {
  overflow: auto;
}
</style>

// 'fr-CA', { // year: 'numeric', // month: '2-digit', // day: '2-digit' // }
