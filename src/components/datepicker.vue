<template>
  <v-date-picker v-model="range" is-range>
    <template v-slot="{ inputValue, inputEvents }">
      <div class="row q-gutter-md q-pa-sm">
        <q-input
          label="From"
          class="col-xs-4 col-sm-4 col-md-3"
          dense
          outlined
          :value="inputValue.start"
          v-on="inputEvents.start"
        />
        <q-input
          label="To"
          class="col-xs-4 col-sm-4 col-md-3"
          dense
          outlined
          :value="inputValue.end"
          v-on="inputEvents.end"
        />
        <q-btn
          class="col-xs-4 col-sm-4 col-md-3"
          outline
          color="primary"
          label="Apply "
          @click="apply"
        />
      </div>
    </template>
  </v-date-picker>
</template>
<script>
export default {
  data() {
    return {
      range: {
        start: new Date(),
        end: new Date()
      }
    }
  },
  methods: {
    apply() {
      this.$emit('apply', {
        initial_date: this.range.start,
        final_date: this.range.end
      })
    }
  }
}
</script>
