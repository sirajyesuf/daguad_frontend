<template>
  <q-form @submit.prevent.stop="submit">
    <q-input
      ref="uploadphoto"
      v-show="false"
      :value="photo || campaign.images[0].path"
      :rules="[photoValidatorRule]"
    ></q-input>
    <q-input
      v-show="false"
      :value="campaign.message"
      :rules="[editorRule]"
    ></q-input>
    <q-select
      ref="selectedcatagories"
      v-show="false"
      :value="selectedcatagories"
      multiple
      :options="catagories"
      :rules="[catagoryvalidation]"
    />
    <q-input
      ref="selectedpackage"
      v-show="false"
      :value="selected_package"
      outlined
      :rules="[selectedpackagevalidation]"
    ></q-input>
    <q-stepper
      vertical
      flat
      v-model="step"
      ref="stepper"
      color="primary"
      animated
      header-nav
    >
      <!-- responsive -->
      <div :class="{ row: $q.screen.gt.sm ? true : false }">
        <div class="col-8">
          <q-step
            :name="1"
            title="upload Photo"
            icon="insert_photo"
            :done="errors.upload_photo_err === 1"
            :error="errors.upload_photo_err === 0"
          >
            <q-file
              name="photo"
              dense
              outlined
              counter
              use-chips
              :value="photo"
              @input="$emit('update:photo', $event)"
              accept="image/*"
            >
              <template v-slot:prepend>
                <q-icon name="attach_file" />
              </template>
            </q-file>
            <span class="text-red" v-show="errors.upload_photo_err === 0">
              {{ errors_msg.upload_photo_err_msg }}
            </span>

            <steeper-navigation
              :step="step"
              @stepchange="stepchange"
            ></steeper-navigation>
          </q-step>
          <q-step
            :name="2"
            title="Description"
            icon="note"
            :done="errors.editor_err === 1"
            :error="errors.editor_err === 0"
          >
            <div class="row q-gutter-md">
              <div class="col">
                <q-editor
                  ref="editor"
                  v-model="campaign.message"
                  min-height="5rem"
                  :toolbar="[
                    ['bold', 'italic', 'strike', 'underline', 'link'],
                    ['undo', 'redo']
                  ]"
                />
                <span class="text-red" v-show="errors.editor_err === 0">
                  {{ errors.editor_err }}
                  {{ errors_msg.editor_err_msg }}
                </span>
                <p>{{ campaign.message.length }}</p>
              </div>
            </div>

            <steeper-navigation
              :step="step"
              @stepchange="stepchange"
            ></steeper-navigation>
          </q-step>
        </div>
        <div class="col q-mt-xl" v-show="step < 3">
          <edit-campaign-preview
            class="gt-sm"
            view="desktop"
            :photo="
              base64photo !== null ? base64photo : campaign.images[0].path
            "
            :message="campaign.message"
            @removephoto="$emit('removephoto')"
          ></edit-campaign-preview>
        </div>
      </div>
      <!-- responsive -->
      <q-step
        :name="3"
        title="Catagories"
        icon="build"
        :done="errors.catagory_err === 1"
        :error="errors.catagory_err === 0"
      >
        <q-banner
          inline-actions
          class="text-white bg-red"
          v-if="errors.catagory_err === 0"
        >
          {{ errors_msg.catagory_err_msg }}
        </q-banner>
        <div class="row">
          <div
            class="col-sm-6 col-md-4"
            v-for="catagory in catagories.slice(0, seemore_catagory)"
            :key="catagory.title"
          >
            <category-selection-step
              :catagory="catagory"
              @catagoryselected="$emit('catagoryselected', catagory.id)"
            ></category-selection-step>
          </div>
        </div>
        <q-btn
          v-show="seemore_catagory !== catagories.length"
          flat
          color="primary"
          label="see more"
          @click="seemore_catagory += 2"
        ></q-btn>
        <steeper-navigation
          :step="step"
          @stepchange="stepchange"
        ></steeper-navigation>
      </q-step>

      <q-step
        :name="4"
        title="Package"
        icon="add"
        :done="errors.package_err === 1 || errors.selected_package_err === 1"
        :error="errors.package_err === 0 || errors.selected_package_err === 0"
      >
        <package-list
          :days="days"
          :packages="packages"
          :selected_package="selected_package"
          @selectedpackage="selectedpackage"
        >
        </package-list>

        <div v-if="errors.package_err === 0" class="q-ma-mb">
          <q-banner inline-actions rounded class="bg-white text-red no-shadow">
            {{ errors_msg.package_err_msg }}
          </q-banner>
        </div>
        <div
          v-if="
            errors.selected_package_err === 0 &&
            Object.keys(this.packages).length !== 0
          "
          class="q-ma-mb"
        >
          <q-banner inline-actions rounded class="bg-white text-red no-shadow">
            {{ errors_msg.selected_package_err_msg }}
          </q-banner>
        </div>

        <steeper-navigation
          :step="step"
          @stepchange="stepchange"
        ></steeper-navigation>
      </q-step>

      <q-step
        :name="5"
        title="starting date"
        icon="add_comment"
        :done="errors.starting_date_err === 1"
        :error="errors.starting_date_err === 0"
      >
        <q-input
          dense
          v-model="campaign.starting_date"
          mask="date"
          :rules="[dateValidation]"
        >
          <template v-slot:append>
            <q-icon name="event" class="cursor-pointer">
              <q-popup-proxy
                ref="qDateProxy"
                transition-show="scale"
                transition-hide="scale"
              >
                <q-date minimal v-model="campaign.starting_date">
                  <div class="row items-center justify-end">
                    <q-btn v-close-popup label="Close" color="primary" flat />
                  </div>
                </q-date>
              </q-popup-proxy>
            </q-icon>
          </template>
        </q-input>
        <span class="text-red" v-show="errors.starting_date_err === 0">
          {{ errors_msg.starting_date_err_msg }}
        </span>
        <steeper-navigation
          type="update"
          :step="step"
          @stepchange="stepchange"
        ></steeper-navigation>
      </q-step>
    </q-stepper>
  </q-form>
