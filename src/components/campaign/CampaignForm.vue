<template>
  <q-form @submit.prevent.stop="onSubmit">
    <q-input
      ref="uploadphoto"
      v-show="false"
      :value="photo"
      :rules="[photoValidatorRule]"
    ></q-input>
    <q-input
      v-show="false"
      :value="message"
      :rules="[editorRule]"
      ref="message"
    ></q-input>
    <q-select
      ref="selectedcatagories"
      v-show="false"
      :value="selectedcatagories"
      :options="catagories"
      :rules="[catagoryvalidation]"
    />
    <q-input
      ref="selectedpackage"
      v-show="false"
      :value="selected_package"
      outlined
      :rules="[selectedpackagevalidation]"
    >
    </q-input>
    <q-stepper
      ref="stepper"
      vertical
      flat
      v-model="step"
      color="primary"
      animated
      header-nav
    >
      <!-- preview responsive  start -->

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
              :value="photo"
              @input="atphotoupload"
              outlined
              counter
              use-chips
              accept="image/*"
              label="Pick One Photo"
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
                  :value="message"
                  placeholder="the campaign content "
                  @input="$emit('update:message', $event)"
                  min-height="5rem"
                  :toolbar="[
                    ['bold', 'italic', 'strike', 'underline', 'link'],
                    ['undo', 'redo']
                  ]"
                />

                <span class="text-red" v-show="errors.editor_err === 0">
                  {{ errors_msg.editor_err_msg }}
                </span>
                <p class="text-right">{{ message.length }}/300</p>
              </div>
            </div>

            <steeper-navigation
              :step="step"
              @stepchange="stepchange"
            ></steeper-navigation>
          </q-step>
        </div>
        <div class="col q-mt-xl" v-show="step < 3">
          <add-campaign-preview
            class="gt-sm"
            view="desktop"
            :photo="base64photo"
            :message="message"
          ></add-campaign-preview>
        </div>
      </div>
      <!-- preview responsive end -->
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
              @catagoryselected="catagoryselected"
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
          v-show="displayPackage"
          :days="days"
          :packages="packages"
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
          :value="starting_date"
          mask="date"
          :rules="[dateValidation]"
          lazy-rules
          @input="$emit('update:starting_date', $event)"
        >
          <template v-slot:append>
            <q-icon name="event" class="cursor-pointer">
              <q-popup-proxy
                ref="qDateProxy"
                transition-show="scale"
                transition-hide="scale"
              >
                <q-date
                  minimal
                  :value="starting_date"
                  @input="$emit('update:starting_date', $event)"
                >
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
          :step="step"
          @stepchange="stepchange"
          :loading="loading"
        ></steeper-navigation>
      </q-step>
    </q-stepper>
  </q-form>
</template>

<script>
export default {
  props: ['photo', 'message', 'starting_date', 'base64photo', 'loading'],
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
        upload_photo_err: null,
        editor_err: null,
        catagory_err: null,
        package_err: null,
        starting_date_err: null,
        selected_package_err: null
      },
      days: [],
      packages: {},
      catagories: [],
      selected_package: null,
      selectedcatagories: []
    }
  },
  watch: {
    step: function (newval, oldval) {
      console.log('watch: newval,oldval', newval, oldval)
      if (newval === 4) {
        this.packageValidation()
        this.selectedpackagevalidation(this.selected_package)
      }
    }
  },
  async created() {
    await this.fetchChannelCatagory()
    this.errors.upload_photo_err = 2
    this.errors.editor_err = 2
    this.errors.package_err = 2
  },
  methods: {
    configdays() {
      this.days = []
      for (const i in this.packages) {
        const day = {
          disablestatus: false,
          name: i
        }
        this.days.push(day)
      }
    },

    async fetchPackages() {
      if (this.selectedcatagories.length !== 0) {
        const response = await this.$api.get('campaigns/packages', {
          params: {
            catagory_id: this.selectedcatagories
          }
        })
        console.log('packages', response)
        for (const [key, value] of Object.entries(response.data)) {
          console.log('day=>', key)
          value.forEach((pack) => {
            Object.assign(pack, { selected: false })
          })
        }
        this.packages = response.data
        this.configdays()
      } else {
        this.packages = []
        this.days = []
      }
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
    async fetchChannelCatagory() {
      const response = await this.$api.get('channels/channel_catagory')
      response.data.forEach((catagory) => {
        this.catagories.push(Object.assign(catagory, { selected: false }))
      })
    },
    catagoryselected(catagory) {
      this.catagories.forEach((element) => {
        if (element.id === catagory.id) {
          element.selected = !element.selected
          if (this.selectedcatagories.includes(catagory.id)) {
            this.selectedcatagories.splice(
              this.selectedcatagories.indexOf(catagory.id),
              1
            )
          } else {
            this.selectedcatagories.push(catagory.id)
          }
        }
      })
      this.fetchPackages()
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
    selectedpackagevalidation(value) {
      this.errors_msg.selected_package_err_msg = null
      this.errors.selected_package_err = 1
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
        this.errors.package_err = 1
        this.errors_msg.package_err_msg = null
        return true
      }
      return false
    },
    atphotoupload(photo) {
      if (photo) this.errors.upload_photo_err = 1
      if (!photo) this.errors.upload_photo_err = 0

      this.$emit('changetobase64', photo)
    },
    stepchange(wht) {
      if (wht === 'add') {
        this.step++
      }
      if (wht === 'sub') {
        this.step--
      }
    },
    configpackageAfterSelectionPackage(payload) {
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
    displayPackage() {
      return Object.keys(this.packages).length > 0 || false
    },
    selectedpackage(dayname, packageId) {
      const payload = {
        dayname: dayname,
        packageid: packageId
      }
      this.configpackageAfterSelectionPackage(payload)
    },

    onSubmit() {
      this.$refs.uploadphoto.validate()
      this.$refs.message.validate()
      this.$refs.selectedcatagories.validate()
      this.$refs.selectedpackage.validate()

      console.log(
        'submit',
        this.packageValidation(),
        this.selectedpackagevalidation(this.selected_package),
        this.photoValidatorRule(this.photo),
        this.editorRule(this.message),
        this.dateValidation(this.starting_date)
      )
      if (
        this.packageValidation() &&
        this.selectedpackagevalidation(this.selected_package) &&
        this.photoValidatorRule(this.photo) &&
        this.editorRule(this.message) &&
        this.dateValidation(this.starting_date)
      ) {
        this.$emit('submit', {
          package_id: this.selected_package.packageid,
          catagory_id: this.selectedcatagories
        })
      }
    }
  },
  computed: {},
  components: {
    'package-list': require('components/campaign/Package.vue').default,
    'category-selection-step': require('components/campaign/Category.vue')
      .default,
    'steeper-navigation': require('components/campaign/SteeperNavigation.vue')
      .default,
    'add-campaign-preview': require('src/components/campaign/AddCampaignPreview.vue')
      .default
  }
}
</script>
<style scoped></style>
