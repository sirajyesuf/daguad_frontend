<template>
  <div class="q-pa-md">
    <!-- links start -->
    <div class="row">
      <div class="text-h6 text-orange col-xs-12 col-sm-12 col-md-10">
        <i class="fas fa-pencil-alt"></i>
        Editing Campaign
      </div>
      <div class="col-xs-12 col-sm-12 col-md-2">
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
    <!-- links end -->

    <q-separator class="q-my-xs"></q-separator>
    <campaign-form
      ref="xxx"
      :campaign="campaign"
      :catagories="catagories"
      :packages="packages"
      :days="days"
      :photo.sync="photo"
      :base64photo="base64photo"
      :selected_package="selected_package"
      :selectedcatagories="selectedcatagories"
      @updatecampaign="updatecampaign"
      @removephoto="removephoto"
      @catagoryselected="catagoryselected"
      @selectedpackage="selectedpackage"
      @base64photo="updatebase64photo"
    ></campaign-form>
    <q-btn
      class="lt-md"
      style="width: 100%; heigth: 100%"
      outline
      label="Preview"
      :no-caps="true"
      size="16px"
      color="orange"
      @click="dialog = true"
    ></q-btn>
    <q-dialog
      v-model="dialog"
      :maximized="maximizedToggle"
      transition-show="slide-up"
      transition-hide="slide-down"
    >
      <edit-campaign-preview
        view="mobile"
        :photo="base64photo === null ? campaign.images[0].path : base64photo"
        :message="campaign.message"
        @removephoto="removephoto"
      ></edit-campaign-preview>
    </q-dialog>
  </div>
</template>
<script>
export default {
  data() {
    return {
      dialog: false,
      maximizedToggle: true,
      loading: true,
      catagories: [],
      selectedcatagories: [],
      campaign: null,
      packages: [],
      days: [],
      selected_package: null,
      base64photo: null,
      photo: null
    }
  },
  watch: {
    photo: function (newval, oldval) {
      this.changetobase64()
    }
  },
  async created() {
    await this.fetchEveryThing()
  },
  methods: {
    async changetobase64() {
      if (this.photo) {
        const reader = new FileReader()
        reader.onload = (event) => {
          this.base64photo = event.target.result
        }
        reader.readAsDataURL(this.photo)
      } else {
        this.base64photo = null
      }
    },
    removephoto() {
      if (this.photo && this.base64photo) {
        this.photo = null
        this.base64photo = null
      } else {
        this.campaign.images[0].path = ''
      }
    },
    updatebase64photo(base64photo) {
      this.base64photo = base64photo
    },

    updatecampaign(payload) {
      console.log('updatecampaign', payload)
      console.log(this.campaign[payload.key])
      this.campaign[payload.key] = payload.value
    },
    selectedpackage(payload) {
      this.packages[payload.dayname].forEach((pack) => {
        if (pack.id === payload.packageid) {
          if (pack.selected) {
            pack.selected = false
            this.selected_package = null
          } else {
            pack.selected = true
            this.selected_package = payload
          }

          this.days.forEach((day) => {
            if (day.name !== payload.dayname) {
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
    },
    async prepareCampaignPackage(payload) {
      this.packages = []
      this.days = []
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
          catagory_id: this.selectedcatagories
        }
      })
      return campaignpackages.data
    },
    async fetchEveryThing() {
      const response = await this.$api.get(`campaigns/${this.$route.params.id}`)
      const catagories = await this.$api.get('channels/channel_catagory')
      this.campaign = response.data
      // console.log('cam catagories', this.campaign.catagories)
      this.campaign.catagories.forEach((catagory) => {
        this.selectedcatagories.push(catagory.id)
      })
      catagories.data.forEach((catagory) => {
        console.log(this.selectedcatagories.includes(catagory.id))
        if (this.selectedcatagories.includes(catagory.id)) {
          this.catagories.push(Object.assign(catagory, { selected: true }))
        } else {
          this.catagories.push(Object.assign(catagory, { selected: false }))
        }
      })

      const packages = await this.fetchPackage()
      const x = await this.prepareCampaignPackage(packages)
      console.log('x', x)
      this.selected_package = x
      this.selectedpackage(x)
      console.log(this.packages)
      console.log(this.days)
    },
    removeoriginalphoto() {
      this.campaign.images[0].path = ''
    },
    async catagoryselected(catagoryId) {
      this.catagories.forEach((catagory) => {
        if (catagory.id === catagoryId) {
          catagory.selected = !catagory.selected
          if (this.selectedcatagories.includes(catagoryId)) {
            this.selectedcatagories.splice(
              this.selectedcatagories.indexOf(catagoryId),
              1
            )
          } else {
            this.selectedcatagories.push(catagoryId)
          }
        }
      })

      if (this.selectedcatagories.length === 0) {
        this.packages = []
        this.days = []
      } else {
        const packages = await this.fetchPackage()
        const x = await this.prepareCampaignPackage(packages)
        console.log('x', x)
        this.selected_package = x
        this.selectedpackage(x)
        console.log(this.packages)
        console.log(this.days)
      }
    }
  },
  components: {
    'campaign-form': require('components/campaign/newcampaigneditform.vue')
      .default,
    'edit-campaign-preview': require('src/components/campaign/EditCampaignPreview.vue')
      .default
  }
}
</script>

<style scoped>
.preview {
  width: 260px;
}
</style>
