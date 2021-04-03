<template>
  <q-step
    :name="1"
    title="upload"
    caption="a maximum of 2 photo only"
    icon="settings"
  >
    <q-file
      dense
      :value="photos"
      outlined
      multiple
      use-chips
      @input="atinput"
      max-files="2"
      accept=".jpg, image/*"
      @rejected="onRejected"
    >
      <template v-slot:prepend>
        <q-icon name="attach_file" />
      </template>
    </q-file>
  </q-step>
</template>

<script>
export default {
  props: ['step', 'name', 'photos'],
  data() {
    return {
      error: false,
      error_message: null
    }
  },
  methods: {
    atinput($event) {
      this.$emit('update:photos', $event)
      this.$emit('atinput')
    },
    onRejected(rejectedEntries) {
      console.log(this.photos)
      this.error = true
      this.error_message = 'the number of photo must be a maximumn of two only'
    }
  }
}
</script>