</template>

<script>
export default {
  props: [
    'campaign',
    'photo',
    'catagories',
    'packages',
    'days',
    'selected_package',
    'selectedcatagories',
    'base64photo'
  ],
  data() {
    return {
      tab: null,
      step: 1,
      seemore_catagory: 4,
      errors_msg: {
        upload_photo_err_msg: null,
        editor_err_msg: null,
        catagory_err_msg: null,
        package_err_msg: null,
        starting_date_err_msg: null,
        selected_package_err_msg: null
      },
      errors: {
        upload_photo_err: 0,
        editor_err: null,
        catagory_err: null,
        package_err: null,
        starting_date_err: null,
        selected_package_err: null
      },
      package_id: null
    }
  },
  created() {
    this.errors.upload_photo_err = 1
    this.errors.editor_err = 1
    this.errors.package_err = 1
    this.errors.catagory_err = 1
    this.errors.starting_date_err = 1
  },
  watch: {
    step: function (newval, oldval) {
      console.log('watch: newval,oldval', newval, oldval)
      if (newval === 4) {
        this.packageValidation()
        // this.selectedpackagevalidation(this.selected_package)
      }
    }
  },
  methods: {
    photoValidatorRule(photo) {
      if (!photo) {
        this.errors_msg.upload_photo_err_msg = 'the field is required'
        this.errors.upload_photo_err = 0
      } else {
        this.errors.upload_photo_err = 1
        this.errors_msg.upload_photo_err_msg = null
        return true
      }
      return false
    },
    editorRule(val) {
      if (!val.length) {
        this.errors_msg.editor_err_msg = 'Required'
        this.errors.editor_err = 0
      } else if (val.length > 300) {
        this.errors_msg.editor_err_msg =
          'the content must be lessthan 300 character'
        this.errors.editor_err = 0
      } else if (val.length < 20) {
        this.errors_msg.editor_err_msg =
          'the content must be morethan 20 character'
        this.errors.editor_err = 0
      } else {
        this.errors_msg.editor_err_msg = null
        this.errors.editor_err = 1
        return true
      }
      return false
    },
    catagoryvalidation(value) {
      if (this.selectedcatagories.length === 0) {
        this.errors.catagory_err = 0
        this.errors_msg.catagory_err_msg = 'selecte atleast one catagory'
      } else {
        this.errors.catagory_err = 1
        this.errors_msg.catagory_err_msg = null
      }
    },
    selectedpackagevalidation(value) {
      if (!value) {
        this.errors.selected_package_err = 0
        this.errors_msg.selected_package_err_msg =
          'selecte package for campaign'
      } else {
        this.errors.selected_package_err = 1
        this.errors_msg.selected_package_err_msg = null
        return true
      }
      return false
    },
    packageValidation() {
      if (this.selectedcatagories.length === 0) {
        this.errors.package_err = 0
        this.errors_msg.package_err_msg = `
            you have to selecte at least one channel catagory to selecte your
            package`
      } else if (
        !this.displayPackage() &&
        this.selectedcatagories.length !== 0
      ) {
        this.errors.package_err = 0
        this.errors_msg.package_err_msg = ` there is no package under the selected catagories please change the
            catagories to get packages`
      } else if (this.displayPackage()) {
        if (this.package_id !== 0) {
          this.errors_msg.package_err_msg = null
          this.errors.package_err = 1
          return true
        }
      } else return true
      return false
    },
    dateValidation(value) {
      if (!value) {
        this.errors.starting_date_err = 0
        this.errors_msg.starting_date_err_msg = 'Required'
      } else if (new Date(value) < new Date()) {
        this.errors.starting_date_err = 0
        this.errors_msg.starting_date_err_msg =
          'the starting date should be after now'
      } else {
        this.errors.starting_date_err = 1
        this.errors_msg.starting_date_err_msg = null
        return true
      }
      return false
    },

    // async atuploadphoto(photo) {
    //   this.photo = photo
    //   await this.changetobase64()
    // },
    // async changetobase64() {
    //   if (this.photo) {
    //     const reader = new FileReader()
    //     reader.onload = (event) => {
    //       this.base64photo = event.target.result
    //       this.$emit('base64photo', this.base64photo)
    //     }
    //     reader.readAsDataURL(this.photo)
    //   } else {
    //     this.base64photo = null
    //     this.$emit('base64photo', this.base64photo)
    //   }
    // },
    stepchange(wht) {
      if (wht === 'add') {
        this.step++
      }
      if (wht === 'sub') {
        this.step--
      }
    },
    async getbase64photo() {
      if (this.base64photo !== null) return { image_1: this.base64photo }
    },
    formatStartingDate(date) {
      var d = new Date(date),
        month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear()

      if (month.length < 2) month = '0' + month
      if (day.length < 2) day = '0' + day

      return [year, month, day].join('/')
    },
    displayPackage() {
      return Object.keys(this.packages).length > 0 || false
    },
    selectedpackage(dayname, packageId) {
      const payload = {
        dayname: dayname,
        packageid: packageId
      }
      this.$emit('selectedpackage', payload)
    },

    async submit() {
      // if (this.package_id === null) this.errors.package_err = true
      // if (this.message === '') this.errors.editor_err = true
      // if (this.message !== '' && this.package_id !== null) this.$emit('submit')
      console.log(
        'submit',
        this.packageValidation(),
        this.photoValidatorRule(this.photo || this.campaign.images[0].path),

        this.editorRule(this.campaign.message),
        this.dateValidation(this.campaign.starting_date)
      )
      const image1 = (await this.getbase64photo()) || 0
      const updatedcampaign = {
        ...image1,
        message: this.campaign.message,
        package_id: this.selected_package.packageid,
        catagory_id: this.selectedcatagories,
        starting_date: this.formatStartingDate(this.campaign.starting_date)
      }
      console.log('updatecampaign', updatedcampaign)
      if (
        this.packageValidation() &&
        this.photoValidatorRule(this.photo || this.campaign.images[0].path) &&
        this.editorRule(this.campaign.message) &&
        this.dateValidation(this.campaign.starting_date)
      ) {
        const response = await this.$api.post(
          `/campaigns/edit_campaign/${this.campaign.id}`,
          updatedcampaign,
          {
            params: {
              delete_original: this.campaign.images[0].path === ''
            }
          }
        )
        await this.$router.push({
          name: 'campaign_payment',
          params: { id: response.data.id }
        })
        this.$q.notify({
          type: 'positive',
          message: 'the campaign is successfully updated.please pay here.'
        })
        console.log('response of update', response)
      }
    }
  },
  components: {
    'package-list': require('components/campaign/Package.vue').default,
    'category-selection-step': require('components/campaign/Category.vue')
      .default,
    'steeper-navigation': require('components/campaign/SteeperNavigation.vue')
      .default,
    'edit-campaign-preview': require('src/components/campaign/EditCampaignPreview.vue')
      .default
  }
}
</script>
<style scoped></style>
