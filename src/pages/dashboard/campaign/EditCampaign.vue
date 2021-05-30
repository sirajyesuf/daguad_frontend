<template>
  <div v-if="!loading">
    <div class="row">
      <div class="text-h6 col-xs-6 col-sm-6 col-md-6">
        <i class="fas fa-pencil-alt"></i>
        Editing Campaign
      </div>
      <div class="col-xs-6 col-sm-6 col-md-6 q-gutter-x-sm">
        <q-btn
          flat
          :no-caps="true"
          label="Re Publishe"
          color="secondary"
          icon="fas fa-recycle"
        ></q-btn>
        <q-btn
          flat
          :no-caps="true"
          label="Return To List"
          color="orange"
          icon="fas fa-list"
          :to="{ name: 'campaign_list' }"
        ></q-btn>
      </div>
    </div>

    <q-separator class="q-my-xs"></q-separator>
    <campaign-form :photos="campaign.images"> ></campaign-form>
  </div>
</template>
<script>
export default {
  beforeDestroy() {
    this.$root.$off('delete:photo', (index) => {})
  },
  data() {
    return {
      loading: true,
      catagories: [],
      selected_catagories: [],
      campaign: null,
      packages: [],
      days: [],
      selected_package: null,
      newphotos: []
    }
  },
  async created() {
    await this.fetchEveryThing()
    this.$root.$on('delete:photo', (index) => {
      this.campaign.images.splice(index, 1)
    })
  },
  methods: {
    async selectedPackage(payload) {
      console.log('honer')
      console.log(this.packages)
      console.log(this.packages[payload.dayname])
      this.packages[payload.dayname].forEach((pack) => {
        if (pack.id === payload.packageid) {
          pack.selected = !pack.selected
          this.days.forEach((day) => {
            if (day.name !== payload.dayname) {
              console.log('sjk', day)
              if (pack.selected === true) {
                day.disablestatus = true
              } else {
                day.disablestatus = false
              }
            }
          })
        } else {
          pack.selected = false
        }
      })
      this.selected_package = payload.packageid
    },
    async prepareCampaignPackage(payload) {
      const x = {}
      for (const [key, value] of Object.entries(payload)) {
        console.log('day=>', key)
        value.forEach((pack) => {
          if (pack.id === this.campaign.package.id) {
            x.dayname = key
            x.packageid = pack.id
          }
          Object.assign(pack, { selected: false })
        })
      }
      this.packages = payload
      for (const i in this.packages) {
        const y = {
          disablestatus: false,
          name: i
        }
        this.days.push(y)
      }
      return x
    },
    async fetchPackage() {
      const campaignpackages = await this.$api.get('campaigns/packages', {
        params: {
          catagory_id: this.selected_catagories
        }
      })
      return campaignpackages.data
    },
    async fetchEveryThing() {
      this.loading = true
      const response = await this.$api.get(`campaigns/${this.$route.params.id}`)
      const catagories = await this.$api.get('channels/channel_catagory')
      this.campaign = response.data
      console.log('cam catagories', this.campaign.catagories)
      this.campaign.catagories.forEach((catagory) => {
        this.selected_catagories.push(catagory.id)
      })
      catagories.data.forEach((catagory) => {
        console.log(this.selected_catagories.includes(catagory.id))
        if (this.selected_catagories.includes(catagory.id)) {
          this.catagories.push(Object.assign(catagory, { selected: true }))
        } else {
          this.catagories.push(Object.assign(catagory, { selected: false }))
        }
      })

      const packages = await this.fetchPackage()
      const x = await this.prepareCampaignPackage(packages)
      console.log('x', x)
      await this.selectedPackage(x)
      console.log(this.packages)
      console.log(this.days)
      this.loading = false
    },
    removeNewPhoto(index) {
      this.newphotos.splice(index, 1)
    },
    removeAllPhoto() {
      console.log('my emmit')
      this.campaign.images.splice(0)
    }
  },
  components: {
    'campaign-form': require('components/campaign/EditCampaignForm.vue').default
  }
}
</script>
