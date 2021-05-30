<template>
  <div class="q-pa-md">
    <q-btn
      flat
      :no-caps="true"
      label="Return To List"
      color="orange"
      icon="fas fa-list"
      :to="{ name: 'campaign_list' }"
    ></q-btn>
    <h6 class="text-orange q-mb-xs">
      <i class="fas fa-ad"></i>
      Add Campaign
    </h6>
    <q-separator color="orange"></q-separator>
    <campaign-form
      :message.sync="newcampaign.message"
      :starting_date.sync="newcampaign.starting_date"
      @submit="submit"
      @changetobase64="changetobase64"
      :photo="newcampaign.photo"
      :base64photo="base64photo"
      :loading="loading"
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
      <add-campaign-preview
        view="mobile"
        :message="newcampaign.message"
        :photo="base64photo"
      ></add-campaign-preview>
    </q-dialog>
  </div>
</template>
<script>
export default {
  data() {
    return {
      dialog: false,
      maximizedToggle: true,
      loading: false,
      newcampaign: {
        photo: null,
        message: '',
        starting_date: new Date().toLocaleDateString('fr-CA', {
          year: 'numeric',
          month: '2-digit',
          day: '2-digit'
        })
      },
      base64photo: null
    }
  },

  created() {
    this.$store.commit('common/update', false)

    this.$store.dispatch('catagory/getCatagories')
  },
  methods: {
    async submit(payload) {
      try {
        this.loading = true
        const base64photo = this.uploadedphoto()
        var x = {
          ...base64photo,
          message: this.newcampaign.message,
          ...payload,
          starting_date: this.newcampaign.starting_date
        }
        const response = await this.$store.dispatch('campaign/addcampaign', x)
        this.$store.commit('campaign/addcampaign', response.data)
        await this.$router.push({
          name: 'campaign_payment',
          params: { id: response.data.id }
        })
        console.log('response', response.data)
        this.$q.notify({
          type: 'positive',
          message: 'the campaign is successfully created.please pay here.'
        })
      } catch (error) {
        console.log('errrrr', error)
      } finally {
        setTimeout(() => {
          this.loading = false
        }, 4000)
      }
    },
    changetobase64(photo) {
      this.newcampaign.photo = photo

      if (photo) {
        const reader = new FileReader()
        reader.onload = (event) => {
          this.base64photo = event.target.result
        }
        reader.readAsDataURL(this.newcampaign.photo)
      } else {
        this.base64photo = null
      }
    },
    uploadedphoto() {
      console.log('base64', this.base64photo)
      if (this.base64photo) {
        return {
          image_1: this.base64photo
        }
      }
    }
  },
  computed: {
    // ...mapState('campaign', ['campaigns']),
    // ...mapState('catagory', ['catagories', 'selectedcatagories']),
    // ...mapState('packages', ['selected_package', 'days', 'packages']),
    // ...mapGetters('catagory', ['ischannelcatagoryselected']),
    // ...mapGetters('packages', ['getselectedpackage']),
    // previewimage() {
    //   if (this.newcampaign.photo.length === 0) return ''
    //   else return URL.createObjectURL(this.newcampaign.photo[0])
    // }
  },
  components: {
    'campaign-form': require('components/campaign/CampaignForm.vue').default,
    'add-campaign-preview': require('src/components/campaign/AddCampaignPreview.vue')
      .default
  }
}
</script>

<style scoped>
.preview {
  width: 260px;
}
</style>
