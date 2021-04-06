<template>
  <div class="q-pa-md">
    <campaign-form
      :photos.sync="photos"
      :message.sync="message"
      :starting_date.sync="starting_date"
      @submit="submit"
      @changetobase64="getbase64photos"
    ></campaign-form>
    <!-- <q-form @submit.prevent="submit">
      <q-stepper
        vertical
        flat
        v-model="step"
        ref="stepper"
        color="primary"
        animated
        header-nav
      >
        <q-step
          :name="1"
          title="upload Photo"
          icon="insert_photo"
          :done="photos.length === 0 ? false : true"
        >
          <q-file
            name="photo"
            clearable
            dense
            v-model="photos"
            hint="upload a maximum of two photo only"
            outlined
            multiple
            use-chips
            max-files="2"
            accept="image/*"
            @rejected="onrejected"
            :error="!!errors.upload_photo_rejected_err"
            :error-message="errors.upload_photo_rejected_err"
          >
            <template v-slot:prepend>
              <q-icon name="attach_file" />
            </template>
          </q-file>
          {{ base64photos.length }}
          <steeper-navigation
            :step="step"
            @stepchange="stepchange"
          ></steeper-navigation>
        </q-step>

        <q-step
          :name="2"
          title="Description"
          icon="note"
          :done="message.length <= 5 ? false : true"
        >
          <div class="row q-gutter-md">
            <div class="col">
              <q-editor
                ref="editor"
                v-model="message"
                min-height="5rem"
                :toolbar="[
                  ['bold', 'italic', 'strike', 'underline', 'link'],
                  ['undo', 'redo']
                ]"
                :rules="[
                  (val) => !!val || '*required',
                  (val) =>
                    val.length >= 20 ||
                    'the description length must be min of 20 and max of 300 character'
                ]"
              />
              <p>{{ message.length }}</p>
            </div>
          </div>
          <steeper-navigation
            :step="step"
            @stepchange="stepchange"
          ></steeper-navigation>
        </q-step>
        <q-step
          :name="3"
          title="Catagories"
          icon="build"
          :done="selectedcatagories.length > 0 ? true : false"
        >
          <div class="row">
            <div
              class="col-sm-6 col-md-4"
              v-for="category in catgories.slice(0, seemore_category)"
              :key="category.title"
            >
               <p>{{ selectedcatagories }}</p>
    <category-selection-step
                :category="category"
                @categoryselected="categoryselected"
              ></category-selection-step>
            </div>
          </div>
          <q-btn
            v-show="seemore_category !== catagories.length"
            flat
            color="primary"
            label="see more"
            @click="seemore_category += 2"
          ></q-btn>
          <steeper-navigation
            :step="step"
            @stepchange="stepchange"
          ></steeper-navigation>
        </q-step>
        <q-step :name="4" title="Package" icon="add" :done="!!selected_package">
          <package-list
            v-if="displayPackage"
            :days="days"
            :packages="packages"
            @packageselected="packageselected"
          >
          </package-list>
          <div v-if="!displayPackage && selectedcatagories.length !== 0">
            no package
          </div>
          <div v-if="selectedcatagories.length === 0" class="q-ma-mb">
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Reiciendis
            possimus laboriosampackages animi fuga, dolorum sequi quisquam porro
            voluptatibus labore at iste? Aliquid rem, quis dolorum nam officiis
            in mollitia est.
          </div>

          <steeper-navigation
            :step="step"
            @stepchange="stepchange"
          ></steeper-navigation>
        </q-step>
        <q-step :name="5" title="starting date" icon="add_comment">
          <q-input dense v-model="starting_date" mask="date" :rules="['date']">
            <template v-slot:append>
              <q-icon name="event" class="cursor-pointer">
                <q-popup-proxy
                  ref="qDateProxy"
                  transition-show="scale"
                  transition-hide="scale"
                >
                  <q-date v-model="starting_date">
                    <div class="row items-center justify-end">
                      <q-btn v-close-popup label="Close" color="primary" flat />
                    </div>
                  </q-date>
                </q-popup-proxy>
              </q-icon>
            </template>
          </q-input>
          <steeper-navigation
            :step="step"
            @stepchange="stepchange"
          ></steeper-navigation>
        </q-step>
      </q-stepper>
    </q-form> -->
  </div>
