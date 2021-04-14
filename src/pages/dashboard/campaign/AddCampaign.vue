<template>
  <div class="q-pa-md">
    <campaign-form
      :photos.sync="newcampaign.photos"
      :message.sync="newcampaign.message"
      :starting_date.sync="newcampaign.starting_date"
      @submit="submit"
      @changetobase64="getbase64photos"
    ></campaign-form>
  </div>
</template>
<script>
import { mapGetters, mapState } from 'vuex'
export default {
  data() {
    return {
      newcampaign: {
        photos: [],
        message: '',
        starting_date: new Date().toLocaleDateString('fr-CA', {
          year: 'numeric',
          month: '2-digit',
          day: '2-digit'
        })
      },
      base64photos: []
    }
  },

  created() {
    this.$store.dispatch('catagory/getCatagories')
  },
  methods: {
    submit(evt) {
      console.log('sub', this.newcampaign)
      const vv = this.uploadedphotos()
      var x = {
        ...vv,
        message: this.newcampaign.message,
        package_id: this.selected_package,
        starting_date: this.newcampaign.starting_date
      }
      this.$store.dispatch('campaign/addcampaign', x).then((res) => {
        this.$router.push({ name: 'campaign_payment', params: { id: 1 } })
      })
    },
    getbase64photos() {
      this.base64photos = []
      this.newcampaign.photos.forEach((file) => {
        const reader = new FileReader()
        reader.onload = (event) => {
          this.base64photos.push(event.target.result)
        }
        reader.readAsDataURL(file)
      })
    },
    uploadedphotos() {
      console.log('base64', this.base64photos)
      if (this.base64photos.length === 2) {
        return {
          image_1: this.base64photos[0],
          image_2: this.base64photos[1]
        }
      }
      if (this.base64photos.length === 1) {
        return { image_1: this.base64photos[0] }
      } else {
        return null
      }
    }
  },
  computed: {
    ...mapState('campaign', ['campaigns']),
    ...mapState('catagory', ['catagories', 'selectedcatagories']),
    ...mapState('packages', ['selected_package', 'days', 'packages']),
    ...mapGetters('catagory', ['ischannelcatagoryselected']),
    ...mapGetters('packages', ['getselectedpackage']),
    // photos: {
    //   get() {
    //     return this.$store.state.campaign.newcampaign.photos
    //   },
    //   set(val) {
    //     if (val !== null) {
    //       val.forEach((file) => {
    //         this.$store.commit('campaign/updateNewCampaign', {
    //           key: 'photos',
    //           value: file
    //         })
    //       })
    //     } else {
    //       this.$store.commit('campaign/updateNewCampaign', {
    //         key: 'all',
    //         value: val
    //       })
    //     }
    //   }
    // },
    // message: {
    //   get() {
    //     return this.$store.state.campaign.newcampaign.message
    //   },
    //   set(val) {
    //     this.$store.commit('campaign/updateNewCampaign', {
    //       key: 'message',
    //       value: val
    //     })
    //   }
    // },
    // starting_date: {
    //   get() {
    //     return this.$store.state.campaign.newcampaign.starting_date
    //   },
    //   set(val) {
    //     this.$store.commit('campaign/updateNewCampaign', {
    //       key: 'starting_date',
    //       value: val
    //     })
    //   }
    // },
    displayPackage() {
      return Object.keys(this.packages).length > 0 || false
    }
  },
  components: {
    // 'package-list': require('components/campaign/Package.vue').default,
    // 'category-selection-step': require('components/campaign/Category.vue')
    //   .default,
    // 'steeper-navigation': require('components/campaign/SteeperNavigation.vue')
    //   .default,
    'campaign-form': require('components/campaign/CampaignForm.vue').default
  }
}
</script>

<style scoped>
.my-card {
  width: 100%;
  max-width: 400px;
}
</style>
