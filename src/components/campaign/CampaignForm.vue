<template>
  <q-form @submit.prevent="$emit('submit', $event)">
    <q-stepper
      vertical
      flat
      v-model="step"
      ref="stepper"
      color="primary"
      animated
      header-nav
    >
      <q-form ref="step1form">
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
            :value="photos"
            @input="atphotoupload"
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
          <steeper-navigation
            :step="step"
            @stepchange="stepchange"
            @formvalidation="step1formvalidation"
          ></steeper-navigation>
        </q-step>
      </q-form>

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
              :value="message"
              @input="$emit('update:message', $event)"
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
            v-for="catagory in catagories.slice(0, seemore_catagory)"
            :key="catagory.title"
          >
            <p>{{ selectedcatagories }}</p>
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

      <q-step :name="4" title="Package" icon="add" :done="!!selected_package">
        <package-list
          v-if="displayPackage"
          :days="days"
          :packages="packages"
          @packageselected="packageselected"
        >
        </package-list>
        <div v-if="!displayPackage() && selectedcatagories.length !== 0">
          zero packages please select another catagories.
        </div>
        <div v-if="selectedcatagories.length === 0" class="q-ma-mb">
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. Reiciendis
          possimus laboriosampackages animi fuga, dolorum sequi quisquam porro
          voluptatibus labore at iste? Aliquid rem, quis dolorum nam officiis in
          mollitia est.
        </div>

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
          :rules="['date']"
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
import { mapState } from 'vuex'
export default {
  props: ['photos', 'message', 'starting_date'],
  data() {
    return {
      tab: null,
      step: 1,
      seemore_catagory: 4,
      errors: {
        upload_photo_rejected_err: null
      }
    }
  },
  methods: {
    atphotoupload($event) {
      this.$emit('update:photos', $event)
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
      this.$store.commit('packages/selectedPackage', payload)
    },
    step1formvalidation() {
      alert('step 1 form validation')
    }
  },
  computed: {
    ...mapState('catagory', ['catagories', 'selectedcatagories']),
    ...mapState('packages', ['selected_package', 'days', 'packages'])
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
