<template>
  <q-form @submit.prevent="submit">
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
          :value="photos"
          @input="$emit('update:photos', $event)"
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
        title="Categories"
        icon="build"
        :done="selectedcategories.length > 0 ? true : false"
      >
        <div class="row">
          <div
            class="col-sm-6 col-md-4"
            v-for="category in categories.slice(0, seemore_category)"
            :key="category.title"
          >
            <p>{{ selectedcategories }}</p>
            <category-selection-step
              :category="category"
              @categoryselected="categoryselected"
            ></category-selection-step>
          </div>
        </div>
        <q-btn
          v-show="seemore_category !== categories.length"
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
        <div v-if="!displayPackage && selectedcategories.length !== 0">
          no package
        </div>
        <div v-if="selectedcategories.length === 0" class="q-ma-mb">
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
      <!--
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
      </q-step> -->
    </q-stepper>
  </q-form>
</template>

<script>
import { mapState } from 'vuex'
export default {
  props: ['photos', 'category', 'packages', 'message', 'starting_date'],
  data() {
    return {
      tab: null,
      step: 1,
      seemore_category: 4,
      errors: {
        upload_photo_rejected_err: null
      }
    }
  },
  methods: {
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
    categoryselected(categoryId) {
      this.$store.commit('channelcategory/selectCategory', categoryId)
    },
    displayPackage() {
      return Object.keys(this.packages).length > 0 || false
    },
    packageselected(dayname, packageId) {
      this.$emit('packageselected', dayname, packageId)
    }
  },
  computed: {
    ...mapState('channelcategory', ['categories', 'selectedcategories'])
  },
  components: {
    // 'package-list': require('components/campaign/Package.vue').default,
    'category-selection-step': require('components/campaign/Category.vue')
      .default,
    'steeper-navigation': require('components/campaign/SteeperNavigation.vue')
      .default
  }
}
</script>
