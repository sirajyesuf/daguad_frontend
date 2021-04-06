<template>
  <q-stepper-navigation>
    <q-btn
      flat
      @click="nextBtn"
      color="primary"
      label="Next"
      v-if="step <= 4"
    />
    <q-btn type="submit" v-if="step == 5" flat color="primary" label="Create" />
    <q-btn
      flat
      @click="$emit('stepchange', 'sub')"
      color="primary"
      label="Back"
      class="q-ml-sm"
      v-if="step >= 2"
    />
  </q-stepper-navigation>
</template>
<script>
export default {
  props: ['step'],
  methods: {
    nextBtn() {
      this.$emit('stepchange', 'add')
      this.$emit('formvalidation')
    }
  }
}
</script>
