<template>
  <q-form @submit.prevent.stop="$emit('submit')">
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
        {{ max_number_photos }}
        <q-file
          v-if="this.photos.length + this.newphotos.length < 2"
          name="photo"
          dense
          :value="newphotos"
          @input="atphotoupload"
          outlined
          counter
          multiple
          append
          use-chips
          :max-files="max_number_photos"
          accept="image/*"
          max-total-size="4000000"
          @rejected="onrejected"
          :error="!!errors.upload_photo_rejected_err"
          :error-message="errors.upload_photo_rejected_err"
        >
          <template v-slot:hint>
            upload a maximum of two picture only
          </template>
          <template v-slot:prepend>
            <q-icon name="attach_file" />
          </template>
        </q-file>
        <div class="row q-pt-xl">
          <q-img
            class="col-6 q-ma-md"
            :src="photo.path"
            spinner-color="red"
            style="height: 140px; max-width: 150px"
            v-for="(photo, index) in photos"
            :key="index"
          >
            <q-badge color="transparent" floating>
              <q-icon
                clickable
                @click="removePhoto(index)"
                name="cancel"
                color="white"
                class="q-ma-none"
                size="20px"
              />
            </q-badge>
          </q-img>
          <q-img
            class="col-6 q-ma-md"
            :src="getphoto(newphoto)"
            spinner-color="red"
            style="height: 140px; max-width: 150px"
            v-for="(newphoto, index) in newphotos"
            :key="1 + index"
          >
            <q-badge color="transparent" floating>
              <q-icon
                clickable
                @click="removeNewPhoto(index)"
                name="cancel"
                color="white"
                class="q-ma-none"
                size="20px"
              />
            </q-badge>
          </q-img>
        </div>

        <steeper-navigation
          :step="step"
          @stepchange="stepchange"
        ></steeper-navigation>
      </q-step>
      <q-step
        :name="2"
        title="Description"
        icon="note"
        :done="message.length >= 20 && message.length <= 300 ? true : false"
      >
        <div class="row q-gutter-md">
          <div class="col">
            <q-editor
              ref="editor"
              :value="message"
              @input="$emit('update:message', $event)"
              min-height="5rem"
              :toolbar="[
                ['bold', 'italic', 'strike', 'underline', 'link'],
                ['undo', 'redo']
              ]"
            />
            <span class="text-red">
              {{ errors.editor_err }}
            </span>
            <p>{{ message.length }}</p>
          </div>
        </div>
        <q-input
          v-show="false"
          :value="message"
          :rules="[editorRequired, editorMax, editorMin]"
        ></q-input>
        <steeper-navigation
          :step="step"
          @stepchange="stepchange"
        ></steeper-navigation>
      </q-step>
      <q-step :name="3" title="Catagories" icon="build">
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

      <q-step :name="4" title="Package" icon="add">
        <package-list
          :days="days"
          :packages="packages"
          @packageselected="packageselected"
        >
        </package-list>

        <!-- <div v-if="!displayPackage() && selectedcatagories.length !== 0">
          zero packages please select another catagories.
        </div>
        <div v-if="selectedcatagories.length === 0" class="q-ma-mb">
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. Reiciendis
          possimus laboriosampackages animi fuga, dolorum sequi quisquam porro
          voluptatibus labore at iste? Aliquid rem, quis dolorum nam officiis in
          mollitia est.
        </div> -->

        <steeper-navigation
          :step="step"
          @stepchange="stepchange"
        ></steeper-navigation>
      </q-step>

      <q-step :name="5" title="starting date" icon="add_comment">
        <q-input
          dense
          :value="starting_date"
          mask="date"
          :rules="[dateAfterNow]"
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
        <steeper-navigation
          :step="step"
          @stepchange="stepchange"
        ></steeper-navigation>
      </q-step>
    </q-stepper>
  </q-form>
</template>

<script>
import dateAfterNow from '../../helper/validators.js'
export default {
  props: [
    'photos',
    'message',
    'starting_date',
    'catagories',
    'packages',
    'days',
    'selected_package',
    'selectedcatagories',
    'newphotos'
  ],
  data() {
    return {
      tab: null,
      step: 1,
      seemore_catagory: 4,
      errors: {
        upload_photo_rejected_err: null,
        editor_err: null
      }
    }
  },
  methods: {
    dateAfterNow,
    editorRequired(value) {
      if (!value) this.errors.editor_err = '*Required'

      return !!value || '*required'
    },
    editorMax(value) {
      if (value.length > 300)
        this.errors.editor_err = 'the length must be lessthan 300 character'

      return !!value || '*required'
    },
    editorMin(value) {
      if (value.length < 20)
        this.errors.editor_err = 'the length must be min of 20 character'

      return !!value || '*required'
    },
    atphotoupload($event) {
      console.log('hh', $event)
      this.$emit('update:newphotos', $event)
      this.$emit('changetobase64')
    },
    onrejected(rejectentries) {
      this.errors.upload_photo_rejected_err = `we remove the last${rejectentries.length}

        photos pls enter max of two photo only`
    },
    stepchange(wht) {
      if (wht === 'add') {
        this.step++
      }
      if (wht === 'sub') {
        this.step--
      }
    },
    catagoryselected(catagoryId) {
      this.$store.commit('catagory/selectCatagory', catagoryId)
      if (this.selectedcatagories.length === 0) {
        this.$store.commit('packages/emptypackages')
      } else {
        this.$store.dispatch('packages/fetchpackage', this.selectedcatagories)
      }
    },
    displayPackage() {
      return Object.keys(this.packages).length > 0 || false
    },
    packageselected(dayname, packageId) {
      const payload = {
        dayname: dayname,
        packageid: packageId
      }
      this.$emit('selectedpackage', payload)
    },
    removePhoto(index) {
      console.log('Emitted...')
      this.$root.$emit('delete:photo', index)
    },
    removeNewPhoto(index) {
      this.$emit('removeNewPhoto', index)
    },
    getphoto(val) {
      return URL.createObjectURL(val)
    }
  },

  computed: {
    max_number_photos() {
      console.log('photos length', this.photos.length)
      console.log('newphotos length', this.newphotos.length)
      const numphotos = this.photos.length
      let rtn = 0
      if (numphotos === 0) rtn = 2
      if (numphotos === 1) rtn = 1
      if (numphotos === 2) rtn = 0

      return rtn
    }
  },
  components: {
    'package-list': require('components/campaign/Package.vue').default,
    'category-selection-step': require('components/campaign/Category.vue')
      .default,
    'steeper-navigation': require('components/campaign/SteeperNavigation.vue')
      .default
  }
}
</script>

<style scoped>
.q-img__content > div {
  position: absolute;
  padding: 6px;
  color: #fff;
  background: rgba(0, 0, 0, 0.47);
}
</style>
