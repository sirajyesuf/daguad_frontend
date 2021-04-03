<template>
  <q-page class="q-ma-xl">
    <div class="q-pa-md q-gutter-sm">
      <q-editor
        v-model="editor"
        :definitions="{
          bold: { label: 'Bold', icon: null, tip: 'My bold tooltip' }
        }"
      />
    </div>
  </q-page>
</template>

<script>
export default {
  name: 'PageIndex',
  data() {
    return {
      editor:
        'Here we are overriding the <b>bold</b> command to include a label instead of an icon and also changing its tooltip.'
    }
  }
}
</script>
<style scoped></style>
