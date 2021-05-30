<template>
  <q-input
    ref="textinput"
    square
    :value="name"
    @input="atinputevent($event)"
    type="text"
    label="Full Name"
    :rules="[(val) => !!val || 'this field is required']"
  >
    <template v-slot:prepend>
      <q-icon name="person" />
    </template>
    <template v-if="this.name" v-slot:append>
      <q-icon name="cancel" @click.stop="clear" class="cursor-pointer" />
    </template>
  </q-input>
</template>
<script>
export default {
  props: ['name'],
  methods: {
    atinputevent($event) {
      this.$emit('update:name', $event)
    },
    clear() {
      this.$emit('clearname')
    }
  }
}
</script>
