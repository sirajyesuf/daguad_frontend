<template>
  <div>
    <template>
      <div class="row">
        <div class="col-8 q-mt-xl">
          <q-markup-table flat>
            <thead>
              <tr>
                <th class="text-right">Channel</th>
                <th class="text-right">View</th>
                <th class="text-right">Date</th>
                <th class="text-right">Status</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="post in history.posts" :key="post.id">
                <td class="text-right">
                  <a
                    :href="`https://t.me/${post.channel_username}/${post.message_id}`"
                  >
                    tikvah Ethiopia</a
                  >
                </td>
                <td class="text-right">1000</td>
                <td class="text-right">24/3/09</td>
                <td class="text-right">active</td>
              </tr>
            </tbody>
          </q-markup-table>
        </div>
        <q-space></q-space>
        <div class="col-3 q-mb-xl" style="max-width: 300px">
          <q-select
            outlined
            v-model="day"
            :options="history.days"
            @input="selectedchange"
            label="filter by date"
            class="text-primary"
          />
        </div>
      </div>
    </template>
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  data() {
    return {
      campaignId: this.$route.params.id,
      day: ''
    }
  },
  created() {
    const payload = {
      campaignId: this.campaignId
    }
    this.$store.dispatch('campaign/fetchcampaignhistory', payload)
  },
  methods: {
    selectedchange(val) {
      console.log('ccccccccc', val)
      const payload = {
        campaignId: this.campaignId,
        date: val
      }
      console.log(payload)
      this.$store.dispatch('campaign/fetchcampaignhistory', payload)
    }
  },
  computed: {
    ...mapState('campaign', ['history'])
    // day1: {
    //   get() {
    //     return this.$store.state.campaign.history.day[0]
    //   },
    //   set(val) {
    //     console.log(val)
    //     this.$store.commit('campaign/day', val)

    //     const payload = {
    //       campaignId: this.campaignId,
    //       date: val
    //     }
    //     console.log(payload)
    //     this.$store.dispatch('campaign/fetchcampaignhistory', payload)
    //   }
    // }
  }
}
</script>
<style scoped>
.mystyle {
  overflow: auto;
}
</style>