</template>
<script>
import { mapGetters, mapState } from 'vuex'
export default {
  data() {
    return {
      seemore_category: 4,
      errors: {
        upload_photo_rejected_err: null
      },
      step: 1,
      tab: null,
      base64photos: []
    }
  },
  watch: {
    // selectedcatagories: {
    //   handler(newval, oldval) {
    //     console.log('newvalue and oldvalue', newval, oldval)
    //     if (this.selectedcatagories.length > 0) {
    //       this.$store.dispatch('packages/fetchpackage', this.selectedcatagories)
    //     } else {
    //       this.$store.commit('packages/emptypackages')
    //     }
    //   },
    //   deep: true
    // },
    step(newval, oldval) {
      if (newval === 2) {
        this.getbase64photos()
      }
    }
  },
  created() {
    this.$store.dispatch('catagory/getCatagories')
  },
  methods: {
    onrejected(rejectentries) {
      this.errors.upload_photo_rejected_err = `we remove the last${rejectentries.length}

        photos pls enter max of two photo only`
    },
    editorvalidator(val) {
      return new Promise((resolve, reject) => {
        if (val && val.length >= 2 && val.length <= 300) resolve(true)
        else reject('the content must be a minimum of 20 and a max of 300')
      })
    },
    submit(evt) {
      // this.$refs.editor.validate().then((success) => {
      //   if (success) {
      // yay, models are correct
      //   console.log('success')
      // } else {
      // oh no, user has filled in
      // at least one invalid value
      //     console.log('error')
      //   }
      // })
      const vv = this.uploadedphotos()
      var x = {
        ...vv,
        message: this.message,
        package_id: this.selected_package,
        starting_date: this.starting_date
      }
      this.$store.dispatch('campaign/addcampaign', x).then((res) => {
        this.$router.push({ name: 'campaign_payment', params: { id: 1 } })
      })
      // .catch((err) => {})
    },
    stepchange(wht) {
      if (wht === 'add') {
        this.step++
      }
      if (wht === 'sub') {
        this.step--
      }
    },
    categoryselected(categoryId) {
      this.$store.commit('category/selectCatagory', categoryId)
    },

    packageselected(dayname, packageId) {
      const payload = {
        dayname: dayname,
        packageid: packageId
      }
      this.$store.commit('packages/selectedPackage', payload)
    },
    getbase64photos() {
      this.base64photos = []
      this.photos.forEach((file) => {
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
    },

    new_campaign_data() {
      const payload = {
        message: this.new_campaign.message,
        starting_date: this.new_campaign.initial_date,
        package_id: 1,
        image_1: this.photos ? this.photos[0] : null,
        image_2: this.photos ? this.photos[2] : null
      }

      return payload
    }
  },
  computed: {
    ...mapState('campaign', ['campaigns', 'newcampaign']),
    ...mapState('catagory', ['catagories', 'selectedcatagories']),
    ...mapState('packages', ['selected_package', 'days', 'packages']),
    ...mapGetters('catagory', ['ischannelcatagoryselected']),
    ...mapGetters('packages', ['getselectedpackage']),
    photos: {
      get() {
        return this.$store.state.campaign.newcampaign.photos
      },
      set(val) {
        if (val !== null) {
          val.forEach((file) => {
            this.$store.commit('campaign/updateNewCampaign', {
              key: 'photos',
              value: file
            })
          })
        } else {
          this.$store.commit('campaign/updateNewCampaign', {
            key: 'all',
            value: val
          })
        }
      }
    },
    message: {
      get() {
        return this.$store.state.campaign.newcampaign.message
      },
      set(val) {
        this.$store.commit('campaign/updateNewCampaign', {
          key: 'message',
          value: val
        })
      }
    },
    starting_date: {
      get() {
        return this.$store.state.campaign.newcampaign.starting_date
      },
      set(val) {
        this.$store.commit('campaign/updateNewCampaign', {
          key: 'starting_date',
          value: val
        })
      }
    },
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
