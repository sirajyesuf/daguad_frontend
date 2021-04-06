<template>
  <div class="column" v-if="!loading">
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
            <th class="text-left">Post</th>
            <th class="text-right">View</th>
            <th class="text-right">Earning</th>
            <th class="text-right">Date</th>
            <th class="text-right">Status</th>
          </tr>
        </thead>
        <tbody>
          <template>
            <tr v-for="post in posts" :key="post.id">
              <td class="text-left">tikvah</td>
              <td class="text-right">{{ post.view }}</td>
              <td class="text-right">{{ post.earning }}</td>

              <td class="text-right">
                {{ new Date(post.posted_date).toLocaleDateString() }}
              </td>
              <td class="text-right">1</td>
            </tr>
          </template>
          <template v-if="false">
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
  }
}
</script>
